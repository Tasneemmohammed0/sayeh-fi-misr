/* eslint-disable react/prop-types */
import styles from "../styles/DetailsPlaceCard.module.css";
import Stars from "./Stars";
import { useState } from "react";

function DetailsPlaceCard({
  photo,
  review,
  date,
  firstName = "",
  lastName = "",
  userProfilePic,
}) {
  // format date
  const formattedDate = new Date(date);
  const formattedDateString = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      {review && (
        <div className={styles.stars}>
          <Stars count={review.rating} color={"orange"} />
        </div>
      )}
      <div className={styles.userInfo}>
        <img className={styles.profileImage} src={`${userProfilePic}`} />
        <h3 className={styles.userName}>
          {firstName} {lastName}
        </h3>
      </div>
      <h4 className={styles.title}>{review ? review.title : photo.caption}</h4>
      {photo && (
        <img
          src={photo.uploadedPhoto}
          alt="uploaded photo"
          className={styles.photo}
        />
      )}
      {review && <p className={styles.mainContent}>{review.mainContent}</p>}
      <p className={styles.time}>Posted {formattedDateString}</p>
    </div>
  );
}

export default DetailsPlaceCard;
