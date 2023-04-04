import {
    Hero,
    ImageWithText,
    FilterClubSupportInfo,
    TextWithButton,
    StickyBarBottom,
    KeyFeatures
} from '~/components';

import { FaqAccordion } from '../Faq/FaqAccordion';

import { motion } from 'framer-motion';

  
export function FilterClub({hero, supportinfo, textwithbutton, stickybarbottom, data, filterclubwarrenty, features}) {
      return (
        <>
            {hero && (
                <Hero data={hero} height="full" id="filter_membership_hero" top loading="eager" />
            )}

            {features && (
                <KeyFeatures features={features} className="filter-features" />
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

            {(data?.tab_heading || []).map((item, index) => (<motion.div 
                initial={{ opacity: 0, transform: "translateY(60px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                animate="visible"
                transition={{
                    ease: "easeInOut",
                    duration: 0.8,
                    x: { duration: 1 }
                }}
                exit={{ opacity: 0, transform: "translateY(60px)" }}
                className='filter_club_faq w-full' key={`faq-${index}`}
                key={`tab-heading-${index}`}
            >
                <h2 className='filter_club_main_heading'>{item.text}</h2>
                <FaqAccordion item={item} />
                <div className="filterclub_extra_information">
                    <p>{item.filterclub_extra_info}</p>
                    <a href={item.filterclub_extra_link}>{item.filterclub_extra_label}</a>
                </div>
            </motion.div>))}

            {stickybarbottom && <StickyBarBottom
                stickybarbottom={stickybarbottom}
            />}
        </>
    )
}
