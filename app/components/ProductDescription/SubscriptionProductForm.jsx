import { useState, useEffect } from 'react';
import { Money } from '@shopify/hydrogen';

import { useLoaderData } from '@remix-run/react';

import { Heading } from '~/components';


const SubscriptionProductForm = (props) => {
    const { product } = useLoaderData();

    const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(true)
    const [lineItems, setLineItems] = useState(null)
    const [price, setPrice] = useState(0)

    const oneTimeProducts = props.products.filter((p) => {
        return props.parsedProductDetails.linkedProducts.default.includes(p.handle)
    })

    useEffect(() => {
        const subscriptionProducts = props.products.filter((p) => {
            return props.parsedProductDetails.linkedProducts.subscription.includes(p.handle)
        }).map((item) => {
            return {
                id: item.id,
                sellingPlanId: item.sellingPlanGroups.edges[0].node.sellingPlans.edges[0].node.id,
                quantity: 1
            }
        })
        setLineItems(subscriptionProducts)
        setPrice(oneTimeProducts.reduce((acc, lineProduct) => {
            const firstVariant = lineProduct.variants.nodes[0];
            return acc + parseFloat(firstVariant.price?.amount)
        }, 0))
    }, [])

    useEffect(() => {
        // UpdateLineItems
    }, [isSubscriptionSelected])

    const handleInputChange = event => {
        debugger;
        const isSubscription = event.target.value == "subscription"
        setIsSubscriptionSelected(isSubscription)
        const content = event.target.closest(".subscription-form").querySelector(".content")
        if (!isSubscription) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null
        }
    }

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
                {oneTimeProducts.map((oneTimeProduct) => <div key={`one-time-product-${oneTimeProduct.handle}`}>
                    
                </div>)}
            </div>
        </label>
    </div>
}

export default SubscriptionProductForm;
