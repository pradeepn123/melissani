import {defer} from '@shopify/remix-oxygen';
import {
  useLoaderData
} from '@remix-run/react';
import {
  AnalyticsPageType,
  flattenConnection,
} from '@shopify/hydrogen';
import {
  Section,
  ImageCarousel,
  Specifications,
  ProductDescription,
  ProductHeader
} from '~/components';
import invariant from 'tiny-invariant';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import ProductHeaderStyles from '~/components/ProductHeader/ProductHeader.css';
import ImageCarouselStyles from '~/components/ImageCarousel/ImageCarousel.css';
import SpecificationStyles from '~/components/Specifications/Specifications.css';
import ProductHandleStyles from '../../../styles/productHandle.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: ProductHeaderStyles},
    {rel: 'stylesheet', href: ImageCarouselStyles},
    {rel: 'stylesheet', href: SpecificationStyles},
    {rel: 'styleSheet', href: ProductHandleStyles}
  ]
}

const seo = ({data}) => {
  const media = flattenConnection(data.product.media).find(
    (media) => media.mediaContentType === 'IMAGE',
  );

  return {
    title: data?.product?.seo?.title ?? data?.product?.title,
    media: media?.image,
    description: data?.product?.seo?.description ?? data?.product?.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      brand: data?.product?.vendor,
      name: data?.product?.title,
    },
  };
};

export const handle = {
  seo,
};

export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const searchParams = new URL(request.url).searchParams;

  const selectedOptions = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
      metafields: context.metafields
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const productDetails = product.metafields.find(item => {
    if(item !== null){
      return item.key == "product_details"
    }
  })

  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  return defer({
    product,
    shop,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    productDetails
  });
}

export default function Product() {
  const {product, recommended, productDetails} = useLoaderData();
  const {media, title} = product;
  let parsedProductDetails;
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const isSubscriptionProduct = product.tags.includes("filter-club-subscription");

  if(productDetails) {
    parsedProductDetails = JSON.parse(productDetails?.value);
  }

  return (
    <>
      <Section className="product-section" padding="x" className="px-0">
        {parsedProductDetails?.productHeader && <ProductHeader title={title} data={parsedProductDetails.productHeader}/>}
        <div className="product-content">
          <ImageCarousel data={media.nodes} className="w-screen md:w-full lg:col-span-1 product-image-carousel" />
          <div className="product-content-description">
            <ProductDescription isSubscriptionProduct={isSubscriptionProduct} title={title} 
            selectedVariant={selectedVariant} parsedProductDetails={parsedProductDetails} />
          </div>
        </div>
        {parsedProductDetails?.boxContents && <ImageCarousel boxContents={parsedProductDetails.boxContents[0]} className="w-screen md:w-full lg:col-span-1 box-content-image-carousel" />}
        {parsedProductDetails?.Specifications && <Specifications data={parsedProductDetails.Specifications} />}
      </Section>
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      tags
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      metafields(
        identifiers: [
          { namespace: "product", key: "product_details" }
        ]
      ) {
        value
        key
      }
    }
    shop {
      name
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return mergedProducts;
}
