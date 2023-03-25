import { Suspense, useEffect, useContext, useState } from 'react';
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
  IconCaret,
  Section,
  Cart,
  CartLoading,
  Link,
  RequestContext,
  AddToCartButton,
  QuantityAdjust,
  ForwardNav
} from '~/components';

import { useCartFetchers } from '~/hooks/useCartFetchers';
import { CartCount } from '~/components/CartCount'
import {useIsHomePath} from '~/lib/utils';

import logo from '../../public/logo.svg';
import account from '../../public/account.svg';

export function Layout({children, layout}) {
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

  const fetchers = useFetchers();
  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  useEffect(() => {
    const isIdeal = fetchers.find((fetcher) => fetcher.state == "idle")
    if (isIdeal && addToCartFetchers.length == 0) {
      closeNoSubscriptionModalOpen()
      closeFilterClubRightModal()
    }
  }, [fetchers.length > 0 && addToCartFetchers.length == 0 && (isNoSubscriptionModalOpen || isFilterClubRightModalOpen)])

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
        setOneTimeProducts: setOneTimeProducts
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
          footerMenu={layout?.footerMenu}
          metafields={layout?.metafields}
        />
        <main
          role="main"
          id="mainContent"
          className="flex-grow"
        >
          {children}
        </main>
      </div>
      <Footer
        menu={layout?.footerMenu}
        metafields={layout?.metafields}
      />
    </RequestContext.Provider>
  );
}

function Header({logo, menu, footerMenu, metafields}) {
  const isHome = useIsHomePath();
  const context = useContext(RequestContext)
  const [root] = useMatches();

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

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

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
        footerMenu={footerMenu}
        isHome={isHome}
        openCart={() => {
          closeMenu()
          openCart()
        }}
        metafields={metafields}
      />}
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
      />
      <FilterClubItemsModal 
        isOpen={context.isFilterClubItemsModalOpen} 
        open={context.openFilterClubItemsModal}
        onClose={context.closeFilterClubItemsModal}
        filterClubItems={context.filterClubItems}
      />
      <NoSubscriptionModal
        isOpen={context.isNoSubscriptionModalOpen}
        open={context.openNoSubscriptionModalOpen}
        onClose={context.closeNoSubscriptionModalOpen}
        oneTimeProducts={context.oneTimeProducts}
        setOneTimeProducts={context.setOneTimeProducts}
      />
    </>
  );
}

function FilterClubRightModal({isOpen, openFilterClubRightModal, closeFilterClubRightModal}) {
  const [root] = useMatches();

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
              console.log(products)
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
                    key: 'Bundle Id',
                    value: bundleId
                  }, {
                    key: 'Bundle Type',
                    value: 'Filter Club'
                  }]
                }
              })
              return <AddToCartButton
                variant='primary'
                className="font-medium"
                lines={subscriptionProducts}
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

const FilterClubBenifitsBottomModal = ({isOpen, open, onClose}) => {
  return <DrawerFromBottom
    open={isOpen}
    onClose={onClose}
    openMenu={open}
    openFrom="right"
    heading="Filter Club"
    subHeading="Membership Benefits"
  >
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="filter-club-membership-benefits-small">
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
    </div>
  </DrawerFromBottom>
}

const FilterClubItemsModal = ({isOpen, open, onClose, filterClubItems}) => {

  return <DrawerFromBottom
    open={isOpen}
    openMenu={open}
    onClose={onClose}
    openFrom="right"
    heading="Filter Club"
    subHeading="What's included"
  >
    <div className="grid grid-cols-1 grid-rows-[1fr_auto]">
      <div className="filter-club-modal-items">
          <ul className='px-4 sm:px-8 md:px-8'>
            {filterClubItems.map((line) => <li
              className="flex gap-8 subscription_filter_club_member drawer"
              key={line.id}
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
                  {` Every ${line.merchandise.product.productType.includes("CR") ? "12" : "6"} months`}
                </span>
              </div>
            </li>)}
          </ul>
      </div>
    </div>
  </DrawerFromBottom>
}

const NoSubscriptionModal = ({isOpen, open, onClose, oneTimeProducts, setOneTimeProducts}) => {
  const [variantLineItems, setVariantLineItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0.0)

  useEffect(() => {
    setVariantLineItems(oneTimeProducts.map(oneTimeProduct => {
      console.log(oneTimeProducts)
      return {
        merchandiseId: oneTimeProduct.variants.nodes[0].id,
        quantity: 0
      }
    }))    
  }, [oneTimeProducts.length > 0])

  const updateQuantity = (handle, quantity) => {
    const updatedOneTimeProducts = oneTimeProducts.map((oneTimeProduct) => {
      if (!oneTimeProduct.quantity) {
        oneTimeProduct.quantity = 0
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
          let oneTimeProductQuantity = oneTimeProduct.quantity || 0
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
      <div className="grid gap-4 p-4">
        <AddToCartButton
          variant='primary'
          className="font-medium"
          lines={variantLineItems}
          disabled={variantLineItems.length == 0}
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
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({isOpen, onClose, menu,footerMenu,metafields,isHome,openCart}) {
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
      <MenuMobileNav menu={menu} onClose={onClose} footerMenu={footerMenu} metafields={metafields} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({ menu, onClose, footerMenu,metafields }) {
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
          { (footerMenu?.items || []).map((item) => (
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
          {footerMetafields.social.map((item, index) => (
            <span key={`footer-social-${index}`} className="social-links mr-4">
              <a href={item.link}>
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
      className="bg-contrast/80 text-primary flex items-center h-nav sticky bg-white z-40 top-0 justify-between w-full leading-none gap-4 py-8 md:py-6 px-4 md:px-8"
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
          to="/pages/melissani-club/"
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
          <img src={account} />
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

function Footer({menu, metafields}) {
  const isHome = useIsHomePath();

  const footerMetafields = JSON.parse(metafields.footer.value)
  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`footer-wrapper w-full bg-white overflow-hidden`}
    >
      <div className={`bg-white flex md:justify-around text-center flex-col md:flex-row px-9 pt-9 pb-2`}>
        <FooterMenu menu={menu} />
      </div>
      <div className="bg-white social-section-wrapper flex items-center justify-center pt-7 pb-4">
        {footerMetafields.social.map((item, index) => (
          <div key={`footer-social-${index}`} className="social-links mr-4">
            <a href={item.link}>
              <img src={item.icon} />
            </a>
          </div>
        ))}
      </div>
      <div
        className={`bg-white pt-3 pb-4 text-center footer-bottom`}
      >
        {footerMetafields.address} 
        <span className="ml-5">&copy; MELISSANI</span>
      </div>
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

function FooterMenu({menu}) {
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