import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';

export function SingleProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  showLabel,
  learnMore
}) {
  let cardLabel;

  const cardProduct = product?.variants ? product : {};
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(product.variants)[0];
  let featuredImage = product.media.nodes.find((media) => media.alt == "featured-homepage")?.image

  if (!firstVariant) return null;
  const {image, price, compareAtPrice, availableForSale} = firstVariant;
  if (!featuredImage) {
    featuredImage = image
  }
  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={'grid gap-4 product-card'}>
          <Text
            className="w-full overflow-hidden text-center"
            as="h3"
          >
            {product.title}
          </Text>
          <div className="card-image bg-primary/5">
            {image && (
              <Image
                className="w-full object-cover fadeIn"
                widths={[320]}
                sizes="320px"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                  width: 320,
                  height: 400,
                }}
                data={featuredImage}
                alt={`Picture of ${product.title}`}
                loading={loading}
              />
            )}
            {showLabel && <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice"
            >
              {cardLabel}
            </Text>}
          </div>
        </div>
      </Link>
      <div className="grid gap-1 product-card">
        <Text className="flex gap-4 w-full justify-center items-center">
          <Money withoutTrailingZeros data={price} className="price" />
          {isDiscounted(price, compareAtPrice) && (
            <CompareAtPrice
              className={'opacity-50'}
              data={compareAtPrice}
            />
          )}
        </Text>
      </div>
      <div className="cta-wrapper flex items-center flex-col">
        {quickAdd && (
          <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
              },
            ]}
            disabled={!availableForSale ? true : false}
            variant={availableForSale ? "primary" : "secondary"}
            className="add-to-cart-btn w-full uppercase font-bold mt-25"
            analytics={{
              products: [productAnalytics],
              totalValue: parseFloat(productAnalytics.price),
            }}
          >
            <Text as="span" className="flex items-center justify-center gap-2 normal-case font-tertiary fw-500">
              {availableForSale ? 'Buy now' : 'Sold Out'}
            </Text>
          </AddToCartButton>
        )}
        {learnMore && <Link to="/pages/purifier">
            Learn more
        </Link>}
      </div>
    </div>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', 'font-tertiary', className);

  return (
    <span className={styles}>
        {currencyNarrowSymbol}
        {withoutTrailingZerosAndCurrency}
    </span>
  );
}
