
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

import carouselimage1 from '../../assets/images/carouselimg1.jpg';
import carouselimage2 from '../../assets/images/carouselimg2.jpg';
import carouselimage3 from '../../assets/images/carouselimg3.jpg';

function ImageCarousel() {
  const carouselimages = [
    carouselimage1,
    carouselimage2,
    carouselimage3
  ];

  return (
    <>
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      style={{ marginTop: '0px' }} // Adjust the top margin to account for the fixed AppBar
    >
      {carouselimages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%' , height:"601px"}} />
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}

export default ImageCarousel;
