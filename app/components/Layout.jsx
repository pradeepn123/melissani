import { Suspense, useEffect, useContext, useState, useRef } from 'react';
import { useParams, Await, useMatches, useFetchers } from '@remix-run/react';
import { Disclosure } from '@headlessui/react';

import { Image, Money } from '@shopify/hydrogen';

import {
  Drawer,
  useDrawer,
  DrawerFromBottom,
  useDrawerFromBottom,
  Text,
  Button,
  Heading,
  IconMenu,
  Section,
  Cart,
  CartLoading,
  Link,
  RequestContext,
  AddToCartButton,
  QuantityAdjust,
  ForwardNav,
  CartFooter,
  AccountIcon,
  AnnouncementBar,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  LabPFAsReport
} from '~/components';

import { useCartFetchers } from '~/hooks/useCartFetchers';
import { CartCount } from '~/components/CartCount'
import {useIsHomePath} from '~/lib/utils';

import logo from '../../public/logo.svg';
import { NotFound } from './NotFound';
import { useFetcher, useLocation } from '@remix-run/react';

export function Layout({children, layout}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isCartUpdating, setIsCartUpdating] = useState(false)

  const {
    isOpen: isFilterClubRightModalOpen,
    openDrawer: openFilterClubRightModal,
    closeDrawer: closeFilterClubRightModal
  } = useDrawer();

  const {
    isOpen: isFilterClubBenifitsBottomModalOpen,
    openDrawer: openFilterClubBenifitsBottomModal,
    closeDrawer: closeFilterClubBenifitsModal
  } = useDrawer();

  const {
    isOpen: isFilterClubItemsModalOpen,
    openDrawer: openFilterClubItemsModal,
    closeDrawer: closeFilterClubItemsModal,
    items: filterClubItems
  } = useDrawerFromBottom();

  const {
    isOpen: isNoSubscriptionModalOpen,
    openDrawer: openNoSubscriptionModalOpen,
    closeDrawer: closeNoSubscriptionModalOpen,
    items: oneTimeProducts,
    setItems: setOneTimeProducts
  } = useDrawerFromBottom();

  const {
    isOpen: isSubscriptionModalOpen,
    openDrawer: openSubscriptionModalOpen,
    closeDrawer: closeSubscriptionModalOpen,
    items: subscriptionItems
  } = useDrawerFromBottom();

  const fetchers = useFetchers();
  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  useEffect(() => {
    const isIdeal = fetchers.find((fetcher) => fetcher.state == "idle")
    if (isIdeal && addToCartFetchers.length == 0) {
      closeNoSubscriptionModalOpen()
      closeFilterClubRightModal()
      closeSubscriptionModalOpen()
    }
  }, [fetchers.length > 0 && addToCartFetchers.length == 0 && (isNoSubscriptionModalOpen || isFilterClubRightModalOpen || isSubscriptionModalOpen)])

  const parsed_popup_content = layout?.metafields?.popup_content ? JSON.parse(layout?.metafields.popup_content.value) : "";
  const {pathname} = useLocation();
  return (
    <RequestContext.Provider
      value={{
        isFilterClubRightModalOpen: isFilterClubRightModalOpen,
        openFilterClubRightModal: openFilterClubRightModal,
        closeFilterClubRightModal: closeFilterClubRightModal,
        isFilterClubBenifitsBottomModalOpen: isFilterClubBenifitsBottomModalOpen,
        openFilterClubBenifitsBottomModal: openFilterClubBenifitsBottomModal,
        closeFilterClubBenifitsModal: closeFilterClubBenifitsModal,
        isFilterClubItemsModalOpen: isFilterClubItemsModalOpen,
        openFilterClubItemsModal: openFilterClubItemsModal,
        closeFilterClubItemsModal: closeFilterClubItemsModal,
        filterClubItems: filterClubItems,

        isNoSubscriptionModalOpen: isNoSubscriptionModalOpen,
        openNoSubscriptionModalOpen: openNoSubscriptionModalOpen,
        closeNoSubscriptionModalOpen: closeNoSubscriptionModalOpen,
        oneTimeProducts: oneTimeProducts,
        setOneTimeProducts: setOneTimeProducts,
        isSubscriptionModalOpen: isSubscriptionModalOpen,
        openSubscriptionModalOpen: openSubscriptionModalOpen,
        closeSubscriptionModalOpen: closeSubscriptionModalOpen,
        subscriptionItems: subscriptionItems,
        isAddingToCart: isAddingToCart,
        setIsAddingToCart: setIsAddingToCart,
        isCartUpdating: isCartUpdating,
        setIsCartUpdating: setIsCartUpdating
      }}
    >
      <div className="flex flex-col">
        <div className="">
          <a
            href="#mainContent"
            className="sr-only"
          >
            Skip to content
          </a>
        </div>
        <Header
          menu={layout?.headerMenu}
          logo={logo}
          sidebarMenu={layout?.sidebarMenu}
          metafields={layout?.metafields}
        />
        <main
          role="main"
          id="mainContent"
          className="flex-grow page-width"
        >
          {children}
        </main>
      </div>
      {parsed_popup_content != "" && pathname.includes("lab-pfas-report") && <LabPFAsReport data={parsed_popup_content} />}
      <Footer
        footerCustomersMenu={layout?.footerCustomersMenu}
        footerInfoMenu={layout?.footerInfoMenu}
        menu={layout?.footerMenu}
        metafields={layout?.metafields}
      />
    </RequestContext.Provider>
  );
}

