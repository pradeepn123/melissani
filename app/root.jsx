import {defer} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
  useMatches,
} from '@remix-run/react';
import { ShopifySalesChannel, Seo } from '@shopify/hydrogen';
import {Layout} from '~/components';
import {GenericError} from './components/GenericError';
import {NotFound} from './components/NotFound';

import styles from './styles/app.css';
import customStyles from './styles/main.css';
import customFonts from './styles/custom-font.css';
import cartClubMembershipStyles from './components/CartClubMembership/CartClubMembership.css'
import favicon from '../public/favicon.png';

import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
import invariant from 'tiny-invariant';
import {useAnalytics} from './hooks/useAnalytics';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';

const seo = ({data, pathname}) => {
  return {
  title: data?.layout?.shop?.name,
  titleTemplate: '%s',
  description: data?.layout?.shop?.description,
  handle: '@shopify',
  url: `https://melissaniwater.com${pathname}`,
}};

export const handle = {
  seo,
};

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: customStyles},
    {rel: 'stylesheet', href: customFonts},
    {rel: 'stylesheet', href: cartClubMembershipStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  "oke:subscriber_id": "a0ca6b07-0ad6-4495-9f6b-5a1ac98d0fe6"
});

export async function loader({context}) {
  const [cartId, layout] = await Promise.all([
    context.session.get('cartId'),
    getLayoutData(context),
  ]);

  return defer({
    layout,
    selectedLocale: context.storefront.i18n,
    cart: cartId ? getCart(context, cartId) : undefined,
    analytics: {
      shopifySalesChannel: ShopifySalesChannel.hydrogen,
      shopId: layout.shop.id,
    },
    products: getProducts(context)
  });
}

export default function App() {
  const data = useLoaderData();
  const locale = data.selectedLocale ?? DEFAULT_LOCALE;
  const hasUserConsent = true;
  const {pathname} = useLocation()

  useAnalytics(hasUserConsent, locale);

  return (
    <html lang={locale.language} className="scroll-auto md:scroll-smooth">
      <head>
        <Seo />
        <Meta />
        <Links />
        {/* <script id="gorgias-chat-widget-install-v2" src="https://config.gorgias.chat/gorgias-chat-bundle-loader.js?applicationId=28865"></script> */}
        <script async src="https://d3hw6dc1ow8pp2.cloudfront.net/reviews-widget-plus/js/okendo-reviews.js"></script>
        <script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Wp4Lww"></script>
        <script>!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','oenmr');</script>
      </head>
      <body>
        <Layout
          layout={data.layout}
          key={`${locale.language}-${locale.country}`}
        >
          <Outlet key={pathname}/>
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export function CatchBoundary() {
  const [root] = useMatches();
  const caught = useCatch();
  const isNotFound = caught.status === 404;
  const locale = root.data?.selectedLocale ?? DEFAULT_LOCALE;
  const heading = `404`;
  const description = `The page may have been removed, had its name changed, or is temporarily unavailable.`;
  const subHeading = `Oops! We couldn't find the page you were looking for.`
  const buttonText = `Back to home`;
  return (
    <html lang={locale.language}>
      <head>
        <title>{isNotFound ? 'Not found' : 'Error'}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout
          layout={root?.data?.layout}
          key={`${locale.language}-${locale.country}`}
        >
          {isNotFound ? (
            <NotFound type={caught.data?.pageType} heading={heading} subHeading={subHeading} description={description} notFound={isNotFound} buttonText={buttonText}/>
          ) : (
            <GenericError
              error={{message: `${caught.status} ${caught.data}`}}
            />
          )}
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}) {
  const [root] = useMatches();
  const locale = root?.data?.selectedLocale ?? DEFAULT_LOCALE;

  return (
    <html lang={locale.language}>
      <head>
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout layout={root?.data?.layout}>
          <GenericError error={error} />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layoutMenus(
    $language: LanguageCode
    $headerMenuHandle: String!
    $sidebarMenuHandle: String!
    $footerMenuHandle: String!
    $handle: String!
  ) @inContext(language: $language) {
    shop {
      id
      name
      description
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
    sidebarMenu: menu(handle: $sidebarMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
    metafields: page(handle: $handle) {
      ...PageContent
    }
  }
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment PageContent on Page {
    footer: metafield(namespace: "footer", key: "footer_jsonfields") {
      value
    }
    announcement: metafield(namespace: "global", key: "announcement") {
      value
    }
  }
`;

async function getLayoutData({storefront}) {
  const HEADER_MENU_HANDLE = 'main-menu';
  const SIDEBAR_MENU_HANDLE = 'sidebar-menu';
  const FOOTER_MENU_HANDLE = 'footer';

  const data = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: HEADER_MENU_HANDLE,
      sidebarMenuHandle: SIDEBAR_MENU_HANDLE,
      footerMenuHandle: FOOTER_MENU_HANDLE,
      language: storefront.i18n.language,
      handle: "about-us"
    },
  });

  invariant(data, 'No data returned from Shopify API');

  /*
        Modify specific links/routes (optional)
        @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
        e.g here we map:
          - /blogs/news -> /news
          - /blog/news/blog-post -> /news/blog-post
          - /collections/all -> /products
      */
  const customPrefixes = {BLOG: '', CATALOG: 'products'};

  const headerMenu = data?.headerMenu
    ? parseMenu(data.headerMenu, customPrefixes)
    : undefined;
  const sidebarMenu = data?.sidebarMenu
    ? parseMenu(data.sidebarMenu, customPrefixes)
    : undefined;
  const footerMenu = data?.footerMenu
    ? parseMenu(data.footerMenu, customPrefixes)
    : undefined;

  const metafields = data?.metafields
  ? data.metafields
  : undefined;

  return {shop: data.shop, headerMenu, sidebarMenu, footerMenu, metafields};
}

const CART_QUERY = `#graphql
  query CartQuery($cartId: ID!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }

  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
                productType
                tags
                metafields(identifiers: [
                  { namespace: "product", key: "product_details" }
                ]) {
                  value
                  key
                }
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
    }
  }

  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }

  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`;

export async function getCart({storefront}, cartId) {
  invariant(storefront, 'missing storefront client in cart query');

  const {cart} = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}

export const LIST_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query listProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 50) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

export async function getProducts({storefront}) {
  const { products } = await storefront.query(LIST_PRODUCTS_QUERY);
  return products
}
