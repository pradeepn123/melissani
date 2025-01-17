import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';

import {PageHeader, Section, Heading, Link} from '~/components';

export const handle = {
  seo: {
    title: 'Policies',
  },
};

export async function loader({context: {storefront}}) {
  const data = await storefront.query(POLICIES_QUERY);

  invariant(data, 'No data returned from Shopify API');
  const policies = Object.values(data.shop || {});

  if (policies.length === 0) {
    throw new Response('Not found', {status: 404});
  }

  return json(
    {
      policies,
    },
    {
      headers: {
        // TODO cacheLong()
      },
    },
  );
}

export default function Policies() {
  const {policies} = useLoaderData();

  return (
    <>
      <PageHeader heading="Policies" />
      <Section padding="x" className="mb-24">
        {policies.map((policy) => {
          return (
            policy && (
              <Heading className="font-normal page-title" key={policy.id}>
                <Link to={`/policies/${policy.handle}`}>{policy.title}</Link>
              </Heading>
            )
          );
        })}
      </Section>
    </>
  );
}

const POLICIES_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    id
    title
    handle
  }

  query PoliciesQuery {
    shop {
      privacyPolicy {
        ...Policy
      }
      shippingPolicy {
        ...Policy
      }
      termsOfService {
        ...Policy
      }
      refundPolicy {
        ...Policy
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;
