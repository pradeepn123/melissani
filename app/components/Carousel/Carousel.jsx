import Flickity from 'react-flickity-component';
import { motion } from 'framer-motion';

export function Carousel({ data, className }) {
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
                pageDots="false">
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