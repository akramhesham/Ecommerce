'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import Slider1 from '../../assets/images/slider-image-1.jpeg'
import Slider2 from '../../assets/images/slider-image-2.jpeg'
import Slider3 from '../../assets/images/slider-image-3.jpeg'
import Blog1 from '../../assets/images/blog-img-1.jpeg'
import Blog2 from '../../assets/images/blog-img-2.jpeg'
import { Autoplay, Pagination } from 'swiper/modules';

export default function MainSlider() {
    return (
        <div className='lg:flex hidden'>
            <div className='w-3/4'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Autoplay,Pagination]}
                    pagination={{clickable:true}}
                    autoplay={{
                        delay:3000,
                        disableOnInteraction:false
                    }}
                    loop={true}    
                >
                    <SwiperSlide><Image src={Slider1} alt='slider1' className='w-full object-cover h-[400px]'/></SwiperSlide>
                    <SwiperSlide><Image src={Slider2} alt='slider2' className='w-full object-cover h-[400px]'/></SwiperSlide>
                    <SwiperSlide><Image src={Slider3} alt='slider3' className='w-full object-cover h-[400px]'/></SwiperSlide>
                </Swiper>
            </div>
            <div className='w-1/4'>
                <Image src={Blog1} alt='blog1' className='object-cover h-[200px]'/>
                <Image src={Blog2} alt='blo2' className='object-cover h-[200px]'/>
            </div>
        </div>
    )
}
