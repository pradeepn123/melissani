import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

import {PageHeader, Section, Button} from '~/components';
import invariant from 'tiny-invariant';

export async function loader({request, params, context}) {
  invariant(params.policyHandle, 'Missing policy handle');
  const handle = params.policyHandle;

  const policyName = handle.replace(/-([a-z])/g, (_, m1) => m1.toUpperCase());

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      subscriptionPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response(null, {status: 404});
  }

  return json(
    {policy},
    {
      headers: {
        // TODO cacheLong()
      },
    },
  );
}

export const meta = ({data}) => {
  let policyPage = data?.policy?.handle;
  return {
    title: policyPage === "privacy-policy" ? "Melissani Privacy Policy | Safeguarding Your Personal Information" : policyPage === 'refund-policy' ? "Melissani Refund Policy | Hassle-Free Returns & Exchanges"
    : policyPage === "terms-of-service" ? "Melissani Terms of Service | Understanding Our Policies & Practices" : policyPage === "subscription-policy" ? "Melissani Filter Club Subscription Terms | Enjoy Worry-Free Filter Replacements"
    : policyPage === "warranty-policy" ? "Melissani Warranty Policy | Countertop RO Water Purifier Protection" : "Policies",
    description: policyPage === "privacy-policy" ? "At Melissani, we value your privacy. Learn about our commitment to protecting your personal information and how we handle data in our Privacy Policy." : policyPage === 'refund-policy' ?
    "Discover Melissani's Refund Policy, ensuring a smooth and hassle-free process for returns and exchanges on your countertop RO water purifier purchase."
    : policyPage === "terms-of-service" ? "Review Melissani's Terms of Service to better understand our policies, practices, and guidelines governing the use of our website and products." : policyPage === "subscription-policy" ?
    "Explore the terms and conditions of the Melissani Filter Club subscription service, ensuring a hassle-free experience for your countertop RO water purifier filter replacements."
    : policyPage === "warranty-policy" ? "Learn about Melissani's Warranty Policy, providing comprehensive protection for your M1 countertop RO water purifier. Shop with confidence and peace of mind." : "Policies"
  };
};

export default function Policies() {
  const {policy} = useLoaderData();

  return (
    <>
      <Section
        padding="all"
        display="flex"
        className="flex-col items-baseline w-full gap-8 md:flex-col lg:px-28 lg:py-12"
      >
        <h1 className="page-title grid items-start flex-grow gap-4 top-36">
          {policy.title}
        </h1>
        <div className="flex-grow w-full">
          <div
            dangerouslySetInnerHTML={{__html: policy.body}}
            className="page-description"
          />
        </div>
      </Section>
    </>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }

  fragment PolicyDefault on ShopPolicyWithDefault {
    body
    handle
    id
    title
    url
  }

  query PoliciesQuery(
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $refundPolicy: Boolean!
    $subscriptionPolicy: Boolean!
  ) @inContext(language: $language) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
      subscriptionPolicy @include(if: $subscriptionPolicy) {
        ...PolicyDefault
      }
    }
  }
`;
