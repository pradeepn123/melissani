import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';

var interval = null;
export function TextCarousel ({data}) {

    const [slideIndex, setSlideIndex] = useState(1)

    const showSlides = (n) => {
        var i;
        var slides = document.getElementsByClassName("slideBlocks");
        var dots = document.getElementsByClassName("dot");

        // if (n > slides.length) {
        //     if (interval) {
        //         clearInterval(interval)
        //     }
        //     return setSlideIndex(1)
        // }

        // if (n < 1) {
        //     if (interval) {
        //         clearInterval(interval)
        //     }
        //     return setSlideIndex(slides.length)
        // }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex - 1].className += " active";
        // if (interval) {
        //     clearInterval(interval)
        // }
        // interval = setInterval(function(){ 
        //     setSlideIndex(slideIndex + 1)
        // }, 10000000)
    }

    useEffect(() => {
        showSlides(slideIndex)
    }, [slideIndex])
    
    return <motion.section 
            initial={{ opacity: 0, transform: "translateY(60px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            animate="visible"
            transition={{
            ease: "easeInOut",
            duration: 0.8,
                x: { duration: 1 }
            }}
            exit={{ opacity: 0, transform: "translateY(60px)" }}
            className="main_purifier_carousel" id="purifier_learn_more"
        >
            <div className="container mx-auto">
                <div className="main_purifier_carousel_inner_wrap">
                    <div className="flex flex-col-reverse xl:flex-row">
                        <div className="puri_slider xl:w-6/12 slideshow-container">
                            <ul>
                                {data && data.map((item, index) => <li
                                    key={`slideshow-container-${index}`}
                                    className="dot"
                                    onClick={() => setSlideIndex(index + 1)}
                                >
                                    <span>{item.heading}</span>
                                </li>)}
                            </ul>
                        </div>

                        <div className="sliderThumbnail xl:w-6/12 dot-container">
                            {data && data.map((item, index) => <div
                                className="slideBlocks"
                                key={`dot-container-${index}`}
                            >
                                <h2>{item.subHeading}</h2>
                                <p>{item.description}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
}