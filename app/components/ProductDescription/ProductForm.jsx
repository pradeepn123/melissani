import { useMemo, useState, useEffect, useContext } from 'react';
import {
  useLoaderData,
  useSearchParams,
  useTransition,
} from '@remix-run/react';

import {
  Text,
  AddToCartButton,
  QuantityAdjust,
  ProductOptions,
  RequestContext
} from '~/components';

import { useCartFetchers } from '~/hooks/useCartFetchers';


export function ProductForm() {
  const {product, analytics} = useLoaderData();
  const context = useContext(RequestContext)

  const [currentSearchParams] = useSearchParams();
  const transition = useTransition();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  /**
   * We update `searchParams` with in-flight request data from `transition` (if available)
   * to create an optimistic UI, e.g. check the product option before the
   * request has completed.
   */
  const searchParams = useMemo(() => {
    return transition.location
      ? new URLSearchParams(transition.location.search)
      : currentSearchParams;
  }, [currentSearchParams, transition]);
  
  const firstVariant = product.variants.nodes[0];
  
  /**
   * We're making an explicit choice here to display the product options
   * UI with a default variant, rather than wait for the user to select
   * options first. Developers are welcome to opt-out of this behavior.
   * By default, the first variant's options are used.
   */
  const searchParamsWithDefaults = useMemo(() => {
    const clonedParams = new URLSearchParams(searchParams);

    for (const {name, value} of firstVariant.selectedOptions) {
      if (!searchParams.has(name)) {
        clonedParams.set(name, value);
      }
    }

    return clonedParams;
  }, [searchParams, firstVariant.selectedOptions]);
  
  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const productAnalytics = {
    ...analytics.products[0],
    quantity: quantity,
    price: parseFloat(selectedVariant?.price?.amount)
  };

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');
  const handleAddToCartClick = () => setIsAddingToCart(true)
  useEffect(() => {
    if (addToCartFetchers.length == 0) {
      setIsAddingToCart(false)
    }
  }, [isAddingToCart == true && context.isAddingToCart])

  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        <ProductOptions
          options={product.options}
          searchParamsWithDefaults={searchParamsWithDefaults}
        />
        {selectedVariant && <>
          <div className="grid gap-4 add-to-cart-wrapper">
            <QuantityAdjust quantity={quantity} setQuantity={setQuantity} />
            <AddToCartButton className="cart-btn"
              isAddingToCart={isAddingToCart}
              lines={[{
                merchandiseId: selectedVariant.id,
                quantity: quantity,
              }]}
              variant={isOutOfStock ? 'secondary' : 'primary'}
              data-test="add-to-cart"
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price)
              }}
              onClick={handleAddToCartClick}
            >
              {isOutOfStock ? (
                <Text>Sold out</Text>
              ) : (
                <Text
                  as="span"
                  className="flex items-center justify-center gap-2"
                >
                  {selectedVariant.quantityAvailable < 5 ? <span>Pre-Order</span> : <span>Add to Cart</span>}
                </Text>
              )}
            </AddToCartButton>
            {selectedVariant.quantityAvailable < 5 && <p style={{"gridColumn": "1 / span 2"}}>Sold Out, Order Now to ship January 20th</p>}
          </div>
        </>}
      </div>
    </div>
  );
}