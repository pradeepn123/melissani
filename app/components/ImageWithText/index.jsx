import {FilterClubTextSection} from './FilterClubTextSection';
import {GoodbyeTextSection} from './GoodbyeTextSection';
import {ImageSection} from './ImageSection';

export function ImageWithText({ goodbye, alignment, className, filterClub }) {
  return <section className={`w-full xl:flex gap-4 md:gap-8 items-center ${className && className} ${goodbye ? "gb_bg_color" : ""}`}>
    {goodbye && <>
      {alignment == "rtl" ? <>
        <GoodbyeTextSection data={goodbye} />
        <ImageSection data={goodbye}/>
      </>: <>
        <ImageSection data={goodbye}/>
        <GoodbyeTextSection data={goodbye} />
      </>}</>
    }
    {filterClub && <>
        {alignment == "rtl" ? <>
        <FilterClubTextSection filterClub={filterClub}/>
        <ImageSection data={filterClub}/>
      </> : <>
        <ImageSection data={filterClub}/>
        <FilterClubTextSection filterClub={filterClub} />
      </>}</>
    }
  </section>
}