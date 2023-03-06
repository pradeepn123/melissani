import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {PageHeader} from '~/components';
import {Faq, Purifier, About} from '~/components';
import FaqStyles from '~/components/Faq/Faq.css';
import AboutUsStyles from '~/components/About/About.css';
import PurifierStyles from '~/components/Purifier/Purifier.css';
import HeroStyles from '~/components/Hero/Hero.css';
import ImageCenterWithTextStyles from '~/components/ImageCenterWithText/ImageCenterWithText.css';
import ImageWithTextStyles from '~/components/ImageWithText/ImageWithText.css';
import VideoPlayerStyles from '~/components/VideoPlayer/VideoPlayer.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: FaqStyles},
    {rel: 'stylesheet', href: PurifierStyles},
    {rel: 'stylesheet', href: HeroStyles},
    {rel: 'stylesheet', href: ImageCenterWithTextStyles},
    {rel: 'stylesheet', href: ImageWithTextStyles},
    {rel: 'stylesheet', href: VideoPlayerStyles},
    {rel: 'stylesheet', href: AboutUsStyles}
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
  
  const faq = page.handle == 'faq' && page.metafields.find(item => {
    if(item !== null){
      return item.key == "qna"
    }
  })

  const about = page.handle == 'about-us' && page.metafields.find(item => {
    if(item !== null){
      return item.key == "about_us"
    }
  })

  const hero = page.handle == 'purifier' && page.metafields.find(item => {
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
  return json(
    {page, faq, hero, installation, temperature, volume, video_section, about},
    {
      headers: {
        // TODO cacheLong()
      },
    },
  );
}

export default function Page() {
  const {page, faq, hero, installation, temperature, volume, video_section, about} = useLoaderData();
  let parsed_faq, parsed_installation, parsed_hero, parsed_temperature, parsed_volume, parsed_video_section, parsed_about;
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
  return (
    <>
      {page.handle == 'faq' && (<Faq data={parsed_faq} />)}
      {page.handle == 'about-us' && (<About data={parsed_about} />)}
      {page.handle == 'purifier' && (
        <Purifier installation={parsed_installation} hero={parsed_hero} temperature={parsed_temperature} volume={parsed_volume} video_section={parsed_video_section}/>
      )}
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
          { namespace: "about", key: "about_us" }
        ]
      ) {
        value
        key
      }
    }
  }
`;
