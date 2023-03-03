import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {PageHeader} from '~/components';
import {Faq, Purifier} from '~/components';
import FaqStyles from '~/components/Faq/Faq.css';
import PurifierStyles from '~/components/Purifier/Purifier.css';
import HeroStyles from '~/components/Hero/Hero.css';

export const links = () => {
  return [
    {rel: 'stylesheet', href: FaqStyles},
    {rel: 'stylesheet', href: PurifierStyles},
    {rel: 'stylesheet', href: HeroStyles}
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
  

  return json(
    {page, faq, hero, installation},
    {
      headers: {
        // TODO cacheLong()
      },
    },
  );
}

export default function Page() {
  const {page, faq, hero, installation} = useLoaderData();
  let parsed_faq, parsed_installation, parsed_hero;
  if(faq) {
    parsed_faq = JSON.parse(faq?.value);
  }
  if(hero) {
    parsed_hero = JSON.parse(hero?.value);
  }
  if(installation) {
    parsed_installation = JSON.parse(installation?.value);
  }
  return (
    <>      
      <PageHeader heading={page.title}>
        {page.handle == 'faq' && (<Faq data={parsed_faq} />)}
        {page.handle == 'purifier' && (
          
          <Purifier installation={parsed_installation} hero={parsed_hero}/>
        )}
      </PageHeader>
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
          { namespace: "global", key: "hero" }
        ]
      ) {
        value
        key
      }
    }
  }
`;
