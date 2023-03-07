import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {Faq, Purifier, About, FilterClub, Contact, ProductRegistration} from '~/components';
import FaqStyles from '~/components/Faq/Faq.css';
import AboutUsStyles from '~/components/About/About.css';
import FilterClubStyles from '~/components/FilterClub/FilterClub.css';
import PurifierStyles from '~/components/Purifier/Purifier.css';
import HeroStyles from '~/components/Hero/Hero.css';
import ImageCenterWithTextStyles from '~/components/ImageCenterWithText/ImageCenterWithText.css';
import ImageWithTextStyles from '~/components/ImageWithText/ImageWithText.css';
import VideoPlayerStyles from '~/components/VideoPlayer/VideoPlayer.css';
import ContactStyles from '~/components/Contact/Contact.css';
import ProductRegistrationStyles from '~/components/ProductRegistration/ProductRegistration.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: FaqStyles},
    {rel: 'stylesheet', href: PurifierStyles},
    {rel: 'stylesheet', href: HeroStyles},
    {rel: 'stylesheet', href: ImageCenterWithTextStyles},
    {rel: 'stylesheet', href: ImageWithTextStyles},
    {rel: 'stylesheet', href: VideoPlayerStyles},
    {rel: 'stylesheet', href: AboutUsStyles},
    {rel: 'stylesheet', href: FilterClubStyles},
    {rel: 'stylesheet', href: ContactStyles},
    {rel: 'stylesheet', href: ProductRegistrationStyles}
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
  
  const faq = (page.handle == 'faq' ||  page.handle == 'melissani-club') && page.metafields.find(item => {
    if(item !== null){
      return item.key == "qna"
    }
  })

  const about = page.handle == 'about-us' && page.metafields.find(item => {
    if(item !== null){
      return item.key == "about_us"
    }
  })

  const hero = (page.handle == 'purifier' ||  page.handle == 'melissani-club') && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "hero"
    }
  })

  const installation = page.handle == 'purifier' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "installation"
    }
  })
  
  const temperature = page.handle == 'purifier' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "temperature"
    }
  })

  const volume = page.handle == 'purifier' && page.metafields.find(item => {
    if(item !== null) {
      return item.key == "volume"
    }
  })

  const video_section = page.handle == 'purifier' && page.metafields.find(item => {
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

  return json(
    {page, faq, hero, installation, temperature, volume, video_section, about, contact_form, product_registration_form},
    {
      headers: {
        // TODO cacheLong()
      },
    },
  );
}

export default function Page() {
  const {page, faq, hero, installation, temperature, volume, video_section, about, contact_form, product_registration_form} = useLoaderData();
  let parsed_faq, parsed_installation, parsed_hero, parsed_temperature, parsed_volume, parsed_video_section, parsed_about, parsed_contact_form, parsed_product_registration_form;
  if(faq) {
    parsed_faq = JSON.parse(faq?.value);
  }
  if(about) {
    parsed_about = JSON.parse(about?.value);
  }
  if(hero) {
    parsed_hero = JSON.parse(hero?.value);
  }
  if(installation) {
    parsed_installation = JSON.parse(installation?.value);
  }
  if(temperature) {
    parsed_temperature = JSON.parse(temperature?.value);
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
  return (
    <>
      {page.handle == 'faq' && (<Faq data={parsed_faq} />)}
      {page.handle == 'about-us' && (<About data={parsed_about} />)}
      {page.handle == 'melissani-club' && (<FilterClub hero={parsed_hero} data={parsed_faq} />)}
      {page.handle == 'purifier' && (
        <Purifier installation={parsed_installation} hero={parsed_hero} temperature={parsed_temperature} volume={parsed_volume} video_section={parsed_video_section}/>
      )}
      {page.handle == 'contact' && (<Contact data={parsed_contact_form} />)}
      {page.handle == 'melissani-club' && (<FilterClub hero={parsed_hero} data={parsed_faq} />)}
      {page.handle == 'product-registration' && (<ProductRegistration data={parsed_product_registration_form} />)}
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
          { namespace: "product_registration", key: "product_registration_form" },
        ]
      ) {
        value
        key
      }
    }
  }
`;
