import {useEffect, useState} from 'react';
import {Button} from '~/components';

export function StickyBarBottom({stickybarbottom}) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const stickybar = document.querySelector(".hero");
        window.addEventListener("scroll", function() {
            const rect = stickybar.getBoundingClientRect();
            if (rect.bottom < 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        });
    }, []);

    useEffect(() => {
        const body = document.querySelector("body")
        if (isSticky) {
            body.classList.add("sticky-footer-attached")
        } else {
            body.classList.remove("sticky-footer-attached")
        }
    }, [isSticky])

    return(
        <>     
            <div className="" id='js_stickybar_main_section'>
                {stickybarbottom && <div className={`stickybar_main_section ${isSticky == true ? 'is-shown' : 'is-hidden'}`}>
                    <div className="container mx-auto">
                        <div className="stickybar_main_section_inner">
                            <div className="sticky_image_wrapper">
                                <img className='hidden md:block' src={stickybarbottom.image} alt="" />
                                <h2>{stickybarbottom.heading}</h2>
                            </div>
                            <div className="sticky_button">
                                <a href={stickybarbottom.button_url}>
                                    <Button className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]">{stickybarbottom.button_label}</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}