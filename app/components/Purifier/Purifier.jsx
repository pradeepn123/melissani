import {
  Hero,
  ImageCenterWithText,
  ImageWithText,
  VideoPlayer
} from '~/components';

export function Purifier({installation, hero, temperature, volume, video_section}) {
    return (
      <>
        {hero && (
            <Hero data={hero} id="purifier-hero" height="full" top loading="eager" />
        )}
        {installation && (
            <ImageCenterWithText installation={installation} installationHeadingClassName="installation-header" installationParaClassName="installation-para" />
        )}
        {temperature && (
            <ImageWithText temperature={temperature} className={"flex text-main-section"} height="full" top loading="eager" />
        )}
        {volume && (
            <ImageWithText volume={volume} className={"flex volume-main-section"} alignment="rtl" height="full" top loading="eager" />
        )}
        {video_section && (
          <VideoPlayer data={video_section} />
        )}
      </>
    )
}