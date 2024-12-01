import ReviewCard from "./ReviewCard";
import PhotoCard from "./PhotoCard";
import styles from "../styles/ReviewCards.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

function ReviewCards({ reviews, photos }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        1024: {
          slidesPerView: 3, // 3 slides on larger screens
        },
        768: {
          slidesPerView: 2, // 2 slides on medium screens
        },
        480: {
          slidesPerView: 1, // 1 slide on small screens
        },
      }}
    >
      {reviews &&
        reviews.map((review) => {
          // check review title or content
          if (!review.title && !review.main_content) return null;

          return (
            <SwiperSlide key={review.review_id}>
              <ReviewCard
                key={review.review_id}
                rating={review.rating}
                date={review.date}
                title={review.title}
                mainContent={review.main_content}
                firstName={review.first_name}
                lastName={review.last_name}
                userProfilePic={review.profile_pic}
              />
            </SwiperSlide>
          );
        })}
      {photos &&
        photos.map((photo) => {
          // check photo title or content
          if (!photo.photo) return null;

          return (
            <SwiperSlide key={photo.photo_id}>
              <PhotoCard
                key={photo.photo_id}
                uploadedPhoto={photo.photo}
                date={photo.date}
                caption={photo.caption}
                firstName={photo.first_name}
                lastName={photo.last_name}
                userProfilePic={photo.profile_pic}
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default ReviewCards;
