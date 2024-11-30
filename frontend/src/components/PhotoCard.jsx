/* eslint-disable react/prop-types */
import styles from "../styles/ReviewCard.module.css";
import Stars from "./Stars";
import { useState } from "react";

function PhotoCard({
  firstName = "",
  lastName = "",
  profileImage,
  uploadedPhoto,
  caption,
  date,
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
      <div className={styles.userInfo}>
        <img className={styles.profileImage} src={`${userProfilePic}`} />
        <h3 className={styles.userName}>
          {firstName} {lastName}
        </h3>
      </div>
      <h4 className={styles.title}>{caption}</h4>
      <img src={uploadedPhoto} alt="uploaded photo" className={styles.photo} />
      <p className={styles.time}>Written {formattedDateString}</p>
    </div>
  );
}

export default PhotoCard;
