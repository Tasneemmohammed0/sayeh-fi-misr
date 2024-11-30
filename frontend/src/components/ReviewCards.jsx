import ReviewCard from "./ReviewCard";
import styles from "../styles/ReviewCards.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

function ReviewCards({ reviews }) {
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
      {reviews.map((review) => (
        <SwiperSlide key={review.review_id}>
          <ReviewCard
            key={review.review_id}
            rating={review.rating}
            time={review.time}
            title={review.title}
            mainContent={review.main_content}
            userName={review.name}
            userProfilePic={review.profile_pic}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ReviewCards;