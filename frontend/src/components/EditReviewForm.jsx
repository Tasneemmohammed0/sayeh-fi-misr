import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rate from "./Rate";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import styles from "../styles/EditReviewForm.module.css";
import Loading from "./Loading";

function EditReviewForm({
  review,
  setReviews,
  setLoading,
  handleClose,
  loading,
}) {
  const [title, setTitle] = useState(review.name);
  const [reviewText, setReview] = useState(review.main_content);
  const [rate, setRate] = useState(review.rating);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:1123/api/v1/reviews/${review.review_id}`,
        {
          title: title,
          main_content: reviewText,
          rating: rate,
        },
        {
          withCredentials: true,
        }
      );

      setReviews((prev) =>
        prev.map((r) =>
          r.review_id === review.review_id
            ? {
                ...r,
                title: title,
                main_content: reviewText,
                rating: rate,
              }
            : r
        )
      );
      console.log(response.data.data);
      toast.success("Review updated successfully!");
    } catch (error) {
      toast.error("Failed to update the review.");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <ToastContainer />
      {loading && <Loading />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Edit review</h3>
        <button className={styles.popupClose} onClick={handleClose}>
          <IoMdClose />
        </button>
        <Rate rate={rate} setRate={setRate} />

        <label className={styles.formLabel}>
          Title
          <input
            className={styles.title}
            type="text"
            placeholder={"Enter review title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className={styles.formLabel}>
          Review
          <textarea
            className={styles.reviewText}
            placeholder="Write your review.."
            value={reviewText}
            onChange={(e) => setReview(e.target.value)}
            maxLength={400}
          ></textarea>
        </label>
        <button type="submit" className={styles.formButton}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditReviewForm;
