'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import texnokol from '@/images/logos/1.png';
import bazalt from '@/images/logos/2.png';
import uzmetal from '@/images/logos/3.png';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.css';

const ManufacturersSlider = () => {
  const manufacturers = [
    { id: 1, name: 'Manufacturer 1', logo: texnokol },
    { id: 2, name: 'Manufacturer 2', logo: bazalt},
    { id: 3, name: 'Manufacturer 3', logo: uzmetal },
    { id: 4, name: 'Manufacturer 4', logo: texnokol },
    { id: 5, name: 'Manufacturer 5', logo: uzmetal },
    { id: 6, name: 'Manufacturer 6', logo: bazalt },
  ];

  return (
    <div className="w-full  px-2">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Производители
      </h2>

      <div className="relative flex gap-y-3 flex-col manufacturer-slider">
        <Swiper
       loop
       autoplay={{
         delay: 2000, // Thời gian trễ giữa các slide (ms)
         disableOnInteraction: false // Cho phép tự động phát khi người dùng tương tác
       }}
    //    centeredSlides
       spaceBetween={16}
       slidesPerView={2}
       pagination={{
         clickable: true
       }}
       className="swiper-bespoke-2"
       modules={[Autoplay, Pagination]}
       breakpoints={{
         1400: {
           spaceBetween: 70,
           pagination: false
         },
         1024: {
           pagination: false
         }
       }}
        >
          {manufacturers.map((manufacturer) => (
            <SwiperSlide key={manufacturer.id}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className=" aspect-[2/1] w-full">
                  <Image
                    src={manufacturer.logo}
                    alt={manufacturer.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-contain"
                    priority
                  />
                </div>
               
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

     
        
      </div>
     
    </div>
  );
};

export default ManufacturersSlider;
