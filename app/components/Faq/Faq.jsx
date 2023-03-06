import { Tabs } from 'flowbite-react';
import { Accordion } from 'flowbite-react';

export function Faq({data}) {
    return (
      <>
        <section className='faq_section_wrapper w-full grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start'>
            <div className="container mx-auto">
                <h2 className="main_content_heading font-sfpro font-bold pb-16">{data.heading}</h2>
                <Tabs.Group className='flex justify-between tabs_with_icons'
                    aria-label="Tabs with icons"                    
                    >
                    {(data?.tab_heading || []).map((item, index) => (
                        <Tabs.Item key={`faq-${index}`} active={true} title={<div className='flex flex-col text-sm items-center text-[#1376BC] icon_with_text'><img src={item.icon} alt=''/><p className='font-sfpro font-extrabold tracking-wider text-base text-[#1376BC]'>{item.text}</p></div>}>
                            <Accordion flush={true} className="w-8/12 pt-14">
                                {(item?.contentinfo || []).map((content, index) => (
                                    <Accordion.Panel key={`faq-${index}`}>
                                        <Accordion.Title>
                                            <h2 className='text-3xl font-sfpro w-4/5 font-text-28 font-bold text-[#000000]'>{content.question}</h2>
                                        </Accordion.Title>
                                        <Accordion.Content className='custom_content'>                                        
                                            <p className="font-normal font-sfpro text-2xl font-text-22 text-[#000000]">
                                                {content.answer}
                                            </p>
                                        </Accordion.Content>
                                    </Accordion.Panel>
                                ))}
                            </Accordion>
                        </Tabs.Item>
                    ))}
                </Tabs.Group>
            </div>
        </section>
      </>
    );
  }