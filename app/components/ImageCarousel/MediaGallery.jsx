import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from '@shopify/hydrogen';
import {Navigation, Pagination} from "swiper";


export function MediaGallery({ data }) {

    return <section className="media-gallery">
        <div className="product__media-sticky image-carousel">
            <Swiper
                spaceBetween={0}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                // speed={1200}
                // cssMode = {true}
                // lazyPreloadPrevNext = {10}
                modules={[ Navigation, Pagination]}
                className="mySwiper"
            >
                {data && data.map((item, index) => <div
                    className={`product-gallery-${index} slider`}
                    key={`product-gallery-${index}`}
                >
                    <SwiperSlide key={`product-gallery-${index}`}>
                        <img
                            alt={`product-gallery-image${index}`}
                            src={item.image.url}
                        />
                    </SwiperSlide>
                </div>)}
            </Swiper>
        </div>
    </section>
}
