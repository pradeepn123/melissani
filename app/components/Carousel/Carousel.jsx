import Flickity from 'react-flickity-component';
import { motion } from 'framer-motion';

export function Carousel({ data, className }) {
    var flkty = null;

    return (
    <section className={`${className ? 'carousel-wrapper ' + className : 'carousel-wrapper'}`} id={className}>
        <motion.div
        initial={{ opacity: 0, transform: "translateY(60px)" }}
        whileInView={{ opacity: 1, transform: "translateY(0px)" }}
        animate="visible"
        transition={{
        ease: "easeInOut",
        duration: 0.8,
            x: { duration: 1 }
        }}
        exit={{ opacity: 0, transform: "translateY(60px)" }}>
            <Flickity
                flickityRef={c => flkty = c}
                options={{
                    prevNextButtons: true
                }}
            >
                {data && data.map((item, index) =>
                    <div className="slider" key={index}>
                        <div className="left-slider-content">
                            <h2 className="slider-heading font-primary">
                                {item.heading}
                            </h2>
                            <h3 className="slider-sub-heading font-tertiary">
                                {item.subHeading}
                            </h3>
                            <p className="slider-description font-tertiary">
                                {item.description}
                            </p>
                            {/* <div className="flickity-button-wrapper">
                                <button className="flickity-button flickity-prev-next-button previous" onClick={() => flkty.previous()} disabled={index == 0}>
                                    <svg className="flickity-button-icon" viewBox="0 0 100 100">
                                        <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path>
                                    </svg>
                                </button>
                                <button className="flickity-button flickity-prev-next-button next" onClick={() => flkty.next()} disabled={index == data.length -1}>
                                    <svg className="flickity-button-icon" viewBox="0 0 100 100">
                                        <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180)"></path>
                                    </svg>
                                </button>
                            </div> */}
                        </div>
                        <div className="right-slider-content">
                            <img className="slider-image" src={item.image} alt={item.heading}/>
                        </div>
                    </div>
                )}
            </Flickity>
        </motion.div>
    </section>
)}