import { Tabs } from 'flowbite-react';
import { Accordion } from 'flowbite-react';

export function Faq({metafields}) {
    const data = JSON.parse(metafields.find(metafield => metafield.key == "qna").value)
    console.log(data)
    return (
      <>
        <section className='faq_section_wrapper w-full'>
            <div className="container mx-auto">
                <h2 className="main_content_heading pb-16">{data.heading}</h2>
                <Tabs.Group className='flex justify-between'
                    aria-label="Tabs with icons"                    
                    >
                    {(data?.tab_heading || []).map((item, index) => (
                        <Tabs.Item key={`faq-${index}`} active={true} title={<div className='flex flex-col text-sm items-center text-[#1376BC] icon_with_text'><img src={item.icon} alt=''/><p>{item.text}</p></div>}>
                            <Accordion flush={true} className="w-8/12">
                                {(item?.contentinfo || []).map((content, index) => (
                                    <Accordion.Panel key={`faq-${index}`}>
                                        <Accordion.Title>
                                            <h2 className='text-3xl w-4/5 py-4 font-bold text-[#000000]'>{content.question}</h2>
                                        </Accordion.Title>
                                        <Accordion.Content className='custom_content'>                                        
                                            <p className="font-normal text-2xl text-[#000000]">
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