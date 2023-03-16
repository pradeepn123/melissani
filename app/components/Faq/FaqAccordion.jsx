import { Accordion } from 'flowbite-react';

export function FaqAccordion({ item }) {
    return <Accordion flush={true} className="xl:w-8/12 pt-6 xl:pt-8">
        {(item?.contentinfo || []).map((content, index) => (
            <Accordion.Panel key={`faq-${index}`}>
                <Accordion.Title className='py-4 accordion_heading md:text-3xl text-lg w-4/5 md:font-text-28 font-bold text-[#000000]'>
                    {content.question}
                </Accordion.Title>
                <Accordion.Content className='custom_content'>                                        
                    <p className="font-normal md:text-2xl text-base md:font-text-22 text-[#000000]">
                        {content.answer}
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        ))}
    </Accordion>
}