import React from "react";
import Stars from "./Stars";
import styles from "../styles/review.module.css";
function Review({ review }) {
  return (
    <div className={styles.review}>
      <div className={styles.info}>
        <img
          src={review.placePhoto}
          alt={review.place}
          className={styles.img}
        />
        <p style={{ display: "flex", gap: "10px ", fontSize: "20px" }}>
          {" "}
          <Stars count="1" fontSize="20px" /> {review.rating}/10{" "}
        </p>
        <p> Written in {review.date}</p>
      </div>

      <div className={styles.text}>
        <h2>
          {review.title}{" "}
          <span style={{ color: "#0C3E69", fontSize: "16px" }}>
            {" "}
            on {review.place}{" "}
          </span>{" "}
        </h2>
        <p className={styles.p}> {review.description} </p>
      </div>
    </div>
  );
}

export default Review;
