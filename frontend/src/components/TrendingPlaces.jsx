import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";

import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

//// our styles
import styles from "../styles/trending.module.css";

function TrandingPlaces({ places }) {
  const navigate = useNavigate();
  console.log("trending", places);
  return (
    <section className={styles.backGround} id="trending">
      <h2 className={styles.head}>
        Recent <span className={styles.special}>Trending</span> Sights Of Egypt
      </h2>
      <Swiper
        effect={"coverflow"}
        slidesPerView={"auto"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 5,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        loop={true}
        navigation={true}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="mySwiper container"
      >
        {places.map((place, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: "transparent" }}>
            <div
              className={styles.place}
              onClick={() => navigate(`/places/${place.place_id}`)}
            >
              <img
                src={place.photo}
                alt={place.name}
                className={styles.image}
              />
              <h3>{place.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrandingPlaces;
