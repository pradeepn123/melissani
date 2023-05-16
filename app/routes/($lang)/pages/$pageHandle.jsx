import { useEffect, useContext } from 'react';

import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {Faq, Purifier, About, FilterClub, Contact, ProductRegistration, Filter, FooterContact, Section, LabPFAsReport, RequestContext } from '~/components';
import FaqStyles from '~/components/Faq/Faq.css';
import AboutUsStyles from '~/components/About/About.css';
import FilterClubStyles from '~/components/FilterClub/FilterClub.css';
import BackgroundImgWithTextStyles from '~/components/BackgroundImgWithText/BackgroundImgWithText.css';
import PurifierStyles from '~/components/Purifier/Purifier.css';
import HeroStyles from '~/components/Hero/Hero.css';
import ImageCenterWithTextStyles from '~/components/ImageCenterWithText/ImageCenterWithText.css';
import ImageWithTextStyles from '~/components/ImageWithText/ImageWithText.css';
import TextCarouselStyles from '~/components/TextCarousel/TextCarousel.css';
import ImageWithBlockOverlayStyles from '~/components/ImageWithBlockOverlay/ImageWithBlockOverlay.css';
import TextWithButtonStyles from '~/components/TextWithButton/TextWithButton.css';
import FilterClubSupportInfoStyles from '~/components/FilterClubSupportInfo/FilterClubSupportInfo.css';
import VideoPlayerStyles from '~/components/VideoPlayer/VideoPlayer.css';
import ContactStyles from '~/components/Contact/Contact.css';
import ProductRegistrationStyles from '~/components/ProductRegistration/ProductRegistration.css';
import CarouselStyles from '~/components/Carousel/Carousel.css';
import FooterContactStyles from '~/components/FooterContact/FooterContact.css';
import KeyFeaturesStyles from '~/components/KeyFeatures/KeyFeatures.css';
import LabPFAsReportStyles from '~/components/LabPFAsReport/LabPFAsReport.css';



export const links = () => {
  return [
    {rel: 'stylesheet', href: FaqStyles},
    {rel: 'stylesheet', href: PurifierStyles},
    {rel: 'stylesheet', href: HeroStyles},
    {rel: 'stylesheet', href: ImageCenterWithTextStyles},
    {rel: 'stylesheet', href: ImageWithBlockOverlayStyles},
    {rel: 'stylesheet', href: FilterClubSupportInfoStyles},
    {rel: 'stylesheet', href: TextWithButtonStyles},
    {rel: 'stylesheet', href: ImageWithTextStyles},
    {rel: 'stylesheet', href: VideoPlayerStyles},
    {rel: 'stylesheet', href: AboutUsStyles},
    {rel: 'stylesheet', href: FilterClubStyles},
    {rel: 'stylesheet', href: TextCarouselStyles},
    {rel: 'stylesheet', href: BackgroundImgWithTextStyles},
    {rel: 'stylesheet', href: ContactStyles},
    {rel: 'stylesheet', href: ProductRegistrationStyles},
    {rel: 'stylesheet', href: CarouselStyles},
    {rel: 'stylesheet', href: FooterContactStyles},
    {rel: 'stylesheet', href: KeyFeaturesStyles},
    {rel: 'stylesheet', href: LabPFAsReportStyles}
  ]
}

const seo = ({data}) => ({
  title: data?.page?.seo?.title,
  description: data?.page?.seo?.description,
});

export const handle = {
  seo,
};

