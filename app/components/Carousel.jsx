import Flickity from 'react-flickity-component'

export function Carousel({advancedFiltration}) {
  return (
    <Flickity
    pageDots="false">
      {advancedFiltration && advancedFiltration.map((item, index) =>
        <>
        <div className="slider" key={index}>
            <div className="left-slider-content">
                <h2 className="slider-heading">
                    {item.heading}
                </h2>
                <h3 className="slider-sub-heading">
                    {item.subHeading}
                </h3>
                <p className="slider-description">
                    {item.description}
                </p>
            </div>
            <div className="right-slider-content">
                <img className="slider-image" src={item.image} alt={item.heading}/>
            </div>
        </div>
        </>
        )}
    </Flickity>
)}