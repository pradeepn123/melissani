import { useState, useEffect, useContext } from 'react';
import { Money, flattenConnection, Image } from '@shopify/hydrogen';

import { useLoaderData } from '@remix-run/react';

import {
    Heading,
    QuantityAdjust,
    AddToCartButton,
    Text,
    RequestContext,
    ClockIcon,
    FilterClubQuestionIcon
} from '~/components';

import { useCartFetchers } from '~/hooks/useCartFetchers';

const SubscriptionProductForm = (props) => { 
    const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(null)
    const [subscriptionProducts, setSubscriptionProducts] = useState([])
    const [oneTimeProducts, setOneTimeProducts] = useState([])
    const [amount, setAmount] = useState({price: 0, compareAtPrice: 0})
    const [productAmount, setProductAmount] = useState(0)
    const [variantLineItems, setVariantLineItems] = useState([])
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const context = useContext(RequestContext)
    useEffect(() => {
        let filterClubPrice = 0
        let filterClubCompareAtPrice = 0
        const subscriptionItems = props.products.filter((p) => {

            return props.parsedProductDetails.linkedProducts.subscription.includes(p.handle)
        }).map((item) => {
            const itemMetafield = JSON.parse(item.metafields[0].value)
            filterClubPrice += itemMetafield.price
            filterClubCompareAtPrice += itemMetafield.compareAtPrice
            return {
                merchandiseId: item.variants.nodes[0].id,
                sellingPlanId: item.sellingPlanGroups.edges[0].node.sellingPlans.edges[0].node.id,
                quantity: 1,
                attributes: [{
                    key: 'Bundle',
                    value: 'Filter Club'
                }]
            }
        })
        setSubscriptionProducts(subscriptionItems)
        const oneTimeProducts = props.parsedProductDetails.linkedProducts.default.map((productHandle) => {
            return props.products.find((p) => productHandle == p.handle)
        })
        var productAmountUnit = 0
        setOneTimeProducts(oneTimeProducts.map(oneTimeProduct => {
            const firstVariant = oneTimeProduct.variants.nodes[0];
            oneTimeProduct.quantity = 0

            productAmountUnit += oneTimeProduct.quantity * firstVariant.price?.amount
            return oneTimeProduct
        }))
        setProductAmount(productAmountUnit)

        setAmount({compareAtPrice: filterClubCompareAtPrice, price: filterClubPrice})
        setIsSubscriptionSelected(true)
    }, [])

    useEffect(() => {
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
        const content = event.target.closest(".subscription-form").querySelector(".content")
        if (!isSubscription) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null
        }
        setIsSubscriptionSelected(isSubscription)
    }
    const updateQuantity = (handle, quantity) => {
        const updateOneTimeProducts = oneTimeProducts.map((oneTimeProduct) => {
            if (handle == oneTimeProduct.handle) {
                oneTimeProduct.quantity = quantity
            }
            return oneTimeProduct
        })
        setOneTimeProducts(updateOneTimeProducts)
        var productAmountUnit = 0
        setVariantLineItems(updateOneTimeProducts.map((oneTimeProduct) => {
            const firstVariant = oneTimeProduct.variants.nodes[0];
            productAmountUnit += oneTimeProduct.quantity * firstVariant.price?.amount
            return {
                merchandiseId: oneTimeProduct.variants.nodes[0].id,
                quantity: oneTimeProduct.quantity
            }
        }).filter((productVariant) => productVariant.quantity > 0))
        setProductAmount(productAmountUnit)
    }

    const openMembershipBenifitsDrawer = (e) => {
        e.preventDefault()
        e.stopPropagation()
        context.openFilterClubRightModal()
        return false
    }

    const openMembershipSavingsDrawer = (e) => {
        e.preventDefault()
        e.stopPropagation()
        context.openFilterClubSavingsRightModal()
        return false
    }

    const addToCartFetchers = useCartFetchers('ADD_TO_CART');
    const handleAddToCartClick = () => setIsAddingToCart(true)
    useEffect(() => {
      if (addToCartFetchers.length == 0) {
        setIsAddingToCart(false)
      }
    }, [isAddingToCart == true && context.isAddingToCart])

    return <div className="subscription-form">
        <p className="subscription-title font-tertiary">
            Purchase options
        </p>
        <input
            type="radio"
            name="subscription-form"
            id="subscription-input"
            value="subscription"
            defaultChecked
            onChange={handleInputChange}
        />
        <label className="subscription-product-form-wrapper" htmlFor="subscription-input">
            <div className="product-label-banner">
                <span className='icon-with-text'>
                    <ClockIcon />
                    <p className='icon-text'>Zero upfront charges!</p>
                </span>
                <p>You will only be charged when filters ship.</p>
            </div>
            <div className="grid gap-2 product-form-wrapper-grid">
                <Heading as="h1" className="whitespace-normal product-title">
                    Filter Club
                </Heading>
                <div className="product-price font-tertiary">
                    <span className="stike-out">
                        <Money
                            data={{
                                amount: amount.compareAtPrice.toFixed(2),
                                currencyCode: 'USD'
                            }}
                            as="span"
                        />
                    </span>
                    {" "}
                    <Money
                        data={{
                            amount: amount.price.toFixed(2),
                            currencyCode: 'USD'
                        }}
                        as="span"
                    />
                    <span className="price-sub-text">per year</span>
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
                    <div className='subscription-benefits'>
                        <p className="font-tertiary include-benifits filter_club_benefits">
                            <span onClick={openMembershipBenifitsDrawer}>
                                Filter club benefits
                            </span>
                            <span onClick={openMembershipBenifitsDrawer}>
                                <FilterClubQuestionIcon />
                            </span>
                        </p>
                        <p className="font-tertiary include-benifits filter_club_benefits">
                            <span onClick={openMembershipSavingsDrawer}>
                                How much you save?
                            </span>
                            <span onClick={openMembershipSavingsDrawer}>
                                <FilterClubQuestionIcon />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </label>
        <input
            type="radio"
            name="subscription-form"
            id="onetime-input"
            value="onetime"
            onChange={handleInputChange}
        />
        <label className="product-form-wrapper mt-8" htmlFor="onetime-input">
            <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal product-title">
                    No Subscription
                </Heading>
                {productAmount && productAmount !== 0 ? <div className="product-price font-tertiary">
                    <Money
                        data={{
                            amount: productAmount.toFixed(2),
                            currencyCode: 'USD'
                        }}
                        as="span"
                    />
                </div> : <></>}
                <div className="grid gap-4 py-1">
                    <div className="font-tertiary product-description">
                        One time purchase buy filters separately
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
              isAddingToCart={isAddingToCart}
              onClick={handleAddToCartClick}
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
