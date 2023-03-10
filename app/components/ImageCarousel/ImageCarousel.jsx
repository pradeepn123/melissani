import Flickity from 'react-flickity-component'

export function ImageCarousel({ data, className }) {
    console.log("img car..", data)
    return (
        <section className={`image-carousel md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-1 ${className}`} >
            <Flickity
                pageDots="true"
                prevNextButtons="true"

                >
                {data && data.map((item, index) =>
                    <div className="slider" key={index}>
                        <img src={item.image.url} />
                    </div>
                )}
            </Flickity>
        </section>
    )
}