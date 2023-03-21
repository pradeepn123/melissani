import {
  Hero,
  ImageWithText,
  VideoPlayer,
  Carousel,
  BackgroundImgWithText,
  StickyBarBottom
} from '~/components';

export function Filter({hero, carousel, filter_changes, filterreplacementcycle, video_section, stickybarbottom}) {
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

      {filterreplacementcycle && (
        <BackgroundImgWithText filterreplacementcycle={filterreplacementcycle} className="md:flex filter-club-flex filter_replacement_cycle"/>
      )}

      {video_section && (
        <VideoPlayer data={video_section} />
      )} 
      {stickybarbottom && (
        <StickyBarBottom stickybarbottom={stickybarbottom}/>
      )}
    </>
  )
}