import Flickity from 'react-flickity-component'

export function MediaGallery({ data }) {

    return <section className="media-gallery">
        <div className="product__media-sticky image-carousel">
            <Flickity
                options={{initialIndex: 2}}
                pageDots="true"
                prevNextButtons="true"
            >
                {data && data.map((item, index) => <div
                    className="slider"
                    key={`product-gallery-${index}`}
                >
                    <img src={item.image.url} />
                </div>)}
            </Flickity>
        </div>
    </section>
}
