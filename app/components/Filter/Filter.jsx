import {
  Hero,
  ImageWithText,
  VideoPlayer,
  Carousel
} from '~/components';

export function Filter({hero, carousel, filter_changes, video_section}) {
  return (
    <>
      {hero && (
        <Hero data={hero} id="filter-hero" height="full" top loading="eager" />
      )}

      {carousel && (
        <Carousel data={carousel} className="filter-carousel" height="full" top loading="eager" />
      )}

      {filter_changes && (
        <Hero data={filter_changes} id="filter-changes-hero" height="full" top loading="eager" />
      )}
      {video_section && (
        <VideoPlayer data={video_section} />
      )} 
    </>
  )
}