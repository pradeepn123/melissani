import { useEffect, useState, useContext } from 'react';
import {
    Button,
    AddToCartButton,
    RequestContext
} from '~/components';
import {Money} from '@shopify/hydrogen';


export function ProductStickyBar({title, media, price, isSubscriptionProduct, ...props}) {
    const [isSticky, setIsSticky] = useState(false);
    const context = useContext(RequestContext)

    const handleWindowScroll = () => {
        const stickybar = document.querySelector(".product-header");
        const rect = stickybar.getBoundingClientRect();
        if (rect.bottom < 0) {
            setIsSticky(true)
        } else {
            setIsSticky(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleWindowScroll);
        return () => {
            window.removeEventListener("scroll", handleWindowScroll)
        }
    }, []);

    useEffect(() => {
        const body = document.querySelector("body")
        if (isSticky) {
            body.classList.add("sticky-footer-attached")
        } else {
            body.classList.remove("sticky-footer-attached")
        }
        return () => {
            body.classList.remove("sticky-footer-attached")
        }
    }, [isSticky])

    if (isSubscriptionProduct) {
        // Handle Subscriptions line items here 
        const oneTimeProducts = props.products.nodes.filter((p) => props.parsedProductDetails.linkedProducts.default.includes(p.handle))

        const subscriptionItems = props.products.nodes.filter((p) => {
            return props.parsedProductDetails.linkedProducts.subscription.includes(p.handle)
        })

        return <div className="md:hidden" id='js_stickybar_main_section'>
            <div className="stickybar_main_section">
                <div className="container mx-auto">
                    <div className="stickybar_main_section_inner">
                        <p className="subscription-title font-tertiary">
                            Purchase options
                        </p>
                        <div className="sticky_secondary_button w-full">                     
                            <Button
                                className="rounded-full w-full text-center py-3 px-9 border border-primary bg-contrast text-primary"
                                onClick={() => context.openSubscriptionModalOpen(subscriptionItems)}
                            >
                                Filter Club Membership
                            </Button>                         
                        </div>
                        <div className="sticky_button">   
                            <Button
                                className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]"
                                onClick={() => context.openNoSubscriptionModalOpen(oneTimeProducts)}
                            >
                                No Subscription
                            </Button>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return <div className="" id='js_stickybar_main_section'>
        <div className="stickybar_main_section">
            <div className="container mx-auto">
                <div className="stickybar_main_section_inner">
                    <div className="sticky_image_wrapper">
                        <img className='hidden md:block' src="https://cdn.shopify.com/s/files/1/0684/3023/3888/products/Group7192.jpg" alt="" />
                        <div className="title_price_combo">
                            <h2>{title}</h2>
                            {price && <div className="product-price font-tertiary">
                                <Money
                                    withoutTrailingZeros
                                    data={price}
                                    as="span"
                                />
                            </div>}
                        </div>
                    </div>
                    <div className="sticky_button">
                        <AddToCartButton
                            className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]"
                            lines={[{merchandiseId: props.selectedVariant.id, quantity: 1}]}
                            data-test="add-to-cart"
                        >
                            Add to cart
                        </AddToCartButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}