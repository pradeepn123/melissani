import {
    Hero
} from '~/components';
import { FaqAccordion } from '../Faq/FaqAccordion';
  
  export function FilterClub({hero, data}) {
      return (
        <>
            {hero && (
                <Hero data={hero} height="full" top loading="eager" />
            )}

            {(data?.tab_heading || []).map((item, index) => (
                <>
                    <div className='filter_club_faq w-full pt-8 px-6 lg:pt-16 md:px-8 lg:px-12' key={`faq-${index}`}>
                        <h2>{item.text}</h2>
                        <FaqAccordion item={item} /> 
                    </div>
                </>
            ))}
        </>
      )
  }