function Header({logo, menu, sidebarMenu, metafields}) {
  const isHome = useIsHomePath();
  const context = useContext(RequestContext)
  const [root] = useMatches();
  const announcement = metafields !== undefined ? JSON.parse(metafields?.announcement?.value) : "";

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');
  const updateCartFetcher = useCartFetchers('UPDATE_CART')
  const removeItemCartFetcher = useCartFetchers('REMOVE_FROM_CART')

  useEffect(() => {
    if ((updateCartFetcher.length > 0 || removeItemCartFetcher.length > 0) && !context.isCartUpdating && isCartOpen) {
      context.setIsCartUpdating(true)
    }
    if (isCartOpen && context.isCartUpdating && (updateCartFetcher.length == 0 && removeItemCartFetcher.length == 0)) {
      context.setIsCartUpdating(false)
    }
  }, [isCartOpen, updateCartFetcher, removeItemCartFetcher])

  useEffect(() => {
    if (addToCartFetchers.length > 0 && !context.isAddingToCart) {
      context.setIsAddingToCart(true)
    } else if (addToCartFetchers.length == 0 && context.isAddingToCart) {
      context.setIsAddingToCart(false)
      if (!isCartOpen) {
        openCart();
      }
    }
  }, [addToCartFetchers, context.isAddingToCart])

  return (
    <>
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={closeCart}
        isHome={isHome}
        openCart={openCart}
      />
      {menu && <MenuDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menu={menu}
        // footerMenu={footerMenu}
        sidebarMenu={sidebarMenu}
        isHome={isHome}
        openCart={() => {
          closeMenu()
          openCart()
        }}
        metafields={metafields}
      />}
      {announcement !== "" && <AnnouncementBar announcementbar={announcement} height="full" id="header_announcement" animation={false}/>}
      <MobileHeader
        isHome={isHome}
        logo={logo}
        openCart={() => {
          closeMenu()
          openCart()
        }}
        openMenu={() => {
          closeCart()
          openMenu()
        }}
      />
      <FilterClubRightModal 
        isOpen={context.isFilterClubRightModalOpen} 
        openFilterClubRightModal={context.openFilterClubRightModal}
        closeFilterClubRightModal={context.closeFilterClubRightModal}
      />
      <FilterClubBenifitsBottomModal 
        isOpen={context.isFilterClubBenifitsBottomModalOpen} 
        open={context.openFilterClubBenifitsBottomModal}
        onClose={context.closeFilterClubBenifitsModal}
        isCartOpen={isCartOpen}
      />
      <FilterClubItemsModal 
        isOpen={context.isFilterClubItemsModalOpen} 
        open={context.openFilterClubItemsModal}
        onClose={context.closeFilterClubItemsModal}
        filterClubItems={context.filterClubItems}
        isCartOpen={isCartOpen}
      />
      <NoSubscriptionModal
        isOpen={context.isNoSubscriptionModalOpen}
        open={context.openNoSubscriptionModalOpen}
        onClose={context.closeNoSubscriptionModalOpen}
        oneTimeProducts={context.oneTimeProducts}
        setOneTimeProducts={context.setOneTimeProducts}
      />
      <FilterClubSubscriptionModal
        isOpen={context.isSubscriptionModalOpen}
        open={context.openSubscriptionModalOpen}
        onClose={context.closeSubscriptionModalOpen}
        items={context.subscriptionItems}
      />
    </>
  );
}

