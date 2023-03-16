import {
    Hero,
    ImageWithBlockOverlay,
    ImageWithText,
    FilterClubSupportInfo,
    TextWithButton,
    StickyBarBottom
} from '~/components';
import { FaqAccordion } from '../Faq/FaqAccordion';
  
  export function FilterClub({hero, filterclub, supportinfo, textwithbutton, stickybarbottom, data, filterclubwarrenty}) {
      return (
        <>
            {hero && (
                <Hero data={hero} height="full" id="filter_membership_hero" top loading="eager" />
            )}
            
            {filterclub && (
                <ImageWithBlockOverlay filterclub={filterclub} height="full" top loading="eager" />
            )}

            {filterclubwarrenty && (
                <ImageWithText filterclubwarrenty={filterclubwarrenty} id="filterclub_learnmore_sec" className={"flex text-main-section filterclub_learnmore_sec relative"} height="full" top loading="eager" />
            )}
            
            {supportinfo && (
                <FilterClubSupportInfo filterclubsupportinfo={supportinfo} height="full" top loading="eager" />
            )}

            {textwithbutton && (
                <TextWithButton textwithbutton={textwithbutton} height="full" top loading="eager" />
            )}

            {(data?.tab_heading || []).map((item, index) => (
                <>
                    <div className='filter_club_faq w-full' key={`faq-${index}`}>
                        <h2 className='filter_club_main_heading'>{item.text}</h2>
                        <FaqAccordion item={item} />
                        <div className="filterclub_extra_information">
                            <p>{item.filterclub_extra_info}</p>
                            <a href={item.filterclub_extra_link}>{item.filterclub_extra_label}</a>
                        </div>
                    </div>
                </>
            ))}

            {stickybarbottom && ( 
                <StickyBarBottom stickybarbottom={stickybarbottom}/>
            )}
            
        </>
      )
  }