export async function loader({request, params, context}) {

  invariant(params.pageHandle, 'Missing page handle');

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.pageHandle,
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }
  
  const faq = (page.handle == 'faq' ||  page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null){
      return item.key == "qna"
    }
  })

  const filterclub = (page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null){
      return item.key == "image_with_block_overlay"
    }
  })

  const supportinfo = (page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null){
      return item.key == "filter_club_support_info"
    }
  })

  const textwithbutton = (page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null){
      return item.key == "text_with_button"
    }
  })

  const about = page.handle == 'about-us' && page.metafields.find(item => {
    if(item !== null){
      return item.key == "about_us"
    }
  }) 

  const hero = (page.handle == 'purifier' ||  page.handle == 'filter-club' || page.handle == "melissani-m1-filter") && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "hero"
    }
  })

  const installation = page.handle == 'purifier' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "installation"
    }
  })
  
  const temperature = (page.handle == 'purifier' ||  page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "temperature"
    }
  })

  const volume = page.handle == 'purifier' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "volume"
    }
  })

  const video_section = (page.handle == 'purifier' || page.handle == 'melissani-m1-filter') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "video_section"
    }
  })

  const contact_form = page.handle == 'contact' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "contact_form"
    }
  })

  const product_registration_form = page.handle == 'product-registration' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "product_registration_form"
    }
  })

  const carousel = (page.handle == 'purifier'|| page.handle == 'melissani-m1-filter') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "carousel"
    }
  })

  const filter_changes = page.handle == 'melissani-m1-filter' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "filter_changes"
    }
  })

  const filterreplacementcycle = (page.handle == "melissani-m1-filter") && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "filter_replacement_cycle"
    }
  })

  const sticky_bar_bottom = (page.handle == 'purifier' || page.handle == 'melissani-m1-filter' || page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null){
      return item.key == "sticky_bar_bottom"
    }
  })

  const filterclubwarrenty = (page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "filter_club_warrenty"
    }
  })

  const features = (page.handle == 'filter-club') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "features"
    }
  })

  const footer_contact = (page.handle == 'about-us' || page.handle == 'faq') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "footer_contact"
    }
  })

  const popup_content = (page.handle == 'lab-pfas-report') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "popup_content"
    }
  })

  return json(
    {
      page, 
      faq, 
      hero, 
      installation, 
      temperature, 
      volume, 
      video_section, 
      about, 
      carousel,
      contact_form,
      product_registration_form,
      filter_changes,
      filterclubwarrenty,
      filterclub,
      filterreplacementcycle,
      supportinfo,
      textwithbutton,
      sticky_bar_bottom,
      footer_contact,
      features,
      popup_content
    },
    {
      headers: {
        // TODO cacheLong()
      },
    },
  );
}

