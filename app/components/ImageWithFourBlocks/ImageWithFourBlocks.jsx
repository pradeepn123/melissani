import {FourBlocksSection} from './FourBlocksSection';
import {ImageSection} from '../ImageWithText/ImageSection';

export function ImageWithFourBlocks({ advancedFiltration, className, alignment }) {
  return <section className={`w-full gap-0 md:gap-0 items-center ${className && className}`}>
    {advancedFiltration && <>
      {alignment == "rtl" ? <>
      {console.log("advancedFiltration", advancedFiltration)}
        <FourBlocksSection data={advancedFiltration} />
        <ImageSection data={advancedFiltration} className="four-blocks-image" />
      </>: <>
        <ImageSection data={advancedFiltration} className="four-blocks-image" />
        <FourBlocksSection data={advancedFiltration} />
      </>}</>
    }
  </section>
}