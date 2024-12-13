import React, { useState } from "react";
import Stars from "./Stars";
import EditReviewForm from "./EditReviewForm";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import styles from "../styles/review.module.css";
import axios from "axios";

function Review({ review, setReviews, setLoading, loading, canEdit }) {
  const formattedDate = new Date(review.date);

  const [edit, setEdit] = useState(false);

  const formattedDateString = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  async function deleteReview() {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:1123/api/v1/reviews/${review.review_id}`,
        {
          withCredentials: true,
        }
      );
      setReviews((prevReviews) => {
        return prevReviews.filter((r) => r.review_id !== review.review_id);
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.review}>
        <div className={styles.info}>
          <img src={review.photo} alt={review.name} className={styles.img} />
          <p style={{ display: "flex", gap: "10px ", fontSize: "20px" }}>
            {" "}
            <Stars count={review.rating} fontSize="20px" />
          </p>
          <p> Written in {formattedDateString}</p>
        </div>
        <div className={styles.text}>
          <h2>
            {review.title}{" "}
            <span style={{ color: "#0C3E69", fontSize: "16px" }}>
              {" "}
              on {review.name}{" "}
            </span>
          </h2>
          <p className={styles.p}> {review.main_content} </p>
        {canEdit && (
          <div className={styles.buttonsContainer}>
            <button className={styles.editbutton} onClick={() => setEdit(true)}>
              <CiEdit style={{ fontSize: "20px" }} />
              Edit
            </button>
            <button className={styles.deletebutton} onClick={deleteReview}>
              <MdDelete style={{ fontSize: "20px" }} />
              Delete
            </button>
          </div>
        </div>
        </div>
        {edit && (
          <EditReviewForm
            review={review}
            setReviews={setReviews}
            setLoading={setLoading}
            handleClose={() => setEdit(false)}
            loading={loading}
          />
        )}
    </>
  );
}

export default Review;
