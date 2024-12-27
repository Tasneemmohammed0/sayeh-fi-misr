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
  const [title, setTitle] = useState(review.title);
  const [reviewText, setReview] = useState(review.main_content);
  const [rate, setRate] = useState(review.rating);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:1123/api/v1/reviews/${review.review_id}`,
        {
          title: +title ? +title : title,
          main_content: reviewText,
          rating: rate,
        },
        {
          withCredentials: true,
        }
      );

      setReviews((prev) =>
        prev.map((r) =>
          r.review_id === review.review_id ? response.data.data : r
        )
      );
      toast.success("Review updated successfully!");
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Rate
            rate={rate}
            setRate={setRate}
            activeColor={"gold"}
            disabledColor={"lightgray"}
          />
        </div>

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
