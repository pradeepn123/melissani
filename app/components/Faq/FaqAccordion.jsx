import { useEffect, useState, useRef } from 'react';

export function FaqAccordion({ item }) {
    const accordionMain = useRef(null);
    useEffect(() => {
        var acc = accordionMain.current.querySelectorAll(".accordion-title");
        for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
               let accordior_open = this.parentNode.classList.contains("accordion-open")
                for (let li of acc) {
                    li.parentNode.classList.remove('accordion-open');
                }
             !accordior_open && this.parentNode.classList.add('accordion-open');
            });
        }
    }, []);

    return (
        <>
            <div className="accordion-main xl:w-8/12 sm:pt-0 xl:pt-0" ref={accordionMain} itemScope itemType="https://schema.org/FAQPage">
                {(item?.contentinfo || []).map((content, index) => (
                    <div className="accordion-item" key={`faq-${index}`} itemScope itemType="https://schema.org/Question">
                        <div className="accordion-title pt-4 pb-3 accordion_heading md:text-3xl text-lg md:font-text-28 font-bold text-[#000000]">
                            <h5 itemProp="name">{content.question}</h5>
                            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.25 0.749965C11.2713 0.749964 0.750002 11.2713 0.750001 24.25C0.75 37.2287 11.2713 47.75 24.25 47.75C37.2287 47.75 47.75 37.2287 47.75 24.25C47.75 11.2713 37.2287 0.749965 24.25 0.749965Z" stroke="#1B2943" strokeWidth="1.5" />
                                <path d="M31.5234 21.8266L24.2484 29.1016L16.9734 21.8266" stroke="#1B2943" strokeWidth="2.425" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="accordion-body custom_content" itemScope itemType="https://schema.org/Answer">
                            <p className="font-normal md:text-xl text-base text-[#000000]" itemProp="text">
                                {content.answer} {content.link_text && content.link_url  && <a href={content.link_url}><span className="link-text"> {content.link_text} </span></a>}
                            </p>
                            {content.list && <ul className="font-normal md:text-xl text-base text-[#000000]">
                                {content.list.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>}
                        </div>
                        <meta itemProp="acceptedAnswer" content={`{
                            "@type": "Answer",
                            "text": "${content.answer}"
                        }`} />
                    </div>
                ))}
            </div>
        </>
    )
}
