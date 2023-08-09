import clsx from 'clsx';
import {useRef, useContext} from 'react';
import {useScroll} from 'react-use';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {
  Button,
  Heading,
  IconRemove,
  Text,
  Link,
  RequestContext,
  CartClubMembership,
  CartLoading,
  ClockIcon,
  DrawerFromBottom,
} from '~/components';
import { getInputStyleClasses } from '~/lib/utils';
import { useFetcher, Await, useMatches } from '@remix-run/react';
import { CartAction } from '~/lib/type';


export function Cart({layout, onClose, cart, isCartOpen}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  const context = useContext(RequestContext)
  return (
    <>
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
      {context.isCartUpdating && <CartLoading
        classNames="cart-updating-loader"
      />}
      <FilterClubItemsModal 
        isOpen={context.isFilterClubItemsModalOpen} 
        open={context.openFilterClubItemsModal}
        onClose={context.closeFilterClubItemsModal}
        filterClubItems={context.filterClubItems}
        isCartOpen={isCartOpen}
      />
      <FilterClubBenifitsBottomModal 
        isOpen={context.isFilterClubBenifitsBottomModalOpen} 
        open={context.openFilterClubBenifitsBottomModal}
        onClose={context.closeFilterClubBenifitsModal}
        isCartOpen={isCartOpen}
      />
    </>
  );
}

const FilterClubItemsModal = ({isOpen, open, onClose, filterClubItems, isCartOpen}) => {
  const shipmentDate = new Date()
  shipmentDate.setMonth(shipmentDate.getMonth() + 6)
  const [root] = useMatches();

  let pac_cf_total = 0.0;
  let pac_cf_total_after_discount = 0.0;
  let filters_total = 0.0;
  let filters_total_after_discount = 0.0;

  return <DrawerFromBottom
    open={isOpen}
    openMenu={open}
    onClose={onClose}
    isCartOpen={isCartOpen}
    openFrom="right"
    heading="Filter Club"
    subHeading="What's included?"
    isFilterClubModalOpen = {true}
  >
    <div className='filterclub-included-shipment'>
      <div className='filterclub-included-shipment-label'>
        <p className='shipment-label-title'>
          Upcoming shipment
        </p>
        <p className='shipment-label-title'>
          Amount Charged
        </p>
      </div>
      <div className='filterclub-included-shipment-label'>
        <p className='shipment-label-text'>
          {shipmentDate.toDateString()}
        </p>
        <Await resolve={root.data?.products}>
              {(products) => {
                products.nodes.filter((p) => {
                  return p.handle == "melissani-m1-filter-pac-1" || p.handle == "melissani-m1-filter-cf-1"
                }).map((item) => {
                  let price = parseFloat(item.variants.nodes[0].price.amount);
                  pac_cf_total = parseFloat(pac_cf_total) + price;
                  
                })
                pac_cf_total_after_discount = (pac_cf_total - (0.10 * pac_cf_total)).toFixed(2);
                return <p className='shipment-label-text'>
                      $ {pac_cf_total_after_discount}
                </p>
              }}
        </Await>
      </div>
    </div>
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="filter-club-modal-items">
          <ul className='px-6 sm:px-6 md:px-6'>
            {filterClubItems
            .filter((line) => line.merchandise.product.handle != 'melissani-m1-filter-ro')
            .map((line) => (
            <li
              className="flex gap-8 subscription_filter_club_member drawer"
              key={`filter-club-${line.id}`}
            >
              <div className="flex-shrink">
                <div className="cart-product-img-wrapper">
                  <Image
                    data={line.merchandise.image}
                    className="cart-product-img"
                    />
                </div>
              </div>
              <div className="flex items-center flex-grow include-benifits">
                {line.quantity} X {line.merchandise.product.productType} <span>
                </span>
              </div>
            </li>))}
          </ul>
      </div>
    </div>
    <div className='filterclub-next-shipment'>
        <div className='filterclub-included-shipment-label'>
          <p className='next-shipment-label-title'>
            Next shipment
          </p>
          <p className='next-shipment-label-title'>
            Amount Charged
          </p>
        </div>
        <div className='filterclub-included-shipment-label'>
          <p className='next-shipment-label-text'>
            1 x RO Filter , 1 x PAC Filter , 1 x CF Filter 
          </p>
          <p className='next-shipment-label-title'>
            <Await resolve={root.data?.products}>
                {(products) => {
                  products.nodes.filter((p) => {
                    return p.handle == "melissani-m1-filter-pac-1" || p.handle == "melissani-m1-filter-cf-1" || p.handle == "melissani-m1-filter-ro-1"
                  }).map((item) => {
                    let price = parseFloat(item.variants.nodes[0].price.amount);
                    filters_total = parseFloat(filters_total) + price;
                  })
                  filters_total_after_discount = (filters_total - (0.10 * filters_total)).toFixed(2);
                  return <p className='next-shipment-label-text'>
                        $ {filters_total_after_discount}
                  </p>
                }}
          </Await>
          </p>
        </div>
    </div>
  </DrawerFromBottom>
}

