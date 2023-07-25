import { useEffect, useState, useContext } from 'react';
import {
    Button,
    AddToCartButton,
    RequestContext
} from '~/components';

import { Money } from '@shopify/hydrogen';

import { useCartFetchers } from '~/hooks/useCartFetchers';


export function ProductStickyBar({title, data, price, isSubscriptionProduct, ...props}) {
    const [isSticky, setIsSticky] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    var stickyFloat;
    var footer;

    const context = useContext(RequestContext)

    const handleWindowScroll = () => {
        const stickybar = document.querySelector(".product-content");
        const rect = stickybar.getBoundingClientRect();
        if ((rect.bottom - 300) < 0) {
            setIsSticky(true)
        } else {
            setIsSticky(false)
        }

        const compareContainer = document.querySelector('.mobile-grid-container');
        const compareHeadingRow = document.querySelector('.grid-heading-row');
        const prevSectionContainer = document.querySelector('#capacity-section-icon');
        const prevRectVal = prevSectionContainer.getBoundingClientRect();

        if (prevRectVal.top <= -168) {
            compareHeadingRow.style.position = 'sticky';
            compareHeadingRow.style.top = '0';
            compareHeadingRow.style.margin = '0';
            compareHeadingRow.style.zIndex = '5';
            compareContainer.style.height = window?.outerHeight+'px';
            compareContainer.style.touchAction = 'none';
            compareHeadingRow.style.backgroundColor = '#fff';
        } else {
            compareHeadingRow.style.position = 'relative';
            compareHeadingRow.style.width = '100%';
            compareContainer.style.height = '';
        }
    }

    function checkOffset() {        
        function getRectTop(el){
            var rect = el.getBoundingClientRect();
            return rect.top;
        }
        
        if((getRectTop(stickyFloat) + document.body.scrollTop) + stickyFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10) {
            stickyFloat.style.transform = 'translateY(calc(100% + 30px))';
        }
        if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)){
            stickyFloat.style.transform = 'translateY(0)';
        }
    }
    
    useEffect(() => {
        stickyFloat = document.querySelector('.stickybar_main_section');
        footer = document.querySelector('footer');

        window.addEventListener("scroll", function () {
            handleWindowScroll();
            checkOffset();
        });
        return () => {
            window.removeEventListener("scroll", handleWindowScroll)
        }
    }, []);

    useEffect(() => {
        const body = document.querySelector("body")
        const header = document.querySelector(".main_header")
        const sectionLength = body.querySelector("#mainContent").querySelectorAll("section").length
        if (isSticky) {
            header.classList.add('is-hidden')
            body.classList.add("sticky-product-footer-attached")
            body.classList.add(`sticky-${sectionLength >= 5}`)
        } else {
            header.classList.remove('is-hidden')
            body.classList.remove("sticky-product-footer-attached")
            body.classList.remove(`sticky-${sectionLength >= 5}`)
        }    

        return () => {
            header.classList.remove('is-hidden')
            body.classList.remove("sticky-product-footer-attached")
            body.classList.remove(`sticky-${sectionLength >= 5}`)
        }

    }, [isSticky])

    const addToCartFetchers = useCartFetchers('ADD_TO_CART');
    const handleAddToCartClick = () => setIsAddingToCart(true)
    useEffect(() => {
      if (addToCartFetchers.length == 0) {
        setIsAddingToCart(false)
      }
    }, [isAddingToCart == true && context.isAddingToCart])

    if (isSubscriptionProduct) {
        // Handle Subscriptions line items here 
        const oneTimeProducts = props.products.nodes.filter((p) => props.parsedProductDetails.linkedProducts.default.includes(p.handle))

        const subscriptionItems = props.products.nodes.filter((p) => {
            return props.parsedProductDetails.linkedProducts.subscription.includes(p.handle)
        })

        return <div className="md:hidden" id='js_stickybar_main_section'>
            <div className={`stickybar_main_section ${'is-shown'}`}>
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
        <div className={`stickybar_main_section ${isSticky == true ? 'is-shown' : 'is-hidden'}`}>
            <div className="container mx-auto">
                <div className="stickybar_main_section_inner">
                    <div className="sticky_image_wrapper">
                        <img className='hidden md:block' src={data[0].image.url} alt="" />
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
                            isAddingToCart={isAddingToCart}
                            onClick={handleAddToCartClick}
                        >
                            {props.selectedVariant.quantityAvailable < 5 ? "Pre-Order" : "Add to Cart"}
                        </AddToCartButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}