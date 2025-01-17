import {useEffect} from 'react';
import {useFetcher} from '@remix-run/react';
import {FeaturedCollections} from './FeaturedCollections';
import {ProductSwimlane} from './ProductSwimlane/ProductSwimlane';
import {usePrefixPathWithLocale} from '~/lib/utils';

export function FeaturedSection() {
  const {load, data} = useFetcher();
  const path = usePrefixPathWithLocale('/featured-products');

  useEffect(() => {
    load(path);
  }, [load, path]);

  if (!data) return null;

  const {featuredCollections, featuredProducts} = data;

  return (
    <>
      {featuredCollections.length < 2 && (
        <FeaturedCollections
          title="Popular Collections"
          collections={featuredCollections}
        />
      )}
      <ProductSwimlane products={featuredProducts} />
    </>
  );
}