const FilterClubBenifitsBottomModal = ({isOpen, open, onClose, isCartOpen}) => {
  return <DrawerFromBottom
    open={isOpen}
    onClose={onClose}
    openMenu={open}
    isCartOpen={isCartOpen}
    openFrom="right"
    heading="Filter Club"
    subHeading="Benefits"
    isFilterClubModalOpen = {true} 
  >
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="filter-club-membership-benefits-small">
          <ul className='px-4 sm:px-8 md:px-8'>
            <li>10% Discount</li>
            <li>Free Shipping</li>
            <li>Automated Delivery</li>
            <li>Pay on Shipment</li>
            <li>Lifetime Support</li>
            <li>Email Us to Customise</li>
            <li>1 Year Extended Warranty</li>
          </ul>
      </div>
    </div>
  </DrawerFromBottom>
}

export function CartDetails({layout, cart}) {
  // @todo: get optimistic cart cost
  const isZeroCost = !cart || cart?.cost?.subtotalAmount?.amount === '0.0';

  const container = {
    drawer: 'grid grid-cols-1 grid-rows-[1fr_auto] overflow-auto',
    page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  return <div className={container[layout]}>
      <CartLines lines={cart?.lines} layout={layout}  />
  </div>
}

export function CartFooter({layout, cart}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  if (linesCount > 0) {
    return <CartSummary cost={cart.cost} layout={layout}>
      <CartCheckoutActions cost={cart.cost} checkoutUrl={cart.checkoutUrl} />
    </CartSummary>
  }
}

/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */
function CartDiscounts({discountCodes}) {
  const codes = discountCodes?.map(({code}) => code).join(', ') || null;

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <UpdateDiscountForm>
              <button>
                <IconRemove
                  aria-hidden="true"
                  style={{height: 18, marginRight: 4}}
                />
              </button>
            </UpdateDiscountForm>
            <Text as="dd">{codes}</Text>
          </div>
        </div>
      </dl>

      {/* No discounts, show an input to apply a discount */}
      <UpdateDiscountForm>
        <div
          className={clsx(
            codes ? 'hidden' : 'flex',
            'items-center gap-4 justify-between text-copy',
          )}
        >
          <input
            className={getInputStyleClasses()}
            type="text"
            name="discountCode"
            placeholder="Discount code"
          />
          <button className="flex justify-end font-medium whitespace-nowrap">
            Apply Discount
          </button>
        </div>
      </UpdateDiscountForm>
    </>
  );
}

function UpdateDiscountForm({children}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.UPDATE_DISCOUNT}
      />
      {children}
    </fetcher.Form>
  );
}

