import DetailsPlaceCards from "./DetailsPlaceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

function Cards({ reviews, photos }) {
  return (
    <Swiper
      key={reviews ? "reviews" : "photos"}
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
        reviews.map((review, index) => {
          // check review title or content
          if (!review.title && !review.main_content) return null;

          return (
            <SwiperSlide key={index}>
              <DetailsPlaceCards
                key={review.review_id}
                review={{
                  rating: review.rating,
                  title: review.title,
                  mainContent: review.main_content,
                }}
                date={review.date}
                firstName={review.first_name}
                lastName={review.last_name}
                userProfilePic={review.profile_pic}
              />
            </SwiperSlide>
          );
        })}

      {photos &&
        photos.map((photo, index) => {
          // check photo title or content
          if (!photo.photo) return null;

          return (
            <SwiperSlide key={index}>
              <DetailsPlaceCards
                key={photo.photo_id}
                photo={{
                  uploadedPhoto: photo.photo,
                  caption: photo.caption,
                }}
                date={photo.date}
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

export default Cards;
