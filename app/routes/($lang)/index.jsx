import { defer } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { 
  ProductSwimlane,
  Hero,
  KeyFeatures,
  Carousel,
  ImageWithText,
  VideoPlayer,
  ImageCenterWithText,
  SecondaryHero,
  VolumeControlProperty
}from '~/components';
import { PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { getHeroPlaceholder } from '~/lib/placeholders';
import { AnalyticsPageType } from '@shopify/hydrogen';
import ImageWithTextStyles from '~/components/ImageWithText/ImageWithText.css';
import KeyFeaturesStyles from '~/components/KeyFeatures/KeyFeatures.css';
import CarouselStyles from '~/components/Carousel/Carousel.css';
import ProductSwimlaneStyles from '~/components/ProductSwimlane/ProductSwimlane.css';
import VideoPlayerStyles from '~/components/VideoPlayer/VideoPlayer.css';
import HeroStyles from '~/components/Hero/Hero.css';
import VolumeControlPropertyStyles from '~/components/VolumeControlProperty/VolumeControlProperty.css';
import ImageCenterWithTextStyles from '~/components/ImageCenterWithText/ImageCenterWithText.css';
import SecondaryHeroStyles from '~/components/SecondaryHero/SecondaryHero.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: ImageWithTextStyles},
    {rel: 'stylesheet', href: KeyFeaturesStyles},
    {rel: 'stylesheet', href: CarouselStyles},
    {rel: 'stylesheet', href: ProductSwimlaneStyles},
    {rel: 'stylesheet', href: VideoPlayerStyles},
    {rel: 'stylesheet', href: HeroStyles},
    {rel: 'stylesheet', href: VolumeControlPropertyStyles},
    {rel: 'stylesheet', href: ImageCenterWithTextStyles},
    {rel: 'stylesheet', href: SecondaryHeroStyles}
  ]
}
export async function loader({ params, context }) {
  const { language, country } = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the the lang param must be invalid, send to the 404 page
    throw new Response(null, { status: 404 });
  }

  const { page } = await context.storefront.query(PAGE_QUERY, {
    variables: { handle: 'home' }
  })

  const hero = page.metafields.find(item => {
    return item.key == "hero"
  })

  const features = page.metafields.find(item => {
    return item.key == "features"
  })

  const goodbye = page.metafields.find(item => {
    return item.key == "goodbye"
  })

  const advancedFiltration = page.metafields.find(item => {
    return item.key == "advanced_filtration"
  })

  const filterClub = page.metafields.find(item => {
    return item.key == "filter_club"
  })

  const videoSection = page.metafields.find(item => {
    return item.key == "video_section"
  })

  const discover = page.metafields.find(item => {
    return item.key == "discover"
  })

  const installation = page.metafields.find(item => {
    return item.key == "installation"
  })

  const volume = page.metafields.find(item => {
    return item.key == "volume"
  })

  const reviews = page.metafields.find(item => {
    return item.key == "reviews"
  })

  const learnMore = page.metafields.find(item => {
    return item.key == "learn_more"
  })

  const footerBanner = page.metafields.find(item => {
    return item.key == "footer_banner"
  })

  let featuredProductsHandles = page.metafields.find(item => {
    return item.key == "featured_products_handle"
  })

  featuredProductsHandles = featuredProductsHandles ? JSON.parse(featuredProductsHandles.value) : []

  const { products } = await context.storefront.query(HOMEPAGE_FEATURED_PRODUCTS_QUERY);
  const featuredProducts = featuredProductsHandles.map(productHandles => {
    return productHandles.map(productHandle => products.nodes.find(product => product.handle === productHandle))
  })

  return defer({
    primaryHero: JSON.parse(hero?.value),
    features: JSON.parse(features?.value),
    goodbye: JSON.parse(goodbye?.value),
    advancedFiltration: JSON.parse(advancedFiltration?.value),
    filterClub: JSON.parse(filterClub?.value),
    videoSection: JSON.parse(videoSection?.value),
    discover: JSON.parse(discover?.value),
    installation: JSON.parse(installation?.value),
    volume: JSON.parse(volume?.value),
    reviews: JSON.parse(reviews?.value),
    learnMore: JSON.parse(learnMore?.value),
    footerBanner: JSON.parse(footerBanner?.value),
    featuredProducts: featuredProducts,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    analytics: {
      pageType: AnalyticsPageType.home,
    },
  });
}

export default function Homepage() {
  const {
    primaryHero,
    featuredProducts,
    features,
    goodbye,
    advancedFiltration,
    filterClub,
    videoSection,
    discover,
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
        <Hero data={primaryHero} height="full" top loading="eager" />
      )}

      {features && (
        <KeyFeatures features={features} />)}

      {goodbye && (
        <ImageWithText goodbye={goodbye} height="full" className="bg-grey xl:flex"/>)}

      {advancedFiltration && (
        <Carousel data={advancedFiltration} />)}

      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            <ProductSwimlane
              products={featuredProducts}
              count={2}
              className={"featured-products-home"}
            />
          </Await>
        </Suspense>
      )}

      {filterClub && (
        <ImageWithText filterClub={filterClub} filterClassName="md:flex filter-club-flex"/>
      )}

      {videoSection && (
        <VideoPlayer data={videoSection} />
      )}

      {discover && (<ImageWithText discover={discover} discoverClassName={"flex discover-main-section"} />)}

      {installation && (<ImageCenterWithText installation={installation} installationHeadingClassName="installation-header" installationParaClassName="installation-para" />)}

      {volume && (<VolumeControlProperty volume={volume} />)}

      {/* {learnMore && ( <ImageWithText learnMore={learnMore} className="flex md:flex-row"/>)} */}

      {/* {footerBanner && (<SecondaryHero data={footerBanner} />)} */}
      
    </>
  );
}

const PAGE_QUERY = `#graphql
  query getPageByHandle($handle: String!) {
    page(handle: $handle) {
      metafields(
        identifiers: [
          { namespace: "global", key: "hero" }
          { namespace: "home", key: "features" }
          { namespace: "home", key: "goodbye" }
          { namespace: "home", key: "advanced_filtration" }
          { namespace: "home", key: "filter_club" }
          { namespace: "home", key: "membership" }
          { namespace: "global", key: "video_section" }
          { namespace: "home", key: "discover" }
          { namespace: "home", key: "installation" }
          { namespace: "home", key: "volume" }
          { namespace: "home", key: "reviews" }
          { namespace: "home", key: "learn_more" }
          { namespace: "home", key: "footer_banner" }
          { namespace: "home", key: "featured_products_handle" }
        ]
      ) {
        value
        key
      }
    }
  }
`

// @see: https://shopify.dev/api/storefront/latest/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 50) {
      nodes {
        ...ProductCard
      }
    }
  }
`;