function CartLines({layout = 'drawer', lines: cartLines}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const [root] = useMatches();

  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const filterClubLineItems = currentLines.filter((line) => {
    return line.attributes.find((attribute) => attribute.key == "Bundle" && attribute.value == "Filter Club")
  })

  const oneTimeLineItems = currentLines.filter(line => {
    return !line.attributes.find((attribute) => attribute.key == "Bundle" && attribute.value == "Filter Club")
  })

  const isPurfierInCart = currentLines.filter(line => line.merchandise.product.productType == "Water Purifier").length > 0

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page'
      ? 'flex-grow md:translate-y-4'
      : 'transition cart-lines-wrapper',
  ]);

  return <>
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      {filterClubLineItems.length > 0 && <span className='shipment-label'>
        <ClockIcon />
        <p className='shipment-label-text'>Charged on shipment</p>
      </span>}
      <ul className="flex flex-col gap-6 md:gap-10">
        {oneTimeLineItems.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
        {filterClubLineItems.length > 0 && <SubsctiptionLineItem lines={filterClubLineItems} />}
      </ul>
      {filterClubLineItems.length > 0 && <div className="cart-shipment-info">
        <p className="font-tertiary">
          Email team@melissaniwater.com to customize your subscription, or edit it in your account after subscription.
        </p>
      </div>}
    </section>
    {filterClubLineItems.length == 0 && isPurfierInCart && <Await resolve={root.data?.products}>
      {(products) => <CartClubMembership products={products.nodes} />}
    </Await>}
  </>
}

