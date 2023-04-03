import { defer } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { 
  ProductSwimlane,
  Hero,
  KeyFeatures,
  Carousel,
  AnnouncementBar,
  ImageWithText,
  VideoPlayer,
  ImageCenterWithText,
  SecondaryHero,
  VolumeControlProperty,
  FooterContact
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
import FooterContactStyles from '~/components/FooterContact/FooterContact.css';

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
    {rel: 'stylesheet', href: SecondaryHeroStyles},
    {rel: 'stylesheet', href: FooterContactStyles}
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
    if (item !== null) {
      return item.key == "hero"
    }
  })

  const features = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "features"
    }
  })

  const goodbye = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "goodbye"
    }
  })
  const announcementbar = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "announcement_bar"
    }
  })

  const advancedFiltration = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "carousel"
    }
  })

  const filterClub = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "filter_club"
    }
})

  const videoSection = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "video_section"
    }
  })

  const discover = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "discover"
    }
  })

  const installation = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "installation"
    }
  })

  const volume = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "volume"
    }
  })

  const reviews = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "reviews"
    }
  })

  const learnMore = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "learn_more"
    }
  })

  const footerBanner = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "footer_banner"
    }
  })

  const footerContact = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "footer_contact"
    }
  })

  let featuredProductsHandles = page.metafields.find(item => {
    if (item !== null) {
      return item.key == "featured_products_handle"
    }
  })

  featuredProductsHandles = featuredProductsHandles ? JSON.parse(featuredProductsHandles.value) : []

  const { products } = await context.storefront.query(HOMEPAGE_FEATURED_PRODUCTS_QUERY);
  const featuredProducts = featuredProductsHandles.map(productHandles => {
    return productHandles.map(productHandle => products.nodes.find(product => product.handle === productHandle))
  })


  return defer({
    primaryHero: JSON.parse(hero?.value),
    features: features && JSON.parse(features?.value),
    goodbye: goodbye && JSON.parse(goodbye?.value),
    announcementbar: announcementbar && JSON.parse(announcementbar?.value),
    advancedFiltration: advancedFiltration && JSON.parse(advancedFiltration?.value),
    filterClub: filterClub && JSON.parse(filterClub?.value),
    videoSection: videoSection && JSON.parse(videoSection?.value),
    discover: discover && JSON.parse(discover?.value),
    installation: installation && JSON.parse(installation?.value),
    volume: volume && JSON.parse(volume?.value),
    reviews: reviews && JSON.parse(reviews?.value),
    learnMore: learnMore && JSON.parse(learnMore?.value),
    footerBanner: footerBanner && JSON.parse(footerBanner?.value),
    footerContact: footerContact && JSON.parse(footerContact?.value),
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
    announcementbar,
    advancedFiltration,
    filterClub,
    videoSection,
    discover,
    installation,
    volume,
    reviews,
    learnMore,
    footerBanner,
    footerContact
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
          <Hero data={primaryHero} id="home-hero" height="full" top loading="eager" />
      )}

      {features && (
        <KeyFeatures features={features} />)}

      {goodbye && (
        <ImageWithText goodbye={goodbye} height="full" className="bg-white xl:flex"/>)}
    
      {announcementbar && (
        <AnnouncementBar announcementbar={announcementbar} height="full" />)}

      {advancedFiltration && (
        <Carousel data={advancedFiltration} className="home-carousel" />)}

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
        <ImageWithText filterClub={filterClub} className="md:flex filter-club-flex"/>
      )}

      {videoSection && (
        <VideoPlayer data={videoSection} />
      )}

      {discover && (<ImageWithText discover={discover} className={"flex discover-main-section"} />)}

      {installation && (<ImageCenterWithText installation={installation} installationHeadingClassName="installation-header" installationParaClassName="installation-para" />)}

      {volume && (<VolumeControlProperty volume={volume} />)}

      {/* {learnMore && ( <ImageWithText learnMore={learnMore} className="flex md:flex-row"/>)} */}

      {/* {footerBanner && (<SecondaryHero data={footerBanner} />)} */}

      {footerContact && (<FooterContact data={footerContact} />)}
      
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
          { namespace: "home", key: "announcement_bar" }
          { namespace: "global", key: "carousel" }
          { namespace: "home", key: "filter_club" }
          { namespace: "global", key: "video_section" }
          { namespace: "home", key: "discover" }
          { namespace: "home", key: "installation" }
          { namespace: "home", key: "volume" }
          { namespace: "home", key: "reviews" }
          { namespace: "home", key: "learn_more" }
          { namespace: "home", key: "footer_banner" }
          { namespace: "home", key: "featured_products_handle" },
          { namespace: "global", key: "footer_contact" }
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