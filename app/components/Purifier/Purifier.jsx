import { Hero } from '~/components';
import { ImageCenterWithText } from '~/components';

export function Purifier({installation, hero}) {
    return (
      <>
        {hero && (
            <Hero hero={hero} height="full" top loading="eager" />
        )}
        {installation && (
            <ImageCenterWithText installation={installation} installationHeadingClassName="installation-header" installationParaClassName="installation-para" />
        )}
      </>
    )
}