function CartCheckoutActions({cost, checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a href={checkoutUrl} target="_self">
        <Button variant="primary" as="span" width="full" className="flex items-center justify-center checkout-btn">
          {"Checkout"}
        </Button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({cost, layout, children = null}) {
  const summary = {
    drawer: 'grid gap-4 cart-summary-footer sticky bottom-0',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full',
  };

  return (
    <section aria-labelledby="summary-heading" className={summary[layout]}>
      <dl className="grid">
        <div className="flex items-center justify-between">
          <Text as="dt" className="font-primary cart-footer-subtotal">Subtotal</Text>
          <Text as="dd" data-test="subtotal" className="font-tertiary cart-footer-total">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
      </dl>
      {children}
    </section>
  );
}

function SubsctiptionLineItem({lines}) {
  const context = useContext(RequestContext)
  const image = {...lines[0].merchandise.image}
  image.url = "https://cdn.shopify.com/s/files/1/0684/3023/3888/files/FILTER_CLUB_CART_IMAGE.png"

  const shipmentDate = new Date()
  shipmentDate.setMonth(shipmentDate.getMonth() + 6)

  return <li className="flex gap-8 subscription_filter_club_member">
      <div className="flex-shrink">
        <div className="cart-product-img-wrapper">
          <Image
            data={image}
            className="cart-product-img"
          />
        </div>
      </div>
      <div className="flex justify-between items-center flex-grow">
        <div className="grid gap-2">
          <Heading as="h3" size="copy" className="font-primary cart-product-title">
            Filter Club
          </Heading>
          <div className="grid pb-2">
            <Text className="font-tertiary cart-product-price club-membership-price">
              <span className="price">
                <SubscriptionLinesCompareAtPrice lines={lines} as="span" />
              </span>
              <span className="offer-price">
                <SubscriptionLinesPrice lines={lines} as="span" />
              </span>
            </Text>
          </div>

          <div className="grid gap-2 pb-2">
            <Text className="font-tertiary filter-club-text">
              Filters ship based on the <strong>Optimum service cycle</strong>
            </Text>
            <Text className="font-tertiary filter-club-text">
              First charge and shipment date is <strong>{shipmentDate.toDateString()}</strong>
            </Text>
          </div>

          <div className="items-center cart-filter-club-icons cart-filter-club-icons-desktop">
            <button className="flex items-center" onClick={() => context.openFilterClubItemsModal(lines)}>
              <div className="icon-wrapper">
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5.5L10 1" stroke="#1B2943" strokeWidth="2"/>
                </svg>
              </div>
              <p className="font-tertiary">What's included?</p>
            </button>
            <button className="flex items-center" onClick={context.openFilterClubBenifitsBottomModal}>
              <div className="icon-wrapper">
                <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.96558 7.51142L2.96717 7.62472H3.08049H4.53861H4.65354V7.5098V7.14527C4.65354 6.94675 4.68129 6.77927 4.73362 6.64041C4.78879 6.50494 4.88395 6.37247 5.02422 6.24377C5.17108 6.1129 5.37928 5.96881 5.65184 5.81188L5.65185 5.8119L5.65384 5.81071C5.946 5.63455 6.19522 5.43991 6.40021 5.22619L6.40101 5.22535C6.60756 5.00561 6.76433 4.75867 6.8704 4.48493C6.98116 4.20995 7.03556 3.90624 7.03556 3.57538V3.56281C7.03556 3.0809 6.91033 2.64974 6.65784 2.27322C6.40619 1.89795 6.05407 1.60639 5.60594 1.39744C5.16024 1.18346 4.64209 1.07843 4.05467 1.07843C3.42138 1.07843 2.87658 1.19177 2.42494 1.42407C1.97568 1.65097 1.62786 1.96706 1.38545 2.37254L1.38545 2.37253L1.38498 2.37333C1.1483 2.77656 1.02013 3.23304 0.99846 3.74017L0.998355 3.74016V3.74508V3.75765V3.87306L1.11377 3.87257L2.58447 3.86629L2.61134 3.86617L2.63537 3.85415L2.64794 3.84787L2.70803 3.81782L2.71133 3.75072C2.72309 3.51165 2.78344 3.30916 2.88896 3.13958L2.88896 3.13958L2.88955 3.13862C2.99591 2.96388 3.1395 2.82968 3.32213 2.73456C3.50436 2.63965 3.71815 2.59043 3.96668 2.59043C4.22049 2.59043 4.43439 2.63798 4.61205 2.7287L4.61205 2.7287L4.61292 2.72914C4.79738 2.82137 4.93575 2.94409 5.03235 3.09642L5.03234 3.09642L5.03305 3.0975C5.12855 3.24443 5.17789 3.41698 5.17789 3.61937V3.63195C5.17789 3.82487 5.14639 3.98896 5.08677 4.12684L5.08674 4.12683L5.08575 4.12928C5.03091 4.26454 4.93394 4.39731 4.78894 4.52664L4.78893 4.52663L4.78778 4.52769C4.64437 4.65915 4.44586 4.80348 4.18979 4.96045C3.89838 5.13619 3.65532 5.32445 3.46253 5.526L3.46249 5.52604C3.27076 5.72669 3.13364 5.95545 3.05269 6.21162C2.97229 6.46191 2.94227 6.74794 2.95932 7.06746L2.96558 7.51142ZM4.7176 10.3152L4.71857 10.3143C4.93342 10.109 5.03693 9.83613 5.03693 9.50843C5.03693 9.18104 4.93357 8.90977 4.71807 8.70838C4.50367 8.50378 4.21953 8.40676 3.87869 8.40676C3.54121 8.40676 3.25771 8.50422 3.03972 8.70799C2.82394 8.90942 2.72045 9.18083 2.72045 9.50843C2.72045 9.83613 2.82395 10.109 3.0388 10.3143L3.03878 10.3143L3.04071 10.3161C3.25878 10.5152 3.54193 10.6101 3.87869 10.6101C4.21907 10.6101 4.50304 10.5155 4.71759 10.3152L4.7176 10.3152Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.229852"/>
                </svg>
              </div>
              <p className="font-tertiary">Filter Club Benefits</p>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex justify-start text-copy">
              <SubscriptionLineQuantityAdjust lines={lines} />
            </div>
            <ItemRemoveButton lineIds={lines.map(line => line.id)} />
          </div>
        </div>
      </div>
      <div className="flex items-center cart-filter-club-icons cart-filter-club-icons-mobile">
        <button className="flex items-center" onClick={() => context.openFilterClubItemsModal(lines)}>
          <div className="icon-wrapper">
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5.5 5.5L10 1" stroke="#1B2943" strokeWidth="2"/>
            </svg>
          </div>
          <p className="font-tertiary">What's included?</p>
        </button>
        <button className="flex items-center" onClick={context.openFilterClubBenifitsBottomModal}>
          <div className="icon-wrapper">
            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.96558 7.51142L2.96717 7.62472H3.08049H4.53861H4.65354V7.5098V7.14527C4.65354 6.94675 4.68129 6.77927 4.73362 6.64041C4.78879 6.50494 4.88395 6.37247 5.02422 6.24377C5.17108 6.1129 5.37928 5.96881 5.65184 5.81188L5.65185 5.8119L5.65384 5.81071C5.946 5.63455 6.19522 5.43991 6.40021 5.22619L6.40101 5.22535C6.60756 5.00561 6.76433 4.75867 6.8704 4.48493C6.98116 4.20995 7.03556 3.90624 7.03556 3.57538V3.56281C7.03556 3.0809 6.91033 2.64974 6.65784 2.27322C6.40619 1.89795 6.05407 1.60639 5.60594 1.39744C5.16024 1.18346 4.64209 1.07843 4.05467 1.07843C3.42138 1.07843 2.87658 1.19177 2.42494 1.42407C1.97568 1.65097 1.62786 1.96706 1.38545 2.37254L1.38545 2.37253L1.38498 2.37333C1.1483 2.77656 1.02013 3.23304 0.99846 3.74017L0.998355 3.74016V3.74508V3.75765V3.87306L1.11377 3.87257L2.58447 3.86629L2.61134 3.86617L2.63537 3.85415L2.64794 3.84787L2.70803 3.81782L2.71133 3.75072C2.72309 3.51165 2.78344 3.30916 2.88896 3.13958L2.88896 3.13958L2.88955 3.13862C2.99591 2.96388 3.1395 2.82968 3.32213 2.73456C3.50436 2.63965 3.71815 2.59043 3.96668 2.59043C4.22049 2.59043 4.43439 2.63798 4.61205 2.7287L4.61205 2.7287L4.61292 2.72914C4.79738 2.82137 4.93575 2.94409 5.03235 3.09642L5.03234 3.09642L5.03305 3.0975C5.12855 3.24443 5.17789 3.41698 5.17789 3.61937V3.63195C5.17789 3.82487 5.14639 3.98896 5.08677 4.12684L5.08674 4.12683L5.08575 4.12928C5.03091 4.26454 4.93394 4.39731 4.78894 4.52664L4.78893 4.52663L4.78778 4.52769C4.64437 4.65915 4.44586 4.80348 4.18979 4.96045C3.89838 5.13619 3.65532 5.32445 3.46253 5.526L3.46249 5.52604C3.27076 5.72669 3.13364 5.95545 3.05269 6.21162C2.97229 6.46191 2.94227 6.74794 2.95932 7.06746L2.96558 7.51142ZM4.7176 10.3152L4.71857 10.3143C4.93342 10.109 5.03693 9.83613 5.03693 9.50843C5.03693 9.18104 4.93357 8.90977 4.71807 8.70838C4.50367 8.50378 4.21953 8.40676 3.87869 8.40676C3.54121 8.40676 3.25771 8.50422 3.03972 8.70799C2.82394 8.90942 2.72045 9.18083 2.72045 9.50843C2.72045 9.83613 2.82395 10.109 3.0388 10.3143L3.03878 10.3143L3.04071 10.3161C3.25878 10.5152 3.54193 10.6101 3.87869 10.6101C4.21907 10.6101 4.50304 10.5155 4.71759 10.3152L4.7176 10.3152Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.229852"/>
            </svg>
          </div>
          <p className="font-tertiary">Filter Club Benefits</p>
        </button>
      </div>
    </li>
}

function CartLineItem({line}) {
  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li key={id} className="flex gap-4 sm:gap-6 md:gap-8">
      <div className="flex-shrink">
        {merchandise.image && (
          <div className="cart-product-img-wrapper">
            <Image
              data={merchandise.image}
              className="cart-product-img"
              alt={merchandise.title}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center flex-grow">
        <div className="grid gap-2">
          <Heading as="h3" size="copy" className="font-primary cart-product-title">
            {merchandise?.product?.title || ''}
          </Heading>

          <div className="grid pb-2">
            <Text className="font-tertiary cart-product-price">
              <CartLinePrice line={line} as="span" />
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex justify-start text-copy">
              <CartLineQuantityAdjust line={line} />
            </div>
            <ItemRemoveButton lineIds={[id]} />
          </div>
        </div>
      </div>
    </li>
  );
}

function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.REMOVE_FROM_CART}
      />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button
        className="flex items-center justify-center cart-delete-btn"
        type="submit"
      >
        <span className="sr-only">Remove</span>
        <IconRemove aria-hidden="true" className="w-6 h-6" />
      </button>
    </fetcher.Form>
  );
}

