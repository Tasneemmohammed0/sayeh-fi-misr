import styles from "../styles/reviewForm.module.css";
import { useState } from "react";

function ReviewForm({ isOpen }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);

  // if (!isOpen) return null;

  function handleSubmit(e) {
    // sent the review to the API
    e.preventDefault();
    console.log(`Title: ${title}`);

    console.log(`Review: ${review}`);
    alert("Review Submitted Successfully!");
    setTitle("");
    setReview("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Share your experience with us</h3>
      <label className={styles.formLabel}>
        Title
        <input
          className={styles.title}
          type="text"
          placeholder="Enter review title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      {/* Rating */}
      <label className={styles.formLabel}>
        Review
        <textarea
          className={styles.reviewText}
          placeholder="Write your review.."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          maxLength={400}
        ></textarea>
      </label>

      <button
        type="submit"
        className={styles.formButton}
        onClick={handleSubmit}
      >
        Add Review
      </button>
    </form>
  );
}

export default ReviewForm;
