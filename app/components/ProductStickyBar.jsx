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
    let body, stickyFloat, footer, compareContainer, mobileGridTable, gridPropertyValueRow;

    const context = useContext(RequestContext)
    let elInView = false;

    const handleWindowScroll = (ev) => {
        const stickybar = document.querySelector(".product-content");
        const rect = stickybar?.getBoundingClientRect();
        if ((rect.bottom - 300) < 0) {
            setIsSticky(true)
        } else {
            setIsSticky(false)
        }

        const compareHeadingRow = document.querySelector('.grid-heading-row');
        const compareHeadingRowDummy = document.querySelector('.grid-heading-row__dummy');

        const scrollElement = document.querySelector('[data-scroll');
        const targetElements = document.querySelector('[data-target]');
        let isFirstScrolling = false;
        let isSecondScrolling = false;

        let timeOut;
        const customDebounce = (tracker) => {
            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                if(tracker === "first")
                    isFirstScrolling = !isFirstScrolling;
                else
                    isSecondScrolling = !isSecondScrolling;
            }, 700);
        }

        const handleScrollElementScroll = function (e) {
          if(!isSecondScrolling) {
              isFirstScrolling = true;
              customDebounce("first");
              if(targetElements){targetElements.scrollLeft = e.target.scrollLeft;}
          }
        }

        const handleTargetElementScroll = function(e) {
          if(!isFirstScrolling) {
              isSecondScrolling = true;
              customDebounce("second");
              debugger;
              if(scrollElements){scrollElements?.scrollLeft = e.target.scrollLeft;}
          }
        }

        let getscrollLeft = 0;
        body = document.querySelector('body');
        let callback = (entries, observer) => {
            entries.forEach((entry) => {
              // Added static numbers by checking on the scroll position
              if(entry.isIntersecting && (entry.boundingClientRect.top <= 35 && entry.boundingClientRect.top >= -829) ){
                if (!elInView) {
                    compareHeadingRow.classList.add('grid-heading-row--fixed');
                    targetElements.scrollLeft = scrollElement.scrollLeft
                    compareHeadingRowDummy?.classList.add('grid-heading-row__dummy--active');
                    scrollElement.addEventListener('scroll', handleScrollElementScroll);
                    targetElements.addEventListener('scroll', handleTargetElementScroll);
                    let compareValueWidth = document.querySelector('.mobile-grid-container .grid-properties-row .grid-property-value-row .compare-value').getBoundingClientRect().width;
                    document.querySelector('.grid-heading-row--fixed').style['grid-template-columns'] = `repeat( 4, minmax(${compareValueWidth}px, ${compareValueWidth}px) )`;
                    elInView = true;
                }
              }
              else {
                scrollElements?.removeEventListener('scroll', handleScrollElementScroll);
                targetElements?.removeEventListener('scroll', handleTargetElementScroll);

                if(compareHeadingRow.classList.contains('grid-heading-row--fixed')) {
                    compareHeadingRow.classList.remove('grid-heading-row--fixed');
                  
                }
                if(compareHeadingRowDummy?.classList.contains('grid-heading-row__dummy--active')) {
                    compareHeadingRowDummy.classList.remove('grid-heading-row__dummy--active');
                }
                elInView = false;
              }
            });
          };
          let observer = new IntersectionObserver(callback);
          if(compareContainer){observer.observe(compareContainer);}
    }

    function checkOffset() {        
        function getRectTop(el){
            let rect = el?.getBoundingClientRect();
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
        body = document.querySelector('body');
        stickyFloat = document.querySelector('.stickybar_main_section');
        footer = document.querySelector('footer');
        compareContainer = document.querySelector('.mobile-grid-container');
        mobileGridTable = document.querySelector('.mobile-grid-container .mobile-grid-table');
        gridPropertyValueRow =  document.querySelector('.grid-property-value-row');
        if(mobileGridTable) { mobileGridTable.style.width = gridPropertyValueRow?.getBoundingClientRect().width + 'px'; }

        window.addEventListener("scroll", function (ev) {
            handleWindowScroll(ev);
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