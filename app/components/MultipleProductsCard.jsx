import { useState, useEffect, useContext } from 'react';

import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';
import { Text, Link, AddToCartButton, RequestContext } from '~/components';
import { isDiscounted, isNewArrival, deepCopy } from '~/lib/utils';

import { useCartFetchers } from '~/hooks/useCartFetchers';


export function MultipleProductsCard({
  products,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  showLabel,
  learnMore
}) {
    const context = useContext(RequestContext)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const baseProduct = products[0]

    const [selectedProduct, setSelectedProduct] = useState(deepCopy(products[0]))
    const [selectedProductHandle, setSelectedProductHandle] = useState(deepCopy(products[0].handle));

    useEffect(() => {
        const filteredProduct = products.find(product => product.handle == selectedProductHandle)
        setSelectedProduct(filteredProduct)
    },[selectedProductHandle])

    let cardLabel;

    const handleSelectionChange = (event) => setSelectedProductHandle(event.target.value)

    const cardProduct = selectedProduct?.variants ? selectedProduct : {};
    if (!cardProduct?.variants?.nodes?.length) return null;

    const firstVariant = flattenConnection(selectedProduct.variants)[0];

    if (!firstVariant) return null;
    const {image, price, compareAtPrice, availableForSale} = firstVariant;

    let featuredImage = selectedProduct.media.nodes.find((media) => media.alt == "featured-homepage")?.image
    if (!featuredImage) {
        featuredImage = image
    }
    if (label) {
        cardLabel = label;
    } else if (isDiscounted(price, compareAtPrice)) {
        cardLabel = 'Sale';
    } else if (isNewArrival(selectedProduct.publishedAt)) {
        cardLabel = 'New';
    }

    const productAnalytics = {
        productGid: selectedProduct.id,
        variantGid: firstVariant.id,
        name: selectedProduct.title,
        variantName: firstVariant.title,
        brand: selectedProduct.vendor,
        price: firstVariant.price.amount,
        quantity: 1,
    };

    const addToCartFetchers = useCartFetchers('ADD_TO_CART');
    const handleAddToCartClick = () => setIsAddingToCart(true)
    useEffect(() => {
        if (addToCartFetchers.length == 0) {
          setIsAddingToCart(false)
        }
    }, [isAddingToCart == true && context.isAddingToCart])

    return (
        <div className={`flex flex-col ${className}`}>
            <Link
                onClick={onClick}
                to={`/products/melissani-m1-filter`}
                prefetch="intent"
            >
                <div className={'grid gap-4 product-card'}>
                    <Text
                        className="w-full overflow-hidden text-center"
                        as="h3"
                    >
                        M1 Filters
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
                                alt={`Picture of ${selectedProduct.title}`}
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
                <select name="products-selection" onChange={handleSelectionChange}>
                    {products.map(product => {
                        return <option key={product.id} value={product.handle}><>{product.title} (<Money withoutTrailingZeros data={flattenConnection(product.variants)[0].price} />)</></option>
                    })}
                </select>
            </div>
            <div className="cta-wrapper flex items-center flex-col">
                {quickAdd && (
                    <AddToCartButton
                        lines={[{
                            quantity: 1,
                            merchandiseId: firstVariant.id,
                        }]}
                        disabled={!availableForSale ? true : false}
                        variant={availableForSale ? "primary" : "secondary"}
                        className="add-to-cart-btn w-full uppercase font-bold mt-25"
                        analytics={{
                            products: [productAnalytics],
                            totalValue: parseFloat(productAnalytics.price),
                        }}
                        onClick={handleAddToCartClick}
                        isAddingToCart={isAddingToCart}
                    >
                        <Text as="span" className="flex items-center justify-center gap-2 normal-case font-tertiary fw-500">
                            {availableForSale ? 'Buy' : 'Sold Out'}
                        </Text>
                    </AddToCartButton>
                )}
                {learnMore && <Link to="/pages/melissani-club">
                    Discover
                </Link>}
            </div>
        </div>
    );
}