import {
  Hero,
  ImageCenterWithText,
  ImageWithText,
  VideoPlayer,
  Carousel
} from '~/components';

export function Filter({hero, carousel, video_section}) {
  console.log("hero: ", hero)
  return (
    <>
      {hero && (
        <Hero data={hero} id="filter-hero-text" height="full" top loading="eager" />
      )}

      {carousel && (
        <Carousel data={carousel} height="full" top loading="eager" />
      )}
      {/* {installation && (
        <ImageCenterWithText installation={installation} installationHeadingClassName="installation-header" installationParaClassName="installation-para" />
      )}
      {temperature && (
        <ImageWithText temperature={temperature} temperatureClassName={"flex text-main-section"} height="full" top loading="eager" />
      )}
      {volume && (
        <ImageWithText volume={volume} volumeClassName={"flex volume-main-section"} alignment="rtl" height="full" top loading="eager" />
      )}
      {video_section && (
        <VideoPlayer data={video_section} />
      )} */}
    </>
  )
}