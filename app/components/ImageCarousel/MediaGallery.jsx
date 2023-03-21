import Flickity from 'react-flickity-component'

export function MediaGallery({ data }) {

    return <section className="media-gallery">
        <div className="product__media-sticky image-carousel">
            <Flickity
                pageDots="true"
                prevNextButtons="true"
                fade
                reloadOnUpdate
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
