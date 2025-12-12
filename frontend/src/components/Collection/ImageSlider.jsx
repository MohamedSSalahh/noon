import React, { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageSlider = ({ slider }) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    if (!slider) return null;

    return (
        <div className="w-full relative group md:px-8 mt-4">
             <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                className="w-full h-[200px] md:h-[300px] lg:h-[400px]"
            >
                { slider.sliderImgs.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Banner ${index + 1}`} className="w-full h-full object-cover md:rounded-lg" />
                    </SwiperSlide>
                )) }
            </Swiper>
            
            <button ref={navigationPrevRef} className="absolute top-1/2 left-4 z-10 -translate-y-1/2 w-12 h-12 bg-white shadow-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 text-noon-black">
                <i className="fa-solid fa-chevron-left text-lg"></i>
            </button>
            <button ref={navigationNextRef} className="absolute top-1/2 right-4 z-10 -translate-y-1/2 w-12 h-12 bg-white shadow-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 text-noon-black">
                <i className="fa-solid fa-chevron-right text-lg"></i>
            </button>
        </div>
    );
}

export default ImageSlider;
