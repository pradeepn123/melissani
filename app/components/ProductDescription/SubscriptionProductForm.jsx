import { useState, useEffect } from 'react';
import { Money, flattenConnection, Image } from '@shopify/hydrogen';

import { useLoaderData } from '@remix-run/react';

import { Heading, QuantityAdjust, AddToCartButton, Text } from '~/components';


const SubscriptionProductForm = (props) => {
    const { product } = useLoaderData();

    const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(true)
    const [oneTimeProducts, setOneTimeProducts] = useState([])
    const [price, setPrice] = useState(0)
    const [variantLineItems, setVariantLineItems] = useState([])

    const subscriptionProducts = props.products.filter((p) => {
        return props.parsedProductDetails.linkedProducts.subscription.includes(p.handle)
    }).map((item) => {
        return {
            merchandiseId: item.variants.nodes[0].id,
            sellingPlanId: item.sellingPlanGroups.edges[0].node.sellingPlans.edges[0].node.id,
            quantity: 1
        }
    })

    useEffect(() => {
        setVariantLineItems(subscriptionProducts)
        const oneTimeProducts = props.products.filter((p) => props.parsedProductDetails.linkedProducts.default.includes(p.handle))
        setOneTimeProducts(oneTimeProducts.map(oneTimeProduct => {
            oneTimeProduct.quantity = 0
            return oneTimeProduct
        }))
        setPrice(oneTimeProducts.reduce((acc, lineProduct) => {
            const firstVariant = lineProduct.variants.nodes[0];
            return acc + parseFloat(firstVariant.price?.amount)
        }, 0))
    }, [])

    useEffect(() => {
        // UpdateLineItems
        if (isSubscriptionSelected) {
            setVariantLineItems(subscriptionProducts)
        } else{
            setVariantLineItems(oneTimeProducts.map((oneTimeProduct) => {
                return {
                    merchandiseId: oneTimeProduct.variants.nodes[0].id,
                    quantity: oneTimeProduct.quantity
                }
            }).filter((productVariant) => productVariant.quantity > 0))
        }
    }, [isSubscriptionSelected])

    const handleInputChange = event => {
        const isSubscription = event.target.value == "subscription"
        setIsSubscriptionSelected(isSubscription)
        const content = event.target.closest(".subscription-form").querySelector(".content")
        if (!isSubscription) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null
        }
    }

    const updateQuantity = (handle, quantity) => {
        const updateOneTimeProducts = oneTimeProducts.map((oneTimeProduct) => {
            if (handle == oneTimeProduct.handle) {
                oneTimeProduct.quantity = quantity
            }
            return oneTimeProduct
        })
        setOneTimeProducts(updateOneTimeProducts)
        setVariantLineItems(updateOneTimeProducts.map((oneTimeProduct) => {
            return {
                merchandiseId: oneTimeProduct.variants.nodes[0].id,
                quantity: oneTimeProduct.quantity
            }
        }).filter((productVariant) => productVariant.quantity > 0))
    }

    console.log(variantLineItems)

    return <div className="subscription-form">
        <p className="subscription-title font-tertiary">
            Purchase options
        </p>
        <input
            type="radio"
            name="subscription-form"
            id="subscription-input"
            value="subscription"
            checked={isSubscriptionSelected}
            onChange={handleInputChange}
        />
        <label className="product-form-wrapper" htmlFor="subscription-input">
            <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal product-title">
                    Filter Club Membership
                </Heading>
                <div className="product-price font-tertiary">
                    <Money
                        data={{
                            amount: price.toFixed(2),
                            currencyCode: 'USD'
                        }}
                        as="span"
                    />
                </div>
                <div className="grid gap-4 py-1">
                    {props.parsedProductDetails?.productDescription && <div
                        className="font-tertiary product-description"
                        dangerouslySetInnerHTML={{ __html: props.parsedProductDetails.productDescription}}
                    ></div>}
                </div>
                <hr/>
                <div className="additional-information">
                    <Heading as="h5" className="whitespace-normal product-information">
                        Includes:
                    </Heading>
                    <p className="font-tertiary include-benifits">PAC & CF Filter <span>/ Every 6 months</span></p>
                    <p className="font-tertiary include-benifits">RO Filter <span>/ Every 12 months</span></p>
                    <p className="font-tertiary include-benifits">Filter club benefits</p>
                </div>
            </div>
        </label>
        <input
            type="radio"
            name="subscription-form"
            id="onetime-input"
            value="onetime"
            checked={!isSubscriptionSelected}
            onChange={handleInputChange}
            onChange={handleInputChange}
        />
        <label className="product-form-wrapper mt-8" htmlFor="onetime-input">
            <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal product-title">
                    No Subscription
                </Heading>
                <div className="product-price font-tertiary">
                    <Money
                        data={{
                            amount: price.toFixed(2),
                            currencyCode: 'USD'
                        }}
                        as="span"
                    />
                </div>
                <div className="grid gap-4 py-1">
                    <div className="font-tertiary product-description">
                        One - time purchase buy filters seperatley
                    </div>
                </div>
            </div>
            <div className="content">
                {oneTimeProducts.map((oneTimeProduct) => {
                    let featuredImage = oneTimeProduct.media.nodes[0]?.image
                    return <div
                        key={`one-time-product-${oneTimeProduct.handle}`}
                        className="grid gap-2 py-2"
                    >
                        <div className="one-time-product-row">
                            <div className="image-wrapper">
                                <Image
                                    className="w-full fadeIn"
                                    widths={[128]}
                                    sizes="128px"
                                    loaderOptions={{
                                        crop: 'center',
                                        scale: 2,
                                        width: 128,
                                    }}
                                    data={featuredImage}
                                    alt={`Picture of ${oneTimeProduct.title}`}
                                />
                            </div>
                            <div>
                                <Heading as="h3" className="whitespace-normal onetime-product-title">
                                    {oneTimeProduct.productType}
                                </Heading>
                                <div className="product-price font-tertiary">
                                    <Money
                                        withoutTrailingZeros
                                        data={oneTimeProduct?.variants.nodes[0]?.price}
                                        as="span"
                                    />
                                </div>
                            </div>
                            <div className="quantity-field">
                                <QuantityAdjust
                                    quantity={oneTimeProduct.quantity}
                                    setQuantity={quantity => updateQuantity(oneTimeProduct.handle, quantity)}
                                    minDisabled={oneTimeProduct.quantity < 1}
                                />
                            </div>
                        </div>
                </div>})}
            </div>
        </label>
        <div className="subscription-add-to-cart">
            <AddToCartButton className="cart-btn"
              lines={variantLineItems}
              data-test="add-to-cart"
              disabled={variantLineItems.length < 1}
            >
                <Text
                  as="span"
                  className="flex items-center justify-center gap-2"
                >
                    <span>Add to Cart</span>
                </Text>
            </AddToCartButton>
        </div>
    </div>
}

export default SubscriptionProductForm;
