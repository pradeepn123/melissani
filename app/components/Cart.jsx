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
  RequestContext
} from '~/components';
import {getInputStyleClasses} from '~/lib/utils';
import {useFetcher} from '@remix-run/react';
import {CartAction} from '~/lib/type';

export function Cart({layout, onClose, cart}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  return (
    <>
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </>
  );
}

export function CartDetails({layout, cart}) {
  // @todo: get optimistic cart cost
  const isZeroCost = !cart || cart?.cost?.subtotalAmount?.amount === '0.0';

  const container = {
    drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
    page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  return (
    <div className={container[layout]}>
      <CartLines lines={cart?.lines} layout={layout} />
      {!isZeroCost && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartCheckoutActions cost={cart.cost} checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
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
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const bundleIds = Array.from(new Set(currentLines.map(line => {
    const bundleAttr = line.attributes.find((attribute) => attribute.key == "Bundle Id" )
    if (bundleAttr) {
      return bundleAttr.value
    }
  }).filter((bundleId) => bundleId)))

  const filterClubLineItems = bundleIds.map((bundleId) => {
    return currentLines.filter((line) => {
      return line.attributes.find((attribute) => attribute.key == "Bundle Id" && attribute.value == bundleId)
    })
  })

  const oneTimeLineItems = currentLines.filter(line => {
    return !line.attributes.find((attribute) => attribute.key == "Bundle Id" )
  })

  console.log(currentLines)

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page'
      ? 'flex-grow md:translate-y-4'
      : 'overflow-auto transition cart-lines-wrapper',
  ]);

  return (
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      <ul className="grid gap-6 md:gap-10">
        {oneTimeLineItems.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
        {filterClubLineItems.map((lines, index) => (
          <SubsctiptionLineItem key={`subscription-${index}`} lines={lines} />
        ))}
      </ul>
    </section>
  );
}

function CartCheckoutActions({cost, checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a href={checkoutUrl} target="_self">
        <Button variant="primary" as="span" width="full" className="flex items-center justify-center">
          Checkout - {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : ('')}
        </Button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({cost, layout, children = null}) {
  const summary = {
    drawer: 'grid gap-4 cart-summary-footer',
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
  const image = lines[0].merchandise.image
  image.url = "https://cdn.shopify.com/s/files/1/0684/3023/3888/files/Group_6778.png?v=1679600617"

  console.log("open: ", context.openDrawer)

  return <li className="flex gap-6">
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
            Filter Club Membership
          </Heading>

          <div className="grid pb-2">
            <Text className="font-tertiary cart-product-price">
              <SubscriptionLinesPrice lines={lines} as="span" />
            </Text>
          </div>

          <div className="grid pb-2">
            <Text className="font-tertiary">
              Filters ship based on the <strong>Optimum service cycle</strong>
            </Text>
            <Text className="font-tertiary">
              First charge and shipment date is <strong>Thu Aug 2 2023</strong>
            </Text>
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              <div className="icon-wrapper">
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5.5L10 1" stroke="#1B2943" stroke-width="2"/>
                </svg>
              </div>
              <p className="font-tertiary">What's included?</p>
            </div>
            <button className="flex items-center" onClick={context.openDrawer}>
              <div className="icon-wrapper">
                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5.5L10 1" stroke="#1B2943" stroke-width="2"/>
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
    </li>
}

function CartLineItem({line}) {
  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li key={id} className="flex gap-6">
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
            {merchandise?.product?.handle ? (
              <Link to={`/products/${merchandise.product.handle}`} >
                {merchandise?.product?.title || ''}
              </Link>
            ) : (
              <Text>{merchandise?.product?.title || ''}</Text>
            )}
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
            disabled={quantity <= 1}
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
            disabled={quantity <= 1}
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

function SubscriptionLinesPrice({lines, priceType = 'regular', ...passthroughProps}) {

  const moneyV2 = {amount: lines.reduce((acc, line) => {
    return acc + parseFloat(line.merchandise.compareAtPrice.amount)
  }, 0).toFixed(2), currencyCode: 'USD'}

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
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
          <Button onClick={onClose}>
            Continue shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
