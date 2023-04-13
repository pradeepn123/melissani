import {
  Hero,
  ImageCenterWithText,
  ImageWithText,
  VideoPlayer,
  TextCarousel,
  StickyBarBottom
} from '~/components';

export function Purifier({installation, hero, temperature, volume, video_section, carousel, stickybarbottom}) {
      
    return (
      <>
        {hero && (
            <Hero data={hero} id="purifier-hero" height="full" top loading="eager" />
        )}
        {installation && (
            <ImageCenterWithText id="purifier_plumber_free" installation={installation} installationHeadingClassName="installation-header" installationParaClassName="installation-para" />
        )}
        {temperature && (
            <ImageWithText temperature={temperature} className={"flex text-main-section"} id="temperature-control-section" height="full" top loading="eager" />
        )}
        {volume && (
            <ImageWithText volume={volume} className={"flex volume-main-section"} alignment="rtl" height="full" top loading="eager" />
        )}
        {video_section && (
          <VideoPlayer data={video_section} />
        )}
        {carousel && (
          <TextCarousel data={carousel} className="purifier-carousel" height="full" top loading="eager" />
        )}        
        {stickybarbottom && (
          <StickyBarBottom stickybarbottom={stickybarbottom}/>
        )}
      </>
    )
}