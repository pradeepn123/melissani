import { createAdminClient } from '~/lib/utils';
import { redirect } from '@shopify/remix-oxygen';

export const action =  async ({request, context}) => {
    const {session} = context;
    const formData = await request.formData()
    const cust_email = formData.get('customerOptin')
    const current_location = formData.get('loc');

    const {admin} = createAdminClient({
        privateAdminToken: context.env.ADMIN_API_TOKEN,
        storeDomain: `https://${context.env.PUBLIC_STORE_DOMAIN}`,
        adminApiVersion: context.env.PRIVATE_ADMIN_API_VERSION || '2023-01',
    });

    const subscribeToNewsletter = await useUpdateEmailMarketingConsent(admin);
    const response = await subscribeToNewsletter(cust_email);
    const headers = new Headers();
    headers.set('Set-Cookie', await session.commit());
    headers.set('Location',  current_location)
    return redirect(current_location + "?subscribed=true#email-subscription-form");
}

async function useUpdateEmailMarketingConsent(admin) {
  const CUSTOMER_UPDATE = `#graphql
  mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
        customerEmailMarketingConsentUpdate(input: $input) {
          customer {
            emailMarketingConsent {
                marketingState
            }
          }
          userErrors {
            field
            message
          }
        }
      }
      `;

  const CUSTOMER_CREATE = `#graphql
  mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            emailMarketingConsent {
                marketingState
            }
          }
          userErrors {
            field
            message
          }
        }
      }`;

  async function getCustomerId(email) {
    const data = await admin(`#graphql
    query {
        customers (first:1, query: "${email}"){
          edges {
            node {
              id
            }
          }
        }
      }`, {variables: {}});

    const edges = await data.customers.edges;
    if (edges.length > 0) {
      return edges[0].node.id;
    }
    return null;
  }

  async function customerUpdate(id) {
    return admin(CUSTOMER_UPDATE, {
      variables: {
        input: {
          customerId: id,
          emailMarketingConsent: {
            marketingOptInLevel: 'CONFIRMED_OPT_IN',
            marketingState: 'SUBSCRIBED',
          },
        },
      },
    });
  }

  async function customerCreate(email) {
    return admin(CUSTOMER_CREATE, {
      variables: {
        input: {
          email: email,
          emailMarketingConsent: {
            marketingOptInLevel: 'CONFIRMED_OPT_IN',
            marketingState: 'SUBSCRIBED',
          },
        },
      },
    });
  }

  async function subscribeToNewsletter(email) {
    const id = await getCustomerId(email);
    if (id) {
      customerUpdate(id);
    } else {
      customerCreate(email);
    }
  }

  return subscribeToNewsletter;
}