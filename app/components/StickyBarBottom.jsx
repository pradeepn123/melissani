import {useEffect, useState} from 'react';
import {Button} from '~/components';

export function StickyBarBottom({stickybarbottom}) {
    const [isSticky, setIsSticky] = useState(false);
    var stickyFloat;
    var footer;
    
    const handleWindowScroll = () => {
        const stickybar = document.querySelector(".hero");
        if (stickybar) {
            const rect = stickybar.getBoundingClientRect();
            if (rect.bottom < 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }
    }

    function checkOffset() {        
        function getRectTop(el){
            var rect = el.getBoundingClientRect();
            return rect.top;
        }
        
        if((getRectTop(stickyFloat) + document.body.scrollTop) + stickyFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10) {
            stickyFloat.style.transform = 'translateY(calc(100% + 30px))';
        }
        if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)){
            stickyFloat.style.transform = 'translateY(0)';
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleWindowScroll);
        stickyFloat = document.querySelector('.stickybar_main_section');
        footer = document.querySelector('footer');

        window.addEventListener("scroll", function () {
            handleWindowScroll();
            checkOffset();
        });
        return () => {
            window.removeEventListener("scroll", handleWindowScroll)
        }
    }, []);

    useEffect(() => {
        const body = document.querySelector("body")
        const header = document.querySelector(".main_header")
        if (isSticky) {
            header.classList.add('is-hidden')
            body.classList.add("sticky-footer-attached")
        } else {
            header.classList.remove('is-hidden')
            body.classList.remove("sticky-footer-attached")
        }
        return () => {
            header.classList.remove('is-hidden')
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
                                    <Button className="rounded-full text-center py-3 px-9 border border-primary bg-primary text-[#ffffff]">
                                        {stickybarbottom.button_label}
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}