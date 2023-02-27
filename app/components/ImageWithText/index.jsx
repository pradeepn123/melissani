import {FilterClubTextSection} from './FilterClubTextSection';
import {GoodbyeTextSection} from './GoodbyeTextSection';
import {ImageSection} from './ImageSection';
import {LearnMoreSection} from './LearnMoreSection';
import {Link} from '../Link';

export function ImageWithText({ goodbye, alignment, className, filterClub,learnMore }) {
  return <>
  <section className={`w-full gap-4 md:gap-8 items-center ${className && className} ${goodbye ? "gb_bg_color" : ""}`}>
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
            <ImageSection data={filterClub} filterClassName={"filter-club-img"}/>
            <FilterClubTextSection filterClub={filterClub} />
          </> : <>
            <FilterClubTextSection filterClub={filterClub}/>
            <ImageSection data={filterClub} filterClassName={"filter-club-img"}/>
      
          </>}</>
        }
        {
          learnMore && <div className="learn-more w-full flex">
          {
           <>
              { alignment == "rtl" ?
               <>
                  <ImageSection data={learnMore} /> 
                  <LearnMoreSection data={learnMore}/>
                </> : <>
                  <LearnMoreSection data={learnMore}/>
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
    <b>1468+</b> customers have joined <b>FILTER CLUB MEMBERSHIP</b> and saving $150/yr <Link to={filterClub.subscribeBtnLink}><b><u>JOIN NOW</u></b></Link>
  </div>}


  </>
}