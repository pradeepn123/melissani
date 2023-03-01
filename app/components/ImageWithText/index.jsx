import {FilterClubTextSection} from './FilterClubTextSection';
import {ContaminantTextSection} from './ContaminantTextSection';
import {DiscoverTextSection} from './DiscoverTextSection';
import {ImageSection} from './ImageSection';
import {PurityTextSection} from './PurityTextSection';
import {Link} from '../Link';

export function ImageWithText({ goodbye, alignment, filterClassName, filterClub, discover, discoverClassName, learnMore }) {
  const membershipText = filterClub?.membershipText[0].text.split(" ");
  return <>
  <section className={`w-full gap-4 md:gap-8 items-center ${filterClassName && filterClassName} ${goodbye ? "xl:flex gb_bg_color" : ""} ${discoverClassName && discoverClassName}`}>
    {goodbye && <>
      {alignment == "rtl" ? <>
        <ContaminantTextSection data={goodbye} />
        <ImageSection data={goodbye}/>
      </>: <>
        <ImageSection data={goodbye}/>
        <ContaminantTextSection data={goodbye} />
      </>}</>
    }
    {filterClub && <>
        {alignment == "rtl" ? <>
        <FilterClubTextSection filterClub={filterClub}/>
        <ImageSection data={filterClub} filterClassName={"filter-club-img"}/>
      </> : <>
        <ImageSection data={filterClub} filterClassName={"filter-club-img"}/>
        <FilterClubTextSection filterClub={filterClub} />
      </>}</>
    }
    {discover && <>
      {alignment == "rtl" ? <>
        <DiscoverTextSection discover={discover} />
        <ImageSection data={discover}/>
      </> : <>
        <ImageSection data={discover}/>
        <DiscoverTextSection discover={discover} />
      </>}
    </>}
    {
      learnMore && <div className="learn-more w-full flex">
      {
        <>
          { alignment == "rtl" ?
            <>
              <ImageSection data={learnMore} /> 
              <PurityTextSection data={learnMore}/>
            </> : <>
              <PurityTextSection data={learnMore}/>
              <ImageSection data={learnMore}/> 
            </>
          }
          </>
        }
        </div>
    }
  </section>
  {filterClub && 
    <div className="filter-club-anouncement">
      <b>1468+</b> customers have joined <b>FILTER CLUB MEMBERSHIP</b> and saving $150/yr <Link to={filterClub.subscribeBtnLink}><b><u>Join Now</u></b></Link>
    </div>
  }
  </>
}