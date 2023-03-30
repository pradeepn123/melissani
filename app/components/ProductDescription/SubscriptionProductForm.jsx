import { useState, useEffect, useContext } from 'react';
import { Money, flattenConnection, Image } from '@shopify/hydrogen';

import { useLoaderData } from '@remix-run/react';

import {
    Heading,
    QuantityAdjust,
    AddToCartButton,
    Text,
    RequestContext
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
        const subscriptionItems = props.products.filter((p) => {
            return props.parsedProductDetails.linkedProducts.subscription.includes(p.handle)
        }).map((item) => {
            const itemMetafield = JSON.parse(item.metafields[0].value)
            filterClubPrice += itemMetafield.price
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
        const oneTimeProducts = props.products.filter((p) => props.parsedProductDetails.linkedProducts.default.includes(p.handle))
        var productAmountUnit = 0
        setOneTimeProducts(oneTimeProducts.map(oneTimeProduct => {
            const firstVariant = oneTimeProduct.variants.nodes[0];
            oneTimeProduct.quantity = 1

            productAmountUnit += oneTimeProduct.quantity * firstVariant.price?.amount
            return oneTimeProduct
        }))
        setProductAmount(productAmountUnit)

        setAmount({compareAtPrice: oneTimeProducts.reduce((acc, lineProduct) => {
            const firstVariant = lineProduct.variants.nodes[0];
            return acc + parseFloat(firstVariant.price?.amount)
        }, 0), price: filterClubPrice})
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
        <label className="product-form-wrapper" htmlFor="subscription-input">
            <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal product-title">
                    Filter Club Membership
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
                    <p className="font-tertiary include-benifits filter_club_benefits">
                        <span onClick={openMembershipBenifitsDrawer}>
                            Filter club benefits
                        </span>
                        <span onClick={openMembershipBenifitsDrawer}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8.48283" stroke="#1B2943" strokeWidth="1.03433"/>
                                <path d="M8.06951 10.4734L8.07071 10.5584H8.15569H9.14007H9.22626V10.4722V10.2261C9.22626 10.0929 9.24488 9.98097 9.27973 9.88844C9.3164 9.79845 9.37978 9.71008 9.47367 9.62391C9.57221 9.53611 9.7122 9.43919 9.8959 9.33342L9.89591 9.33343L9.8974 9.33254C10.0952 9.21329 10.264 9.08143 10.403 8.93652L10.4036 8.93589C10.5438 8.78678 10.6502 8.61915 10.7223 8.43331C10.7975 8.24653 10.8344 8.0404 10.8344 7.8161V7.80762C10.8344 7.48071 10.7494 7.18794 10.5779 6.93223C10.4071 6.67745 10.1681 6.47965 9.8643 6.338C9.56204 6.19289 9.21093 6.12181 8.81336 6.12181C8.38484 6.12181 8.01563 6.1985 7.70922 6.35609C7.4046 6.50994 7.16854 6.72441 7.00399 6.99965L7.00399 6.99965L7.00364 7.00025C6.84308 7.27379 6.75621 7.58336 6.74152 7.92698L6.74144 7.92698V7.93066V7.93915V8.02571L6.82801 8.02534L7.82087 8.0211L7.84102 8.02101L7.85905 8.012L7.86753 8.00776L7.9126 7.98522L7.91507 7.9349C7.92295 7.77474 7.96335 7.6395 8.0337 7.52644L8.0337 7.52645L8.03414 7.52572C8.10513 7.4091 8.2009 7.31959 8.3228 7.2561C8.44441 7.19276 8.58733 7.15977 8.75396 7.15977C8.92423 7.15977 9.06724 7.19167 9.18573 7.25218L9.18573 7.25218L9.18638 7.25251C9.30966 7.31415 9.40183 7.39599 9.46612 7.49737L9.46611 7.49737L9.46664 7.49818C9.53011 7.59582 9.56303 7.71064 9.56303 7.8458V7.85429C9.56303 7.9836 9.54192 8.09318 9.50223 8.18498L9.50221 8.18497L9.50146 8.1868C9.46504 8.27664 9.40047 8.36523 9.30333 8.45187L9.30333 8.45186L9.30246 8.45266C9.2062 8.5409 9.07269 8.63801 8.90009 8.74381C8.70288 8.86275 8.53817 8.99029 8.40739 9.12701L8.40736 9.12704C8.27706 9.2634 8.18379 9.41897 8.12873 9.59321C8.07407 9.76335 8.05375 9.95747 8.06529 10.1739L8.06951 10.4734ZM9.26677 12.3724L9.26677 12.3725L9.26751 12.3718C9.41452 12.2313 9.48509 12.0447 9.48509 11.8215C9.48509 11.5985 9.41463 11.413 9.26714 11.2751C9.12047 11.1352 8.92634 11.0691 8.69455 11.0691C8.46501 11.0691 8.27139 11.1355 8.12234 11.2748C7.97459 11.4127 7.90402 11.5984 7.90402 11.8215C7.90402 12.0447 7.97459 12.2313 8.1216 12.3718L8.12159 12.3718L8.12303 12.3731C8.27215 12.5092 8.46553 12.5738 8.69455 12.5738C8.92599 12.5738 9.11998 12.5095 9.26677 12.3724Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.172389"/>
                            </svg>
                        </span>
                    </p>
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
                <div className="product-price font-tertiary">
                    <Money
                        data={{
                            amount: productAmount.toFixed(2),
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
