import clsx from 'clsx';
import {Heading, Text, Link} from '~/components';

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero({
  handle,
  height,
  top,
  metafields
}) {
  const data = metafields && JSON.parse(metafields.value)
  return (
    <Link to={`/collections/${handle}`}>
      <section
        className={clsx(
          'relative justify-end flex flex-col w-full',
          top && '-mt-nav',
          height === 'full'
            ? 'h-screen'
            : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]',
        )}
      >
        <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
          {data?.heading && (
            <Heading format as="h2" size="display" className="max-w-md">
              {data.heading}
            </Heading>
          )}
          {data?.cta && <Text size="lead">{data.cta}</Text>}
        </div>
      </section>
    </Link>
  );
}
