import {useEffect} from 'react';
import { RightArrow } from '~/components';
import { motion } from 'framer-motion';

export function ImageWithBlockOverlay({filterclub}) {

    useEffect(() => {
        var header = document.getElementById("image_with_block_sec");
        var btns = header.getElementsByClassName("image_with_block_sec_inner");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }        
    }, []);
        
    return (
        <motion.section
            initial={{ opacity: 0, transform: "translateY(60px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            animate="visible"
            transition={{
            ease: "easeInOut",
            duration: 0.8,
                x: { duration: 1 }
            }}
            exit={{ opacity: 0, transform: "translateY(60px)" }}
        >
            <div className="image_with_block_sec" id='image_with_block_sec'>
                <div className="mx-auto">
                    <div className="flex flex-col xl:flex-row">
                    {(filterclub?.imagewithblockoverlay || []).map((content, index) => (
                        <div className={`image_with_block_sec_inner xl:w-4/12 ${index == 0 ? 'active' : '' }`} key={`imagewithblockoverlay-${index}`}>
                            <div className="image_wrapper_filter">
                                <img src={content.image} alt="" className="w-full" />
                            </div>
                            <figcaption className="card_overlay__first">
                                <div className="card__header_first">
                                    <h2 className='gap-4'>{content.heading}<span className='right_arrow_icon'><RightArrow /></span></h2>
                                </div>
                            </figcaption>
                            <figcaption className="card_overlay">
                                <div className="card__description">
                                    <p>{content.description}</p>
                                </div>
                                <div className="card__header">
                                    <h2 className='gap-4'>{content.heading}<span className='right_arrow_icon right_rotate_arrow_icon'><RightArrow /></span></h2>
                                </div>
                            </figcaption>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
