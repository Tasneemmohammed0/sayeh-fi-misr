/* eslint-disable react/prop-types */
import styles from "../styles/ReviewCard.module.css";
import Stars from "./Stars";
import { useState } from "react";

function ReviewCard({
  rating = 1,
  date,
  title = "",
  mainContent = "",
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
      <div className={styles.stars}>
        <Stars count={rating} color={"orange"} />
      </div>

      <div className={styles.userInfo}>
        <img className={styles.profileImage} src={`${userProfilePic}`} />
        <h3 className={styles.userName}>
          {firstName} {lastName}
        </h3>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.mainContent}>{mainContent}</p>
      <p className={styles.time}>Written {formattedDateString}</p>
    </div>
  );
}

export default ReviewCard;