export default function Page() {

  const requestContext = useContext(RequestContext);

  const {
    page, 
    faq, 
    hero, 
    installation, 
    temperature, 
    volume, 
    video_section, 
    about,
    carousel,
    contact_form,
    product_registration_form,
    filter_changes,
    filterclub,
    filterreplacementcycle,
    supportinfo,
    textwithbutton,
    sticky_bar_bottom,
    filterclubwarrenty,
    footer_contact,
    features,
    popup_content
  } = useLoaderData();


  let parsed_faq, parsed_installation, parsed_hero, parsed_temperature, parsed_volume, parsed_video_section, 
    parsed_about, parsed_carousel, parsed_contact_form, parsed_product_registration_form, parsed_filter_changes, 
    parsed_filterclub, parsed_filterclubsupportinfo, parsed_textwithbutton, parsed_filterreplacementcycle, 
    parsed_filterclubwarrenty, parsed_sticky_bar_bottom, parsed_footer_contact, parsed_features, parsed_popup_content;

  if(popup_content) {
    parsed_popup_content = JSON.parse(popup_content?.value);
  }

  useEffect(function () {
    if (parsed_popup_content && !requestContext.labReportInformation) {
      requestContext.setLabReportInformation(parsed_popup_content)      
    }
  }, [page.handle == 'lab-pfas-report'])
  
  if(faq) {
    parsed_faq = JSON.parse(faq?.value);
  }

  if(filterclub) {
    parsed_filterclub = JSON.parse(filterclub?.value);
  }

  if(filterreplacementcycle) {
    parsed_filterreplacementcycle = JSON.parse(filterreplacementcycle?.value);
  }

  if(supportinfo) {
    parsed_filterclubsupportinfo = JSON.parse(supportinfo?.value);
  }

  if(textwithbutton) {    
    parsed_textwithbutton = JSON.parse(textwithbutton?.value);
  }

  if(about) {
    parsed_about = JSON.parse(about?.value);
  }

  if(hero) {
    parsed_hero = JSON.parse(hero?.value);
  }
  
  if(sticky_bar_bottom) {
    parsed_sticky_bar_bottom = JSON.parse(sticky_bar_bottom?.value);
  }

  if(installation) {
    parsed_installation = JSON.parse(installation?.value);
  }

  if(temperature) {
    parsed_temperature = JSON.parse(temperature?.value);
  }

  if(filterclubwarrenty) {
    parsed_filterclubwarrenty = JSON.parse(filterclubwarrenty?.value);
  }

  if(volume) {
    parsed_volume = JSON.parse(volume?.value);
  }

  if(video_section) {
    parsed_video_section = JSON.parse(video_section?.value);
  }
  
  if(contact_form) {
    parsed_contact_form = JSON.parse(contact_form?.value);
  }
  
  if(product_registration_form) {
    parsed_product_registration_form = JSON.parse(product_registration_form?.value);
  }

  if(carousel) {
    parsed_carousel = JSON.parse(carousel?.value);
  }

  if(filter_changes) {
    parsed_filter_changes = JSON.parse(filter_changes?.value);
  }

  if(footer_contact) {
    parsed_footer_contact = JSON.parse(footer_contact?.value);
  }

  if(features) {
    parsed_features = JSON.parse(features?.value);
  }
  
  return (
    <>
      {page.handle == 'faq' ? (<>
        <Faq data={parsed_faq} />
        {/* <FooterContact data={parsed_footer_contact} /> */}
      </>) : 
      page.handle == 'about-us' ? (<>
        <About data={parsed_about} />
        {/* <FooterContact data={parsed_footer_contact} /> */}
      </>) :
      page.handle == 'filter-club' ? (
        <FilterClub hero={parsed_hero} data={parsed_faq} supportinfo={parsed_filterclubsupportinfo} 
        filterclub={parsed_filterclub}  filterclubwarrenty={parsed_filterclubwarrenty} textwithbutton={parsed_textwithbutton} 
        stickybarbottom={parsed_sticky_bar_bottom} features={parsed_features} />
      ) :
      page.handle == 'purifier' ? (
        <Purifier installation={parsed_installation} hero={parsed_hero} temperature={parsed_temperature} volume={parsed_volume} 
        video_section={parsed_video_section} carousel={parsed_carousel} stickybarbottom={parsed_sticky_bar_bottom}/>
      ) :
      page.handle == 'contact' ? (
        <Contact data={parsed_contact_form} />
      ) :
      page.handle == 'product-registration' ? (
        <ProductRegistration data={parsed_product_registration_form} />
      ) :
      page.handle == 'melissani-m1-filter' ? (
        <Filter hero={parsed_hero} carousel={parsed_carousel} filterreplacementcycle={parsed_filterreplacementcycle} filter_changes={parsed_filter_changes} 
        video_section={parsed_video_section} stickybarbottom={parsed_sticky_bar_bottom}/>
      ) :
      page.handle == 'lab-pfas-report' ? (
        <div className="flex-grow w-full">
          <div
            dangerouslySetInnerHTML={{__html: page.body}}
            className="page-description page-handle-style justify-center flex"
          />
        </div>
      ) :
      <Section
        padding="all"
        display="flex"
        className="flex-col items-baseline w-full gap-8 md:flex-col lg:px-28 lg:py-12"
      >
        <h1 className="page-title grid items-start flex-grow gap-4 top-36">
          {page.title}
        </h1>
        <div className="flex-grow w-full">
          <div
            dangerouslySetInnerHTML={{__html: page.body}}
            className="page-description page-handle-style"
          />
        </div>
      </Section>}
    </>
  );
}

const PAGE_QUERY = `#graphql
  query PageDetails($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      handle
      seo {
        description
        title
      }
      metafields(
        identifiers: [
          { namespace: "faq", key: "qna" },
          { namespace: "home", key: "installation" },
          { namespace: "global", key: "hero" },
          { namespace: "global", key: "temperature" },
          { namespace: "purifier", key: "volume" },
          { namespace: "global", key: "video_section" },
          { namespace: "about", key: "about_us" },
          { namespace: "contact", key: "contact_form" },
          { namespace: "global", key: "carousel" },
          { namespace: "about", key: "filter_changes" },
          { namespace: "filter", key: "filter_replacement_cycle" },
          { namespace: "product_registration", key: "product_registration_form" },
          { namespace: "filterclub", key: "image_with_block_overlay" },
          { namespace: "filterclub", key: "filter_club_warrenty" },
          { namespace: "filterclub", key: "filter_club_support_info" },
          { namespace: "filterclub", key: "text_with_button" },
          { namespace: "global", key: "sticky_bar_bottom" },
          { namespace: "global", key: "footer_contact" },
          { namespace: "home", key: "features" },
          { namespace: "lab_pfas_report", key: "popup_content" }
        ]
      ) {
        value
        key
      }
    }
  }
`;
