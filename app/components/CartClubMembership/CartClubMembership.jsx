import { useContext, useState, useEffect } from 'react';

import { Money } from '@shopify/hydrogen';

import {
    CartClubMembershipIcon,
    QuestionIcon,
    AddToCartButton,
    RequestContext
} from '~/components';
import {Button} from '~/components';

import { useCartFetchers } from '~/hooks/useCartFetchers';


export function CartClubMembership({products}) {
    const context = useContext(RequestContext)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const subscriptionProduct = products.find((product) => product.handle == "melissani-m1-filter")
    if (!subscriptionProduct.metafields.length) {
        return null;
    }

    const parsesMetafield = JSON.parse(subscriptionProduct.metafields[0].value)
    const bundleId = new Date().getTime().toString()
    const price = {amount: 0.0, compareAtPrice: 0.0}
    const subscriptionProducts = parsesMetafield.linkedProducts.subscription.map((productHandle) => {
        const item = products.find((product) => product.handle == productHandle)
        const itemMetafield = JSON.parse(item.metafields[0].value)
        price.amount += parseFloat(itemMetafield.price)
        price.compareAtPrice += parseFloat(itemMetafield.compareAtPrice)
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

    const addToCartFetchers = useCartFetchers('ADD_TO_CART');
    const handleAddToCartClick = () => setIsAddingToCart(true)
    useEffect(() => {
      if (addToCartFetchers.length == 0) {
        setIsAddingToCart(false)
      }
    }, [isAddingToCart == true && context.isAddingToCart])

    return(
        <section className="cart-club-membership-section">
            <CartClubMembershipIcon className="cart-club-icon"/>
            <div className="club-membership-container">
                <span className="label label-default add-on-label">Add-on</span>
                <div className="club-membership-content">
                    <div className="club-membership-left-content col-span-3 md:col-span-1">
                        <h3>Filter Club Membership</h3>
                        <p>Save 10% on Melissani M1 Filters.<br/>Filters ship based on the optimum service cycle.</p>
                    </div>
                    <div className="club-membership-right-content">
                        <AddToCartButton
                            className="club-membership-add-btn"
                            lines={subscriptionProducts}
                            variant="secondary"
                            data-test="add-to-cart"
                            isAddingToCart={isAddingToCart}
                            onClick={handleAddToCartClick}
                        >
                            +ADD
                        </AddToCartButton>
                    </div>
                </div>
                <div className="club-membership-price col-span-3 md:col-span-1 ">
                    <span className="price">
                        <Money                            
                            data={{amount: price.compareAtPrice.toFixed(2), currencyCode: "USD"}}
                        />
                    </span>
                    <span className="offer-price">
                        <Money                            
                            data={{amount: price.amount.toFixed(2), currencyCode: "USD"}}
                        />
                    </span>
                </div>
                <div className="club-membership-content bottom">
                    <div className="club-membership-button">
                        <AddToCartButton
                            className="club-membership-add-btn"
                            lines={subscriptionProducts}
                            variant="secondary"
                            data-test="add-to-cart"
                            isAddingToCart={isAddingToCart}
                            onClick={handleAddToCartClick}
                        >
                            +ADD
                        </AddToCartButton>
                    </div>
                    <div className="club-membership-benefits">
                        <button className="flex items-center" onClick={context.openFilterClubBenifitsBottomModal}>
                            <div className="icon-wrapper">
                                <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.96558 7.51142L2.96717 7.62472H3.08049H4.53861H4.65354V7.5098V7.14527C4.65354 6.94675 4.68129 6.77927 4.73362 6.64041C4.78879 6.50494 4.88395 6.37247 5.02422 6.24377C5.17108 6.1129 5.37928 5.96881 5.65184 5.81188L5.65185 5.8119L5.65384 5.81071C5.946 5.63455 6.19522 5.43991 6.40021 5.22619L6.40101 5.22535C6.60756 5.00561 6.76433 4.75867 6.8704 4.48493C6.98116 4.20995 7.03556 3.90624 7.03556 3.57538V3.56281C7.03556 3.0809 6.91033 2.64974 6.65784 2.27322C6.40619 1.89795 6.05407 1.60639 5.60594 1.39744C5.16024 1.18346 4.64209 1.07843 4.05467 1.07843C3.42138 1.07843 2.87658 1.19177 2.42494 1.42407C1.97568 1.65097 1.62786 1.96706 1.38545 2.37254L1.38545 2.37253L1.38498 2.37333C1.1483 2.77656 1.02013 3.23304 0.99846 3.74017L0.998355 3.74016V3.74508V3.75765V3.87306L1.11377 3.87257L2.58447 3.86629L2.61134 3.86617L2.63537 3.85415L2.64794 3.84787L2.70803 3.81782L2.71133 3.75072C2.72309 3.51165 2.78344 3.30916 2.88896 3.13958L2.88896 3.13958L2.88955 3.13862C2.99591 2.96388 3.1395 2.82968 3.32213 2.73456C3.50436 2.63965 3.71815 2.59043 3.96668 2.59043C4.22049 2.59043 4.43439 2.63798 4.61205 2.7287L4.61205 2.7287L4.61292 2.72914C4.79738 2.82137 4.93575 2.94409 5.03235 3.09642L5.03234 3.09642L5.03305 3.0975C5.12855 3.24443 5.17789 3.41698 5.17789 3.61937V3.63195C5.17789 3.82487 5.14639 3.98896 5.08677 4.12684L5.08674 4.12683L5.08575 4.12928C5.03091 4.26454 4.93394 4.39731 4.78894 4.52664L4.78893 4.52663L4.78778 4.52769C4.64437 4.65915 4.44586 4.80348 4.18979 4.96045C3.89838 5.13619 3.65532 5.32445 3.46253 5.526L3.46249 5.52604C3.27076 5.72669 3.13364 5.95545 3.05269 6.21162C2.97229 6.46191 2.94227 6.74794 2.95932 7.06746L2.96558 7.51142ZM4.7176 10.3152L4.71857 10.3143C4.93342 10.109 5.03693 9.83613 5.03693 9.50843C5.03693 9.18104 4.93357 8.90977 4.71807 8.70838C4.50367 8.50378 4.21953 8.40676 3.87869 8.40676C3.54121 8.40676 3.25771 8.50422 3.03972 8.70799C2.82394 8.90942 2.72045 9.18083 2.72045 9.50843C2.72045 9.83613 2.82395 10.109 3.0388 10.3143L3.03878 10.3143L3.04071 10.3161C3.25878 10.5152 3.54193 10.6101 3.87869 10.6101C4.21907 10.6101 4.50304 10.5155 4.71759 10.3152L4.7176 10.3152Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.229852"/>
                                </svg>
                            </div>
                            <p className="font-tertiary club-membership-benefits-text">Filter Club Benefits</p>
                        </button>
                    </div>
                </div>    
                <hr />
                <p className="club-membership-bottom-text">
                    Join our filter club for free! Get charged only when we ship your product after 6 months.
                </p>
            </div>
        </section>
    )
}