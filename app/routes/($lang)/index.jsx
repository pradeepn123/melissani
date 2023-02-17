import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {ProductSwimlane, FeaturedCollections, Hero, KeyFeatures} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {AnalyticsPageType} from '@shopify/hydrogen';
import { ImageWithText } from '~/components/ImageWithText';

export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the the lang param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'frontpage'},
  });

  const { page } = await context.storefront.query(PAGE_QUERY, {
    variables: {handle: 'home'}
  })

  const features = page.metafields.filter(item => {
    return item.key == "features"
  })[0]

  const goodbye = page.metafields.filter(item => {
    return item.key == "goodbye"
  })[0]

  const advancedFiltration = page.metafields.filter(item => {
    return item.key == "advanced_filtration"
  })[0]

  const filterClub = page.metafields.filter(item => {
    return item.key == "filter_club"
  })[0]

  const membership = page.metafields.filter(item => {
    return item.key == "membership"
  })[0]

  const videoSection = page.metafields.filter(item => {
    return item.key == "video_section"
  })[0]

  const temperature = page.metafields.filter(item => {
    return item.key == "temperature"
  })[0]

  const installation = page.metafields.filter(item => {
    return item.key == "installation"
  })[0]

  const volume = page.metafields.filter(item => {
    return item.key == "volume"
  })[0]

  const reviews = page.metafields.filter(item => {
    return item.key == "reviews"
  })[0]

  const learnMore = page.metafields.filter(item => {
    return item.key == "learn_more"
  })[0]

  const footerBanner = page.metafields.filter(item => {
    return item.key == "footer_banner"
  })[0]

  const featuredProducts = page.metafields.filter(item => {
    return item.key == "featured_products"
  })[0]

  return defer({
    shop,
    primaryHero: hero,
    features: JSON.parse(features?.value), 
    goodbye: JSON.parse(goodbye?.value),
    advancedFiltration: JSON.parse(advancedFiltration?.value),
    filterClub: JSON.parse(filterClub?.value),
    membership: JSON.parse(membership?.value),
    videoSection: JSON.parse(videoSection?.value),
    temperature: JSON.parse(temperature?.value),
    installation: JSON.parse(installation?.value),
    volume: JSON.parse(volume?.value),
    reviews: JSON.parse(reviews?.value),
    learnMore: JSON.parse(learnMore?.value),
    footerBanner: JSON.parse(footerBanner?.value),
    featuredProducts: JSON.parse(featuredProducts?.value),
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    // featuredProducts: context.storefront.query(
    //   HOMEPAGE_FEATURED_PRODUCTS_QUERY,
    //   {
    //     variables: {
    //       /**
    //        * Country and language properties are automatically injected
    //        * into all queries. Passing them is unnecessary unless you
    //        * want to override them from the following default:
    //        */
    //       country,
    //       language,
    //     },
    //   },
    // ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
  });
}

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
    features,
    goodbye,
    advancedFiltration,
    filterClub,
    membership,
    videoSection,
    temperature,
    installation,
    volume,
    reviews,
    learnMore,
    footerBanner
  } = useLoaderData();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  // TODO: analytics
  // useServerAnalytics({
  //   shopify: {
  //     pageType: ShopifyAnalyticsConstants.pageType.home,
  //   },
  // });

  return (
    <>
      {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}

      {features && (
        <KeyFeatures features={features} />)}

      {goodbye && (
        <ImageWithText goodbye={goodbye} height="full"  />)}

      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products.nodes}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections.nodes}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    metafields: metafield(namespace: "hero", key: "metafields") {
      value
    }
  }
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
`;

const PAGE_QUERY = `#graphql
  query getPageByHandle($handle: String!) {
    page(handle: $handle) {
      metafields(
        identifiers: [
          { namespace: "home", key: "features" }
          { namespace: "home", key: "goodbye" }
          { namespace: "home", key: "advanced_filtration" }
          { namespace: "home", key: "filter_club" }
          { namespace: "home", key: "membership" }
          { namespace: "home", key: "video_section" }
          { namespace: "home", key: "temperature" }
          { namespace: "home", key: "installation" }
          { namespace: "home", key: "volume" }
          { namespace: "home", key: "reviews" }
          { namespace: "home", key: "learn_more" }
          { namespace: "home", key: "footer_banner" }
          { namespace: "home", key: "featured_products" }
        ]
      ) {
        value
        key
      }
    }
  }
`
const COLLECTION_HERO_QUERY = `#graphql
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
`;

// @see: https://shopify.dev/api/storefront/latest/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

// @see: https://shopify.dev/api/storefront/latest/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
