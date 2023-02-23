import {useIsHomePath} from '~/lib/utils';
import {
  Drawer,
  useDrawer,
  Text,
  Button,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  Cart,
  CartLoading,
  Link,
} from '~/components';
import {useParams, Await, useMatches} from '@remix-run/react';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import logo from '../../public/logo.svg';
import account from '../../public/account.svg';
import cart from '../../public/cart.svg';

export function Layout({children, layout}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
          menu={layout?.headerMenu}
          logo={logo}
        />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer menu={layout?.footerMenu} metafields={layout?.metafields} />
    </>
  );
}

function Header({logo, menu}) {
  const isHome = useIsHomePath();

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
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <MobileHeader
        isHome={isHome}
        logo={logo}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
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

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="right" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      <span className="block">
        <Link
          to={"/"}
          onClick={onClose}
          className={({isActive}) =>
            isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
          }
        >
          <Link to="/products/" className="">
            <Button className="inline-block rounded font-medium text-center py-3 px-8 border md:none
            border-transparent bg-primary hover:bg-white hover:border-primary text-contrast hover:text-primary w-auto"> SHOP NOW </Button>
          </Link>
        </Link>
      </span>
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({isActive}) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        </span>
      ))}
      
    </nav>
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

        <Link to="/products/" className="hidden lg:block">
          <Button className="inline-block rounded font-medium text-center py-5 px-8 border 
          border-transparent bg-primary hover:bg-white hover:border-primary text-contrast hover:text-primary w-auto"> SHOP NOW </Button>
        </Link>

        <Link to="/pages/melissani-club/" className="hidden lg:block">
          <Button variant="secondary" className="inline-block rounded font-medium text-center py-5 px-8 border 
          border-primary bg-contrast text-primary hover:bg-primary hover:border-primary hover:text-contrast w-auto"> FILTER CLUB </Button>
        </Link>

        <CartCount isHome={isHome} openCart={openCart} />

        <Link to="/account" className="relative hidden items-center justify-center w-8 h-8 lg:flex">
          <img src={account} />
        </Link>

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

function CartCount({isHome, openCart}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, dark, count}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <img src={cart} />
        <div
          className={'text-contrast bg-primary absolute -top-1.5 -right-1 text-[0.625rem] font-medium subpixel-antialiased min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-4 h-4 px-[0.175rem] pb-px'}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 ml-4"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 ml-4"
    >
      {BadgeCounter}
    </Link>
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
      <div className="footer-image-section w-full pt-8 px-6 lg:pt-16 md:px-8 lg:px-12 md:flex">
        <div className="footer-text flex item-center flex-col md:w-6/12">
          <p>
            {footerMetafields.heading}
            <span className='leading-tight'>{footerMetafields.subHeading}</span>
          </p>
          <div className="footer-contact-wrapper flex mt-7">
            {footerMetafields.contact.map((item, index) => (
              <div key={`footer-${index}`} className="footer-contact-icons mr-7">
                <a href={item.link}>
                  <img src={item.icon} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-image md:w-6/12">
          <img src={footerMetafields.image} />
        </div>
      </div>
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