function CartLineQuantityAdjust({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center quantity-selector-wrapper">
        <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="quantity-selector-btn transition text-primary/50 hover:text-primary disabled:text-primary/10"
            value={prevQuantity}
            disabled={quantity < 1}
          >
            <span>&#8722;</span>
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center cart-product-quantity" data-test="item-quantity">
          {quantity}
        </div>

        <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            className="quantity-selector-btn transition text-primary/50 hover:text-primary"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
          </button>
        </UpdateCartButton>
      </div>
    </>
  );
}

function SubscriptionLineQuantityAdjust({lines}) {

  const quantity = lines[0].quantity
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  const prevLineToUpdate = lines.map(line => {
    return {id: line.id, quantity: prevQuantity, attributes: line.attributes}
  })

  const nextLineToUpdate = lines.map(line => {
    return {id: line.id, quantity: nextQuantity, attributes: line.attributes}
  })

  return (
    <>
      <div className="flex items-center quantity-selector-wrapper">
        <UpdateCartButton lines={prevLineToUpdate}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="quantity-selector-btn transition text-primary/50 hover:text-primary disabled:text-primary/10"
            value={prevQuantity}
            disabled={quantity < 1}
          >
            <span>&#8722;</span>
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center cart-product-quantity" data-test="item-quantity">
          {quantity}
        </div>

        <UpdateCartButton lines={nextLineToUpdate}>
          <button
            className="quantity-selector-btn transition text-primary/50 hover:text-primary"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
          </button>
        </UpdateCartButton>
      </div>
    </>
  );
}

