import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import PhotoCard from "./PhotoCard";
import styles from "../styles/DetailsPlaceCards.module.css";
import { useMediaQuery } from "react-responsive";

function Cards({ reviews, photos }) {
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <>
      <Swiper
        key={reviews ? "reviews" : "photos"}
        spaceBetween={20}
        slidesPerView={1}
        navigation={isMobile ? false : true}
        modules={[Navigation]}
        breakpoints={{
          1400: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {reviews &&
          reviews.map((review, index) => {
            // check review title or content
            if (!review.title.trim() && !review.main_content.trim())
              return null;

            return (
              <SwiperSlide key={index}>
                <div className={styles.wrapper}>
                  <ReviewCard
                    key={review.review_id}
                    review={{
                      rating: review.rating,
                      title: review.title,
                      mainContent: review.main_content,
                    }}
                    date={review.date}
                    firstName={review.first_name}
                    lastName={review.last_name}
                    userId={review.user_id}
                    userProfilePic={review.profile_pic}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        {photos &&
          photos.map((photo, index) => {
            // check photo title or content
            if (!photo.photo) return null;

            return (
              <SwiperSlide key={index}>
                <div className={styles.wrapper}>
                  <PhotoCard
                    key={photo.photo_id}
                    photo={{
                      uploadedPhoto: photo.photo,
                      caption: photo.caption,
                    }}
                    date={photo.date}
                    firstName={photo.first_name}
                    lastName={photo.last_name}
                    userProfilePic={photo.profile_pic}
                    userId={photo.user_id}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}

export default Cards;