function FilterClubRightModal({isOpen, openFilterClubRightModal, closeFilterClubRightModal}) {
  const [root] = useMatches();
  const context = useContext(RequestContext)

  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');
  const handleAddToCartClick = () => setIsAddingToCart(true)
  useEffect(() => {
    if (addToCartFetchers.length == 0) {
      setIsAddingToCart(false)
    }
  }, [isAddingToCart == true && context.isAddingToCart])

  return <Drawer
    open={isOpen}
    onClose={closeFilterClubRightModal}
    isHome={false}
    openMenu={openFilterClubRightModal}
    openFrom="right"
    heading="Filter Club Membership"
    isFilterClubModal={true}
  >
    <div className="grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]">
      <div className="filter-club-membership-benefits">
          <ul className='px-4 sm:px-8 md:px-8'>
            <li>10% Discount on filters</li>
            <li>1 year extended warranty</li>
            <li>Free Shipping</li>
            <li>Automated delivery</li>
            <li>Contact us to customise</li>
            <li>Lifetime phone support</li>
            <li>Pay on shipment</li>
          </ul>
      </div>
      <section aria-labelledby="summary-heading" className="grid gap-4 cart-summary-footer">
        <dl className="grid">
          <Await resolve={root.data?.products}>
            {(products) => {
              const subscriptionProduct = products.nodes.find((product) => product.handle == "melissani-m1-filter")
              const parsesMetafield = JSON.parse(subscriptionProduct.metafields[0].value)
              const bundleId = new Date().getTime().toString()
              const subscriptionProducts = parsesMetafield.linkedProducts.subscription.map((productHandle) => {
                const item = products.nodes.find((product) => product.handle == productHandle)
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
              return <AddToCartButton
                variant='primary'
                className="font-medium"
                lines={subscriptionProducts}
                onClick={handleAddToCartClick}
                isAddingToCart={isAddingToCart}
              >
                Subscribe
              </AddToCartButton>
            }}
          </Await>
        </dl>
      </section>
    </div>
  </Drawer>
}

const FilterClubBenifitsBottomModal = ({isOpen, open, onClose, isCartOpen}) => {
  return <DrawerFromBottom
    open={isOpen}
    onClose={onClose}
    openMenu={open}
    isCartOpen={isCartOpen}
    openFrom="right"
    heading="Filter Club"
    subHeading="Membership Benefits"
  >
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="filter-club-membership-benefits-small">
          <ul className='px-4 sm:px-8 md:px-8'>
            <li>10% Discount</li>
            <li>1 year extended warranty</li>
            <li>Free Shipping</li>
            <li>Automated delivery</li>
            <li>Contact us to customise</li>
            <li>Lifetime phone support</li>
            <li>Pay on shipment</li>
          </ul>
      </div>
    </div>
  </DrawerFromBottom>
}

const FilterClubItemsModal = ({isOpen, open, onClose, filterClubItems, isCartOpen}) => {

  return <DrawerFromBottom
    open={isOpen}
    openMenu={open}
    onClose={onClose}
    isCartOpen={isCartOpen}
    openFrom="right"
    heading="Filter Club"
    subHeading="What's included"
  >
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="filter-club-modal-items">
          <ul className='px-4 sm:px-8 md:px-8'>
            {filterClubItems.map((line) => <li
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
                {line.quantity} X {line.merchandise.product.productType} / <span>
                  {` Every ${line.merchandise.product.productType.includes("RO") ? "12" : "6"} months`}
                </span>
              </div>
            </li>)}
          </ul>
      </div>
    </div>
  </DrawerFromBottom>
}


const FilterClubSubscriptionModal = ({isOpen, open, onClose, items}) => {
  const context = useContext(RequestContext)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  var filterClubPrice = 0
  const bundleId = new Date().getTime().toString()
  const lineItems = items.map((item) => {
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

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');
  const handleAddToCartClick = () => setIsAddingToCart(true)
  useEffect(() => {
    if (addToCartFetchers.length == 0) {
      setIsAddingToCart(false)
    }
  }, [isAddingToCart == true && context.isAddingToCart])

  return <DrawerFromBottom
    open={isOpen}
    openMenu={open}
    onClose={onClose}
    openFrom="right"
    heading="Filter Club"
    isSubscriptionProduct={true}
  >
    <div className="grid">
      <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
        <div className="filter-club-subscription-modal-content">
          <div className="product-price font-tertiary">
            <Money
              withoutTrailingZeros
              data={{amount: filterClubPrice.toFixed(2), currencyCode: 'USD'}}
              as="span"
            />
          </div>
          <div className="grid gap-4 pt-3 pb-4">
            <div className="font-tertiary product-description">
              Get fresh filters delivered to your door, when you need them. Save 10% on filters every-time time it ships!
            </div>
          </div>
          <hr />
          <div className="grid gap-4 pt-3 pb-4">
            <div className="additional-information">
              <Heading as="h5" className="whitespace-normal product-information">
                Includes:
                </Heading>
                <p className="font-tertiary include-benifits">PAC & CF Filter <span>/ Every 6 months</span></p>
                <p className="font-tertiary include-benifits">RO Filter <span>/ Every 12 months</span></p>
                <p
                  className="font-tertiary include-benifits filter_club_benefits"
                  onClick={context.openFilterClubBenifitsBottomModal}
                >
                  Filter club benefits
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="8.48283" stroke="#1B2943" strokeWidth="1.03433"/>
                    <path d="M8.06951 10.4734L8.07071 10.5584H8.15569H9.14007H9.22626V10.4722V10.2261C9.22626 10.0929 9.24488 9.98097 9.27973 9.88844C9.3164 9.79845 9.37978 9.71008 9.47367 9.62391C9.57221 9.53611 9.7122 9.43919 9.8959 9.33342L9.89591 9.33343L9.8974 9.33254C10.0952 9.21329 10.264 9.08143 10.403 8.93652L10.4036 8.93589C10.5438 8.78678 10.6502 8.61915 10.7223 8.43331C10.7975 8.24653 10.8344 8.0404 10.8344 7.8161V7.80762C10.8344 7.48071 10.7494 7.18794 10.5779 6.93223C10.4071 6.67745 10.1681 6.47965 9.8643 6.338C9.56204 6.19289 9.21093 6.12181 8.81336 6.12181C8.38484 6.12181 8.01563 6.1985 7.70922 6.35609C7.4046 6.50994 7.16854 6.72441 7.00399 6.99965L7.00399 6.99965L7.00364 7.00025C6.84308 7.27379 6.75621 7.58336 6.74152 7.92698L6.74144 7.92698V7.93066V7.93915V8.02571L6.82801 8.02534L7.82087 8.0211L7.84102 8.02101L7.85905 8.012L7.86753 8.00776L7.9126 7.98522L7.91507 7.9349C7.92295 7.77474 7.96335 7.6395 8.0337 7.52644L8.0337 7.52645L8.03414 7.52572C8.10513 7.4091 8.2009 7.31959 8.3228 7.2561C8.44441 7.19276 8.58733 7.15977 8.75396 7.15977C8.92423 7.15977 9.06724 7.19167 9.18573 7.25218L9.18573 7.25218L9.18638 7.25251C9.30966 7.31415 9.40183 7.39599 9.46612 7.49737L9.46611 7.49737L9.46664 7.49818C9.53011 7.59582 9.56303 7.71064 9.56303 7.8458V7.85429C9.56303 7.9836 9.54192 8.09318 9.50223 8.18498L9.50221 8.18497L9.50146 8.1868C9.46504 8.27664 9.40047 8.36523 9.30333 8.45187L9.30333 8.45186L9.30246 8.45266C9.2062 8.5409 9.07269 8.63801 8.90009 8.74381C8.70288 8.86275 8.53817 8.99029 8.40739 9.12701L8.40736 9.12704C8.27706 9.2634 8.18379 9.41897 8.12873 9.59321C8.07407 9.76335 8.05375 9.95747 8.06529 10.1739L8.06951 10.4734ZM9.26677 12.3724L9.26677 12.3725L9.26751 12.3718C9.41452 12.2313 9.48509 12.0447 9.48509 11.8215C9.48509 11.5985 9.41463 11.413 9.26714 11.2751C9.12047 11.1352 8.92634 11.0691 8.69455 11.0691C8.46501 11.0691 8.27139 11.1355 8.12234 11.2748C7.97459 11.4127 7.90402 11.5984 7.90402 11.8215C7.90402 12.0447 7.97459 12.2313 8.1216 12.3718L8.12159 12.3718L8.12303 12.3731C8.27215 12.5092 8.46553 12.5738 8.69455 12.5738C8.92599 12.5738 9.11998 12.5095 9.26677 12.3724Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.172389"/>
                  </svg>
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 p-4">
          <AddToCartButton
            variant='primary'
            className="font-medium"
            lines={lineItems}
            onClick={handleAddToCartClick}
            isAddingToCart={isAddingToCart}
          >
            <Money
              withoutTrailingZeros
              data={{amount: filterClubPrice.toFixed(2), currencyCode: 'USD'}}
              as="span"
            />
            {` - Add to cart`}
          </AddToCartButton>
        </div>
      </div>
    </div>
  </DrawerFromBottom>
}

const NoSubscriptionModal = ({isOpen, open, onClose, oneTimeProducts, setOneTimeProducts}) => {
  const context = useContext(RequestContext)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const [variantLineItems, setVariantLineItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0.0)

  useEffect(() => {
    setVariantLineItems(oneTimeProducts.map(oneTimeProduct => {
      return {
        merchandiseId: oneTimeProduct.variants.nodes[0].id,
        quantity: 1
      }
    }))

    setTotalPrice(oneTimeProducts.reduce((acc, lineProduct) => {
      const firstVariant = lineProduct.variants.nodes[0];
      return acc + parseFloat(firstVariant.price?.amount) * (lineProduct.quantity == undefined ? 1 : lineProduct.quantity)
    }, 0))

  }, [oneTimeProducts.length > 0 && isOpen])

  const updateQuantity = (handle, quantity) => {
    const updatedOneTimeProducts = oneTimeProducts.map((oneTimeProduct) => {
      if (oneTimeProduct.quantity == undefined) {
        oneTimeProduct.quantity = 1
      }

      if (handle == oneTimeProduct.handle) {
        oneTimeProduct.quantity = quantity
      }

      return oneTimeProduct
    })

    setTotalPrice(updatedOneTimeProducts.reduce((acc, lineProduct) => {
      const firstVariant = lineProduct.variants.nodes[0];
      return acc + parseFloat(firstVariant.price?.amount) * lineProduct.quantity
    }, 0))

    setOneTimeProducts(updatedOneTimeProducts)
    setVariantLineItems(updatedOneTimeProducts.map((oneTimeProduct) => {
      return {
        merchandiseId: oneTimeProduct.variants.nodes[0].id,
        quantity: oneTimeProduct.quantity
      }
    }).filter((productVariant) => productVariant.quantity > 0))
  }

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');
  const handleAddToCartClick = () => setIsAddingToCart(true)
  useEffect(() => {
    if (addToCartFetchers.length == 0) {
      setIsAddingToCart(false)
    }
  }, [isAddingToCart == true && context.isAddingToCart])

  return <DrawerFromBottom
    open={isOpen}
    openMenu={open}
    onClose={onClose}
    openFrom="right"
    heading="One-Time Purchase"
  >
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="content one-time-products-wrapper">
        {oneTimeProducts.map((oneTimeProduct) => {
          let featuredImage = oneTimeProduct.media.nodes[0]?.image
          let oneTimeProductQuantity = oneTimeProduct.quantity == undefined ? 1 : oneTimeProduct.quantity
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
                    width: 128
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
                quantity={oneTimeProductQuantity}
                setQuantity={quantity => updateQuantity(oneTimeProduct.handle, quantity)}
                minDisabled={oneTimeProduct.quantity < 1}
              />
            </div>
          </div>
        </div>})}
      </div>
      <div className="grid gap-4 px-4 pt-4 pb-8">
        <AddToCartButton
          variant='primary'
          className="font-medium"
          lines={variantLineItems}
          disabled={variantLineItems.length == 0}
          isAddingToCart={isAddingToCart}
          onClick={handleAddToCartClick}
        >
          <Money
            withoutTrailingZeros
            data={{
              amount: totalPrice.toFixed(2),
              currencyCode: 'USD'
            }}
            as="span"
          /> - {` Add to Cart`}
        </AddToCartButton>
      </div>
    </div>
  </DrawerFromBottom>
}

function CartDrawer({isOpen, isHome, onClose, openCart }) {
  const [root] = useMatches();

  return (
    <Drawer
      isCartDrawer={isOpen}
      open={isOpen}
      onClose={onClose}
      isHome={isHome}
      openCart={openCart}
      heading="Cart"
      openFrom="right"
    >
      <div className="grid cart-body-content">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
      <Await resolve={root.data?.cart}>
        {(cart) => <CartFooter layout="drawer" cart={cart} />}
      </Await>
    </Drawer>
  );
}

export function MenuDrawer({isOpen, onClose, menu, sidebarMenu, metafields, isHome,openCart}) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      isHome={isHome}
      openCart={openCart}
      openFrom="right"
      heading="Menu"
    >
    <div className="menu-drawer-container">
      <MenuMobileNav menu={menu} onClose={onClose} sidebarMenu={sidebarMenu} metafields={metafields} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({ menu, onClose, sidebarMenu,metafields }) {
  const footerMetafields = JSON.parse(metafields.footer.value)
  return (
    <>
    <nav className="flex flex-col justify-between custom_nav_height gap-4 p-6 sm:gap-6 sm:px-12 pt-5">
      <div className="menu_nav_items">
        <div className="mb-8">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <span key={item.id} className="block menu-span mb-4">
              <Link
                to={item.to}
                target={item.target}
                onClick={onClose}
              >
                <Text as="span" size="copy" className='menuDrawer-Headermenu text-black md:text-4xl md:font-medium font-tertiary'>
                  {item.title}
                  <span className='forward-nav-icon'><ForwardNav /></span>
                </Text>
              </Link>
            </span>
          ))}
        </div>

        {/* Bottom level menu items */}
        <div className="pt-6">
          { (sidebarMenu?.items || []).map((item) => (
              <span key={item.id} className="block secondary_menu_drawer">
                <Link
                  to={item.to}
                  target={item.target}
                  onClick={onClose}
                >
                  <Text as="span" size="copy" className='menuDrawer-Foootermenu text-black md:font-normal font-tertiary'>
                    {item.title}
                  </Text>
                </Link>
              </span>
            ))
          }
        </div>
      </div>
      <div className="menu_nav_items_social_media">
        {/* Social Media Links  */}
        <div className="footer-social-media">
          {footerMetafields.social_media.map((item, index) => (
            <span key={`footer-social-${index}`} className="social-links mr-6">
              <a href={item.link} target="_blank">
                <img className='inline-block' src={item.icon} />
              </a>
            </span>
          ))}
        </div>
      </div>

    </nav>
    </>
  );
}

function MobileHeader({logo, isHome, openCart, openMenu}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();
  return (
    <header
      role="banner"
      className="bg-contrast/80 text-primary main_header sticky top-0 z-40 flex items-center h-nav bg-white justify-between w-full leading-none gap-4 py-0 md:py-0 px-4 md:px-8"
    >
      <Link
        className="flex items-center leading-[3rem] md:leading-[4rem]"
        to="/"
      >
        <img src={logo} />
      </Link>
      <div className="flex items-center justify-end w-full gap-5">
        <Link
          to="products/melissani-m1-countertop-ro-system-water-purifier"
          className="hidden lg:block"
        >
          <Button
            variant='primary'
            className='font-medium'
          >
            Shop Now
          </Button>
        </Link>
        <Link
          to="/pages/filter-club/"
          className="hidden lg:block"
        >
          <Button
            variant="secondary"
            className='font-medium'
          >
            Filter Club
          </Button>
        </Link>
        <Link
          to="/account"
          className="relative hidden items-center justify-center w-8 h-8 lg:flex"
        >
          <AccountIcon />
        </Link>
        <CartCount
          isHome={isHome}
          openCart={openCart}
        />
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu stroke="#1376BC" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

function Footer({footerCustomersMenu, footerInfoMenu, metafields}) {
  const fetcher = useFetcher();
  const {pathname} = useLocation();
  const isHome = useIsHomePath();
  const footerMetafields = metafields !== undefined ? JSON.parse(metafields.footer.value) : "";
  const footerContactMetafields = metafields !== undefined ? JSON.parse(metafields.footer_contact.value) : "";
  const heading = `Oops!`;
  const subHeading = `Something went wrong`;
  const description = `Please refresh the page and try again`;
  const buttonText = `Refresh`;

  const accordionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCustomersMenuAccordion, setActiveCustomersMenuAccordion] = useState(true);
  const [activeInfoMenuAccordion, setActiveInfoMenuAccordion] = useState(true);
  const [activeContactMenuAccordion, setActiveContactMenuAccordion] = useState(true);

  const [path, setPath] = useState('');

  const handleResize = () => {
    if (window?.outerWidth < 1024) {
        setIsMobile(true);
        setActiveCustomersMenuAccordion(false);
        setActiveInfoMenuAccordion(false);
        setActiveContactMenuAccordion(false);
    } else {
        setIsMobile(false);
        setActiveCustomersMenuAccordion(true);
        setActiveInfoMenuAccordion(true);
        setActiveContactMenuAccordion(true);
    }

  }

  useEffect(() => {
    window?.addEventListener("resize", handleResize)
    setPath(window?.location.href);
    if (window?.outerWidth < 1024) {
      setIsMobile(true);
      setActiveCustomersMenuAccordion(false);
      setActiveInfoMenuAccordion(false);
      setActiveContactMenuAccordion(false);
    } else {
      setIsMobile(false);
      setActiveCustomersMenuAccordion(true);
      setActiveInfoMenuAccordion(true);
      setActiveContactMenuAccordion(true);
    }
  }, []);
  
  function activateAccordion(e) {
    if (isMobile) {
      let menuID = e.currentTarget.id;
      switch(menuID) {
        case "customers-menu":
          setActiveCustomersMenuAccordion(!activeCustomersMenuAccordion);
          setActiveInfoMenuAccordion(false);
          setActiveContactMenuAccordion(false);
          break;
        case "information-menu":
          setActiveInfoMenuAccordion(!activeInfoMenuAccordion);
          setActiveCustomersMenuAccordion(false);
          setActiveContactMenuAccordion(false);
          break;
        case "contact-menu":
          setActiveContactMenuAccordion(!activeContactMenuAccordion);
          setActiveInfoMenuAccordion(false);
          setActiveCustomersMenuAccordion(false);
          break;
      }
    } else  {
      return;
    }
  }

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`footer-wrapper w-full bg-white overflow-hidden`}
    >
      <div className="grid footer-menus">
      {metafields !== "" && footerMetafields &&
        <div className="mobile-social-section-wrapper">
          <div className="flex items-center justify-center">
            {footerMetafields?.social_media.map((item, index) => (
              <div key={`footer-social-${index}`} className="social-links mr-6">
                <a href={item.link} target="_blank">
                  <img src={item.icon} />
                </a>
              </div>
            ))}
          </div>
        </div>}
        {metafields !== "" && footerContactMetafields && footerContactMetafields.email_subscription.map((item, index) =>
          (<div className="subscription-form" key={index} id="subscription-form">
              <h3 className="footer-title mb-3.5">
                {item.title}
              </h3>
              {item && item.email_input.map((email_item, email_index) => (
                <fetcher.Form action="/opt-in" method="post" id="optin-form" className="form flex" key={email_index} reloadDocument>
                  <input type={email_item.field_type} id={email_item.id} name="customerOptin" placeholder={email_item.placeholder}
                    className="mr-2 p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md field-input font-tertiary" />
                  <input type="hidden" name="loc" value={pathname} />
                  <Button variant='primary' className="email-subscription-btn" type="submit">Subscribe</Button>
                </fetcher.Form>
              ))}
              {path?.includes('?subscribed=true') && 
              <p id="email-success">
                <CheckIcon />
                <p className="footer-subscription-success-text">Your email has been registered successfully</p>
              </p>
              }
              <p className="footer-subscription-info mt-2.5">{item.subscription_info}</p>
          </div>)
        )}
        {metafields !== "" && footerCustomersMenu &&
          (<div className="customers-menu footer-menu-item">
              <div className="footer-accordion-title"  onClick={activateAccordion} id="customers-menu" ref={accordionRef} >
                <h3 className="footer-title">{footerCustomersMenu?.title}</h3>
                {activeCustomersMenuAccordion ? <MinusIcon /> : <PlusIcon />}
              </div>
              {activeCustomersMenuAccordion && (footerCustomersMenu?.items || []).map((item) => (
                <p key={item.id} className="block menu-span mb-5">
                  <Link
                    to={item.to}
                    target={item.target}>
                      <p className="footer-list-item">
                      {item.title}
                      </p>
                  </Link>
                </p>
              ))}
        </div>)}
        {metafields !== "" && footerInfoMenu &&
          (<div className="information-menu footer-menu-item">
            <div className="footer-accordion-title"  onClick={activateAccordion} id="information-menu" ref={accordionRef} >
              <h3 className="footer-title">{footerInfoMenu?.title}</h3>
              {activeInfoMenuAccordion ? <MinusIcon /> : <PlusIcon />}
            </div>
            {activeInfoMenuAccordion && (footerInfoMenu?.items || []).map((item) => (
              <p key={item.id} className="block menu-span mb-5">
                <Link
                  to={item.to}
                  target={item.target}>
                    <p className="footer-list-item">
                    {item.title}
                    </p>
                </Link>
              </p>
            ))}
        </div>)}  
        {metafields !== "" && footerContactMetafields &&
          (<div className="contact-menu footer-menu-item">
            <div className="footer-accordion-title"  onClick={activateAccordion} id="contact-menu" ref={accordionRef} >
              <h3 className="footer-title">{footerContactMetafields?.contact_title}</h3>
              {activeContactMenuAccordion ? <MinusIcon /> : <PlusIcon />}
            </div>
            {activeContactMenuAccordion && (footerContactMetafields?.contact || []).map((listItem, listKey) => (
              <p key={listKey} className="block menu-span mb-5">
                <Link
                    to={listItem.link} target="_blank">

                    <p className="footer-list-item mb-5">
                      {listItem.iconText}
                    </p>
                    </Link>
                </p>
              ))}
          </div>)}
      </div>
    {metafields !== "" && footerMetafields ?
      <>
        <p className="footer-social-text">{footerMetafields?.social_text}</p>
        <div className="copy-wrapper flex pt-3.5 pb-4">
          <div className="copyright-content-wrapper">
            {footerMetafields.copyright_text.map((item, index) => (
              <div className="copyright-content flex" key={index}>
                <p><span className="copy-symbol">&copy;</span>{item.brand_name}</p>
                <span className="copyright-location flex">
                  <img src={item.location_flag_icon} />
                  <p>{item.location}</p>
                </span>
              </div>
            ))}
          </div>
          <div className="social-section-wrapper flex items-center justify-center">
            {footerMetafields.social_media.map((item, index) => (
              <div key={`footer-social-${index}`} className="social-links mr-6">
                <a href={item.link} target="_blank">
                  <img src={item.icon} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </> 
      :
      <>
        <NotFound heading={heading} subHeading={subHeading} description={description} buttonText={buttonText} id="error_found_section" />
      </>
      }
    </Section>
  );
}

const FooterLink = ({item}) => {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} className="footer-menu" target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
};

function FooterMenu({menu, metafields}) {
  const styles = {
    section: 'justify-center py-4 lg:py-2 lg:pt-0',
    nav: 'pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <FooterLink item={item} />
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}