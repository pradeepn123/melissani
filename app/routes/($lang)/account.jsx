import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useMatches,
  useOutlet,
} from '@remix-run/react';
import {Suspense} from 'react';
import {
  Button,
  OrderCard,
  PageHeader,
  Text,
  AccountDetails,
  AccountAddressBook,
  Modal,
  ProductSwimlane,
} from '~/components';
import {FeaturedCollections} from '~/components/FeaturedCollections';
import {json, defer, redirect} from '@shopify/remix-oxygen';
import {flattenConnection} from '@shopify/hydrogen';
import {getFeaturedData} from './featured-products';
import {doLogout} from './account/__private/logout';
import {usePrefixPathWithLocale} from '~/lib/utils';
import accountStyles from '../../styles/account.css';
import ShopifyMultipass from '../../lib/multipass.js';


export const links = () => [
  {rel: 'stylesheet', href: accountStyles}
]

export async function loader({request, context, params}) {
  const { pathname } = new URL(request.url);
  const lang = params.lang;
  const customerAccessToken = await context.session.get('customerAccessToken');
  const isAuthenticated = Boolean(customerAccessToken);
  const loginPath = lang ? `/${lang}/account/login` : '/account/login';
  const isAccountPage = /^\/account\/?$/.test(pathname);

  if (!isAuthenticated) {
    if (isAccountPage) {
      return redirect(loginPath);
    }
    // pass through to public routes
    return json({isAuthenticated: false});
  }

  const customer = await getCustomer(context, customerAccessToken);

  var multipass = new ShopifyMultipass(context.env.MULTI_PASS_TOKEN);

  // Create your customer data hash
  var customerData = { email: customer.email };

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  const orders = flattenConnection(customer.orders);

  return defer({
    isAuthenticated,
    customer,
    heading,
    orders,
    addresses: flattenConnection(customer.addresses),
    featuredData: getFeaturedData(context.storefront),
    multipass_url: multipass
      .withRedirect('/tools/recurring/login/')
      .generateUrl(customerData, context.env.PUBLIC_STORE_DOMAIN)
  });
}

export default function Authenticated() {
  const data = useLoaderData();
  const outlet = useOutlet();
  const matches = useMatches();

  // routes that export handle { renderInModal: true }
  const renderOutletInModal = matches.some((match) => {
    return match?.handle?.renderInModal;
  });

  // Public routes
  if (!data.isAuthenticated) {
    return <Outlet />;
  }

  // Authenticated routes
  if (outlet) {
    if (renderOutletInModal) {
      return (
        <>
          <Modal cancelLink="/account">
            <Outlet context={{customer: data.customer}} />
          </Modal>
          <Account {...data} />
        </>
      );
    } else {
      return <Outlet context={{customer: data.customer}} />;
    }
  }

  return <Account {...data} />;
}

function Account({customer, orders, heading, addresses, featuredData, multipass_url}) {
  return (
    <>
      <div className='account_heading'>
        <h1 className='whitespace-pre-wrap max-w-prose-narrow font-bold text-heading inline-block'>
          {heading}
        </h1>          
        <Form method="post" action={usePrefixPathWithLocale('/account/logout')}>
          <Button
            type="submit" className="text-primary/50"
            variant="secondary"
          >
            Sign out
          </Button>
        </Form>
      </div>

      <div className="account_main_content">
        <div className="account_sidebar">
          <ul>
            <a href="#AccountDetails"><li>Account Details</li></a>
            <a href="#AccountOrderHistory"><li>Order History</li></a>
            <a href={multipass_url} target="__blank">
              <li>Manage Subscription</li>
            </a>
            <a href="#AccountAddressBook"><li>Address Book</li></a>
          </ul>
        </div>
        <div className="account_details mt-6 lg:mt-0">          
          <AccountDetails customer={customer} />
          {orders && <AccountOrderHistory orders={orders} />}
          <AccountAddressBook addresses={addresses} customer={customer} />
          {!orders.length && (
            <Suspense>
              <Await
                resolve={featuredData}
                errorElement="There was a problem loading featured products."
              >
                {(data) => (
                  <>
                    {/* <FeaturedCollections
                      title="Popular Collections"
                      collections={data.featuredCollections}
                    /> */}
                    {/* <ProductSwimlane products={data.featuredProducts} /> */}
                  </>
                )}
              </Await>
            </Suspense>
          )}
        </div>
      </div>
      
    </>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div className="" id="AccountOrderHistory">
      <div className="mt-2">
        <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
          <h2 className="font-bold text-lead">Order History</h2>
          {orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
        </div>
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className='empty_orders'>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        You haven&apos;t placed any orders yet.
      </Text>
      <div className="w-48">
        <Button
          className="w-full mt-2 text-sm"
          variant="secondary"
          to={usePrefixPathWithLocale('/')}
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}

function Orders({orders}) {
  return (
    <ul className="grid grid-flow-row grid-cols-1 gap-2 gap-y-6 md:gap-4 lg:gap-6 false sm:grid-cols-3">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </ul>
  );
}

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 2) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCustomer(context, customerAccessToken) {
  const {storefront} = context;

  const data = await storefront.query(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (!data || !data.customer) {
    throw await doLogout(context);
  }

  return data.customer;
}
