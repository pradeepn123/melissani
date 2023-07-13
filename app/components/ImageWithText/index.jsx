import {FilterClubTextSection} from './FilterClubTextSection';
import {ContaminantTextSection} from './ContaminantTextSection';
import {DiscoverTextSection} from './DiscoverTextSection';
import {ImageSection} from './ImageSection';
import {PurityTextSection} from './PurityTextSection';
import {TemperatureTextSection} from './TemperatureTextSection';
import {VolumeTextSection} from './VolumeTextSection';

export function ImageWithText({ goodbye, alignment, filterClub, discover, className, learnMore, temperature, id, volume, filterclubwarrenty, reverseOsmosis, design, capacity, labTest }) {
  return <>
  <section className={`w-full gap-4 md:gap-8 items-center ${goodbye || filterClub ? "xl:flex gb_bg_color" : ""} ${className && className}`} id={temperature && `${id}`}>
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
        <ImageSection data={filterClub}/>
      </> : <>
        <ImageSection data={filterClub}/>
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
    {
      temperature && <>
        { alignment == "rtl" ? <>
          <TemperatureTextSection data={temperature} />
          <ImageSection data={temperature}/>
        </> : <>
          <ImageSection data={temperature}/>
          <TemperatureTextSection data={temperature} />
        </>
        }
      </>
    }
    {
      filterclubwarrenty && <>
        { alignment == "rtl" ? <>
          <TemperatureTextSection data={filterclubwarrenty} />
          <ImageSection data={filterclubwarrenty}/>
        </> : <>
          <ImageSection data={filterclubwarrenty}/>
          <TemperatureTextSection data={filterclubwarrenty} />
        </>
        }
      </>
    }
    {
      volume && <>
        { alignment == "rtl" ? <>
          <VolumeTextSection data={volume} />
          <ImageSection data={volume}/>
        </> : <>
          <ImageSection data={volume}/>
          <VolumeTextSection data={volume} />
        </>
        }
      </>
    }
    {
      reverseOsmosis && <>
        { alignment == "rtl" ? <>
          <VolumeTextSection data={reverseOsmosis} />
          <ImageSection data={reverseOsmosis}/>
        </> : <>
          <ImageSection data={reverseOsmosis}/>
          <VolumeTextSection data={reverseOsmosis} />
        </>
        }
      </>
    }
    {
      design && <>
        { alignment == "rtl" ? <>
          <TemperatureTextSection data={design} />
          <ImageSection data={design}/>
        </> : <>
          <ImageSection data={design}/>
          <TemperatureTextSection data={design} />
        </>
        }
      </>
    }
    {
      capacity && <>
        { alignment == "rtl" ? <>
        <VolumeTextSection data={capacity} />
          <ImageSection data={capacity}/>
        </> : <>
          <ImageSection data={capacity}/>
          <VolumeTextSection data={capacity} />
        </>
        }
      </>
    }
    {
      labTest && <>
        { alignment == "rtl" ? <>
          <TemperatureTextSection data={labTest} />
          <ImageSection data={labTest}/>
        </> : <>
          <ImageSection data={labTest}/>
          <TemperatureTextSection data={labTest} />
        </>
        }
      </>
    }
  </section>
  {filterClub?.membershipText?.length > 0 && <div
    className="filter-club-anouncement"
    dangerouslySetInnerHTML={{ __html: filterClub?.membershipText[0].text}}
  ></div>}
  </>
}