import { defer, redirect } from '@shopify/remix-oxygen';

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
  ProductHeader,
  MediaGallery,
  ProductStickyBar,
  OkendoReviewsWidget
} from '~/components';

import invariant from 'tiny-invariant';

import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import ProductHeaderStyles from '~/components/ProductHeader/ProductHeader.css';
import ImageCarouselStyles from '~/components/ImageCarousel/ImageCarousel.css';
import SpecificationStyles from '~/components/Specifications/Specifications.css';
import ProductHandleStyles from '../../../styles/productHandle.css';
 import SwiperCss from "swiper/css";
import SwiperNavigation from "swiper/css/navigation";
import SwiperPagination from "swiper/css/pagination";


export const links = () => [
  {rel: 'stylesheet', href: ProductHeaderStyles},
  {rel: 'stylesheet', href: ImageCarouselStyles},
  {rel: 'stylesheet', href: SpecificationStyles},
  {rel: 'styleSheet', href: ProductHandleStyles},
  {rel: 'styleSheet', href: SwiperCss},
  {rel: 'styleSheet', href: SwiperNavigation},
  {rel: 'styleSheet', href: SwiperPagination}
]

const seo = ({data}) => {
  const media = flattenConnection(data.product.media).find(
    (media) => media.mediaContentType === 'IMAGE',
  );

  const variant = data.product.variants.nodes[0]

  return {
    title: data?.product?.seo?.title ?? data?.product?.title,
    media: media?.image,
    description: data?.product?.seo?.description ?? data?.product?.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      brand: data?.product?.vendor,
      name: data?.product?.title,
      image: media?.image?.url,
      description: data?.product?.seo?.description ?? data?.product?.description,
      mpn: data?.product?.id,
      brand: {
        "@type": "Brand",
        "name": data?.product?.vendor
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": variant?.price?.currencyCode,
        "price": variant?.price?.amount,
        "priceValidUntil": "2023-06-17",
        "availability": "InStock",
        "seller": {
          "@type": "Organization",
          "name": data?.shop?.name
        }
      },
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": data.reviews.reduce((acc, review) => {
            return acc + review.rating
          }, 0) / data.reviews.length,
          "ratingCount": data.reviews.length
      }
    },
  };
};

const getOkendoReview = async function (productId) {
  let response = await fetch(`https://api.okendo.io/v1/stores/a0ca6b07-0ad6-4495-9f6b-5a1ac98d0fe6/products/shopify-${productId}/reviews`)
  response = await response.json()
  return response
}

export const handle = {
  seo,
};

export async function loader({params, request, context}) {
  const {productHandle} = params;

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

  const redirectUrl = product.metafields.find(item => item && item.key == "redirect_url")

  if (redirectUrl) {
    return redirect(redirectUrl.value)
  }

  const { products } = await context.storefront.query(LIST_PRODUCTS_QUERY);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const { reviews } = await getOkendoReview(product.id.replace("gid://shopify/Product/", ''))
  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const productDetails = product.metafields.find(item => item && item.key == "product_details")

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
    reviews,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    products,
    productDetails
  });
}

export default function Product() {
  const {product, recommended, productDetails, products} = useLoaderData();
  const {media, title} = product;
  let parsedProductDetails;
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const isSubscriptionProduct = product.tags.includes("filter-club-subscription");

  if(productDetails) {
    parsedProductDetails = JSON.parse(productDetails?.value);
  }

  const productId = product.id.replace("gid://shopify/Product/", "")

  return (
    <>
      <Section className="product-section px-0">
        {parsedProductDetails?.productHeader && <ProductHeader
          title={title}
          data={parsedProductDetails.productHeader}
        />}

        <div className="product-content">
          <MediaGallery
            data={media.nodes.filter(media => media.alt != "featured-homepage")}
          />

          <div className="product-content-description">
            <ProductDescription
              isSubscriptionProduct={isSubscriptionProduct}
              title={title}
              selectedVariant={selectedVariant}
              parsedProductDetails={parsedProductDetails}
              products={products.nodes}
              productId={productId}
            />
          </div>
        </div>

        {parsedProductDetails?.boxContents && <ImageCarousel
          boxContents={parsedProductDetails.boxContents[0]}
          className="w-screen md:w-full lg:col-span-1 box-content-image-carousel"
        />}

        {parsedProductDetails?.Specifications && <Specifications
          data={parsedProductDetails.Specifications}
        />}
        <section className="okendo-reviews">
          <OkendoReviewsWidget productId={productId} />
        </section>
        <ProductStickyBar
          products={products}
          selectedVariant={selectedVariant}
          title={title}
          price={selectedVariant?.price}
          data={media.nodes.filter(media => media.alt != "featured-homepage")}
          isSubscriptionProduct={isSubscriptionProduct}
          parsedProductDetails={parsedProductDetails}
        />
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
      seo {
        description
        title
      }
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
      media(first: 15) {
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
          { namespace: "product", key: "product_details" },
          { namespace: "custom", key: "redirect_url" }
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

export const LIST_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query listProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 50) {
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
