import { Accordion } from 'flowbite-react';

export function FaqAccordion({ item }) {
    return <Accordion flush={true} className="md:w-8/12 pt-8 md:pt-14">
        {(item?.contentinfo || []).map((content, index) => (
            <Accordion.Panel key={`faq-${index}`}>
                <Accordion.Title className='py-4 accordion_heading'>
                    <h2 className='md:text-3xl text-lg w-4/5 md:font-text-28 font-bold text-[#000000]'>{content.question}</h2>
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