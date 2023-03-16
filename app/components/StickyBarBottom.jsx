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
        const hidestickyatfooter = document.querySelector(".footer-wrapper");
        // let footerMinus = document.body.scrollHeight - hidestickyatfooter.offsetHeight;
        // let stickybarheight = document.querySelector('#js_stickybar_main_section');
        // let wrapper = document.querySelector('.min-h-screen');
        // let position = (stickybarheight.offsetHeight + stickybarheight.getBoundingClientRect().y - wrapper.getBoundingClientRect().y).toFixed(1);
        window.addEventListener("scroll", function() { 
            if(footerMinus > position){
                stickybarheight.style.visibility = "visible";
            }else {
                stickybarheight.style.visibility = "hidden";
            }
            const recthidestickyatfooter = hidestickyatfooter.getBoundingClientRect();
            if(recthidestickyatfooter.bottom < 0){
                setIsSticky(false)
            }
        });
    }, []);
        
    return(
        <>     
            <div className="" id='js_stickybar_main_section'>
                {isSticky && <div className="stickybar_main_section">
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