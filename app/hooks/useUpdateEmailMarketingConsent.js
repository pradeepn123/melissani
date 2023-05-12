
async function useUpdateEmailMarketingConsent(admin) {
  const CUSTOMER_UPDATE = `mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
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

  const CUSTOMER_CREATE = `mutation customerCreate($input: CustomerInput!) {
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
    const data = await admin(`query {
        customers (first:1, query: "${email}""){
          edges {
            node {
              id
            }
          }
        }
      }`);

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
    const id = getCustomerId(email);
    if (id) {
      customerUpdate(id);
    } else {
      customerUpdate(email);
    }
  }

  return {subscribeToNewsletter, customerCreate, customerUpdate};
}

export default useUpdateEmailMarketingConsent;
