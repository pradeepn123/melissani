import { Tabs } from 'flowbite-react';
import { FaqAccordion } from './FaqAccordion';
import FaqStyles from '~/components/Faq/Faq.css';

export const links = () => {
    return [
        { rel: 'stylesheet', href: FaqStyles }
    ]
}

export function Faq({ data }) {
    return (
        <>
            <section className='faq_section_wrapper w-full grid gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start'>
                <div className="container mx-auto">
                    <h2 className="main_content_heading font-bold pb-6 md:pb-16" tabIndex="0">{data.heading}</h2>
                    <Tabs.Group className='flex justify-between tabs_with_icons'
                        aria-label="Tabs with icons"
                    >
                        {(data?.tab_heading || []).map((item, index) => (
                            <Tabs.Item key={`faq-${index}`} active={true} title={
                                <div className='flex flex-col text-sm items-center text-[#1376BC] icon_with_text' role="button" tabIndex="0" aria-label={`Tab for ${item.text}`}>
                                    <img src={item.icon} alt={`${item.text} icon`} />
                                    <p className='tab__title font-extrabold text-base text-[#1376BC]'>{item.text}</p>
                                </div>
                            }>
                                <FaqAccordion item={item} />
                            </Tabs.Item>
                        ))}
                    </Tabs.Group>
                </div>
            </section>
        </>
    );
}