function UpdateCartButton({children, lines}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.UPDATE_CART} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {children}
    </fetcher.Form>
  );
}

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}

const SubscriptionLinesPrice = ({lines, priceType = 'regular', ...passthroughProps}) => {

  const moneyV2 = {amount: lines.reduce((acc, line) => {
    const itemMetafield = JSON.parse(line.merchandise.product.metafields[0].value)
    return acc + parseFloat(itemMetafield.price)
  }, 0).toFixed(2), currencyCode: 'USD'}

  return <Money {...passthroughProps} data={moneyV2} />;
}

const SubscriptionLinesCompareAtPrice = ({lines, priceType = 'regular', ...passthroughProps}) => {

  const moneyV2 = {amount: lines.reduce((acc, line) => {
    const itemMetafield = JSON.parse(line.merchandise.product.metafields[0].value)
    return acc + parseFloat(itemMetafield.compareAtPrice)
  }, 0).toFixed(2), currencyCode: 'USD'}

  return <Money {...passthroughProps} data={moneyV2} />;
}

export function CartEmpty({hidden = false, layout = 'drawer', onClose}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: clsx([
      'content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12',
      y > 0 ? 'border-t' : '',
    ]),
    page: clsx([
      hidden ? '' : 'grid',
      `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
    ]),
  };

  return (
    <div ref={scrollRef} className={`${container[layout]} ${hidden ? '' : 'empty-cart'}`} hidden={hidden}>
      <section className="grid gap-6">
        <Text format>
          Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
          started!
        </Text>
        <div>
          <Link
            to="products/melissani-m1-countertop-ro-system-water-purifier"
          >
            <Button onClick={onClose}>
              Continue shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
