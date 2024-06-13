import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import './slider.css';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className='cone'>
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{ delay: 2500, disableOnInteraction: false }} // Autoplay settings
          loop={true} // Loop setting
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <img src="images/men-1-1.jpeg" alt="Men 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/women-1-1.jpg" alt="Women 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/kids-1-1.jpg" alt="Kids 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/sneakers-1-2.jpg" alt="Sneakers 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/sports-1-2.jpeg" alt="Sports 5" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/bags-1-1.jpg" alt="Nature 6" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/sun-1-1.jpg" alt="Nature 7" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/watch-1-1.jpg" alt="Nature 8" />
          </SwiperSlide>
        </Swiper>
        <div className='con-slider'>
        <h2>Shop by Category</h2>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3} // Default slidesPerView
          freeMode={true}
          watchSlidesProgress={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }} // Autoplay settings
          loop={true} // Loop setting
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <img src="images/men-1-2.jpg" alt="Nature 1" />
            <h3>Men</h3>
          </SwiperSlide>
         
          <SwiperSlide>
            <img src="images/women-1-2.jpg" alt="Nature 2" />
            <h3>Women</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/kids-1-2.jpg" alt="Nature 3" />
            <h3>Kids</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/sneake-1-2.jpg" alt="Nature 4" />
            <h3>Sneakers</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/sports-1-2.jpg" alt="Nature 5" />
            <h3>Sports</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/bags-1-2.jpg" alt="Nature 6" />
            <h3>Bags</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/glasses-1-2.jpg" alt="Nature 7" />
            <h3>Glasses</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/watches-1-2.jpg" alt="Nature 8" />
            <h3>Watch</h3>
          </SwiperSlide>
        </Swiper>
        </div>
      </div>
    </>
  );
}
