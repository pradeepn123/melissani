import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from '@shopify/hydrogen';
import {Navigation, Pagination} from "swiper";


export function MediaGallery({ data }) {

    return <section className="media-gallery">
        <div className="product__media-sticky image-carousel">
            <Swiper
                spaceBetween={10}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                cssMode = {true}
                shortSwipes = {true}
                longSwipes = {false}
                lazyPreloadPrevNext = {10}
                modules={[ Navigation, Pagination]}
                className="mySwiper"
            >
                {data && data.map((item, index) => <div
                    className={`product-gallery-${index} slider`}
                    key={`product-gallery-${index}`}
                >
                    <SwiperSlide key={`product-gallery-${index}`}>
                        <Image
                            alt={`product-gallery-image${index}`}
                            data={item.image}
                        />
                    </SwiperSlide>
                </div>)}
            </Swiper>
        </div>
    </section>
}