import styles from "../styles/ReviewCard.module.css";
import Stars from "./Stars";
import { useState } from "react";

function ReviewCard({
  rating = 1,
  time,
  title = "",
  mainContent = "",
  userName,
  userProfilePic,
}) {
  return (
    <div className={styles.container}>
      <Stars className={styles.stars} count={rating} />
      <div className={styles.userInfo}>
        <img className={styles.profileImage} src={`${userProfilePic}`} />
        <h3 className={styles.userName}>{userName}</h3>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.mainContent}>{mainContent}</p>
      <p className={styles.time}>Written {time}</p>
    </div>
  );
}

export default ReviewCard;
