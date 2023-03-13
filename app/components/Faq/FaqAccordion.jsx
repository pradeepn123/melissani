import { Accordion } from 'flowbite-react';

export function FaqAccordion({ item }) {
    return <Accordion flush={true} className="w-8/12 pt-14">
        {(item?.contentinfo || []).map((content, index) => (
            <Accordion.Panel key={`faq-${index}`}>
                <Accordion.Title className='py-4 accordion_heading'>
                    <h2 className='text-3xl w-4/5 font-text-28 font-bold text-[#000000]'>{content.question}</h2>
                </Accordion.Title>
                <Accordion.Content className='custom_content'>                                        
                    <p className="font-normal text-2xl font-text-22 text-[#000000]">
                        {content.answer}
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        ))}
    </Accordion>
}