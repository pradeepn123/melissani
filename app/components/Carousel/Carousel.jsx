import Flickity from 'react-flickity-component'

export function Carousel({ data, className }) {
  return (
    <section className={`${className ? 'carousel-wrapper ' + className : 'carousel-wrapper'}`} id={className} data-aos="fade-up">
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
      </section>
)}