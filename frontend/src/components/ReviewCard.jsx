/* eslint-disable react/prop-types */
import styles from "../styles/ReviewCard.module.css";
import Stars from "./Stars";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReviewCard({
  review,
  date,
  firstName = "",
  lastName = "",
  userId,
  userProfilePic,
}) {
  const navigate = useNavigate();
  // format date
  const formattedDate = new Date(date);
  const formattedDateString = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        <Stars count={review.rating} color={"orange"} />
      </div>

      <div className={styles.userInfo}>
        <img
          className={styles.profileImage}
          src={`${userProfilePic}`}
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        />
        <h3
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
          className={styles.userName}
        >
          {firstName} {lastName}
        </h3>
      </div>
      <h4 className={review ? styles.title : styles.caption}>{review.title}</h4>
      <p className={styles.mainContent}>{review.mainContent}</p>
      <p className={styles.time}>Posted {formattedDateString}</p>
    </div>
  );
}

export default ReviewCard;
