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
        window.addEventListener("scroll", function() { 
            const recthidestickyatfooter = hidestickyatfooter.getBoundingClientRect();
            if(recthidestickyatfooter.bottom < 0){
                setIsSticky(false)
            }
        });
    }, []);
        
    return(
        <>     
            {isSticky && <div className="stickybar_main_section">
                <div className="container mx-auto">
                    <div className="stickybar_main_section_inner">
                        <div className="sticky_image_wrapper">
                            <img src={stickybarbottom.image} />
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
        </>
    )
}