import {useIsHomePath} from '~/lib/utils';
import {
  Drawer,
  useDrawer,
  DrawerFromBottom,
  Text,
  Button,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  Cart,
  CartLoading,
  Link,
  RequestContext
} from '~/components';
import { useParams, Await, useMatches } from '@remix-run/react';
import { Disclosure } from '@headlessui/react';
import { Suspense, useEffect, useContext } from 'react';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import { ForwardNav } from '~/components';
import {CartCount} from '~/components/CartCount'

import logo from '../../public/logo.svg';
import account from '../../public/account.svg';

export function Layout({children, layout}) {
  const {
    isOpen: isFilterClubRightModalOpen,
    openDrawer: openFilterClubRightModal,
    closeDrawer: closeFilterClubRightModal
  } = useDrawer();

  const {
    isOpen: isFilterClubBottomModalOpen,
    openDrawer: openFilterClubBottomModal,
    closeDrawer: closeFilterClubBottomModal
  } = useDrawer();

  return (
    <RequestContext.Provider
      value={{
        isFilterClubRightModalOpen: isFilterClubRightModalOpen,
        openFilterClubRightModal: openFilterClubRightModal,
        closeFilterClubRightModal: closeFilterClubRightModal,
        isFilterClubBottomModalOpen: isFilterClubBottomModalOpen,
        openFilterClubBottomModal: openFilterClubBottomModal,
        closeFilterClubBottomModal: closeFilterClubBottomModal
      }}
    >
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
          menu={layout?.headerMenu}
          logo={logo}
          footerMenu={layout?.footerMenu}
          metafields={layout?.metafields}
        />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer menu={layout?.footerMenu} metafields={layout?.metafields} />
    </RequestContext.Provider>
  );
}

function Header({logo, menu,footerMenu,metafields}) {
  const isHome = useIsHomePath();
  const context = useContext(RequestContext)

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
      <FilterClubBottomModal 
        isOpen={context.isFilterClubBottomModalOpen} 
        openFilterClubaBottomModal={context.openFilterClubBottomModal}
        closeFilterClubBottomModal={context.closeFilterClubBottomModal}
      />
    </>
  );
}

function FilterClubRightModal({isOpen, openFilterClubRightModal, closeFilterClubRightModal}) {
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
          <Button variant='primary' className="font-medium">
            Subscribe
          </Button>
        </dl>
      </section>
    </div>
  </Drawer>
}

function FilterClubBottomModal({isOpen, openFilterClubBottomModal, closeFilterClubBottomModal}) {
  return <DrawerFromBottom
    open={isOpen}
    onClose={closeFilterClubBottomModal}
    isHome={false}
    openMenu={openFilterClubBottomModal}
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
          <Button variant='primary' className="font-medium">
            Subscribe
          </Button>
        </dl>
      </section>
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
      className={'bg-contrast/80 text-primary flex items-center h-nav sticky bg-white z-40 top-0 justify-between w-full leading-none gap-4 py-8 md:py-6 px-4 md:px-8'}
    >
      <Link
        className="flex items-center leading-[3rem] md:leading-[4rem]"
        to="/"
      >
        <img src={logo} />
      </Link>

      <div className="flex items-center justify-end w-full gap-5">

        <Link to="products/melissani-m1-countertop-ro-system-water-purifier" className="hidden lg:block">
          <Button variant='primary' className='font-medium'> Shop Now</Button>
        </Link>

        <Link to="/pages/melissani-club/" className="hidden lg:block">
          <Button variant="secondary" className='font-medium'> Filter Club </Button>
        </Link>

        <Link to="/account" className="relative hidden items-center justify-center w-8 h-8 lg:flex">
          <img src={account} />
        </Link>

        <CartCount isHome={isHome} openCart={openCart} />

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