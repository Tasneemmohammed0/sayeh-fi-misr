import styles from "../styles/ReviewCard.module.css";
import { useState } from "react";

function ReviewCard({ placeId = 1 }) {
  return (
    <div className={styles.container}>
      {/* <Stars/> */}
      {/* <div className={styles.userInfo}>
        <img className={styles.profileImage} src={} />
        <h3 className={styles.username}>{username}</h3>
      </div> */}
    </div>
  );
}

export default ReviewCard;
