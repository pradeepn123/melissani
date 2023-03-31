import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from '@shopify/hydrogen';
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function MediaGallery({ data }) {

    return <section className="media-gallery">
        <div className="product__media-sticky image-carousel">
            <>
                <Swiper
                    spaceBetween={0}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {data && data.map((item, index) => <div
                        className="slider"
                        key={`product-gallery-${index}`}
                    >
                        <SwiperSlide>
                            <Image
                                alt={`product-gallery-image${index}`}
                                data={item.image}
                            />
                        </SwiperSlide>

                    </div>)}
                </Swiper>
            </>
        </div>
    </section>
}
