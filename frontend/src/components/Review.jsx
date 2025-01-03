import React, { useState } from "react";
import Stars from "./Stars";
import EditReviewForm from "./EditReviewForm";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import styles from "../styles/review.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Review({
  review,
  setReviews,
  setLoading,
  loading,
  canEdit,
  setStats,
}) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const formattedDate = new Date(review.date);
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
      setStats((prevStats) => {
        return {
          ...prevStats,
          reviews_count: prevStats.reviews_count - 1,
        };
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
          <img
            src={review.photo}
            alt={review.name}
            className={styles.img}
            onClick={() => navigate(`/places/${review.place_id}#reviews`)}
          />
          <div style={{ display: "flex", gap: "10px ", fontSize: "20px" }}>
            <Stars count={review.rating} fontSize="20px" />
          </div>
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
              <button
                className={styles.editbutton}
                onClick={() => setEdit(true)}
              >
                <CiEdit style={{ fontSize: "20px" }} />
                Edit
              </button>
              <button className={styles.deletebutton} onClick={deleteReview}>
                <MdDelete style={{ fontSize: "20px" }} />
                Delete
              </button>
            </div>
          )}
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
