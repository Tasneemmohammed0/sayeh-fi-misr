import styles from "../styles/reviewForm.module.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rate from "./Rate";

function ReviewForm({ isOpen, setIsOpen }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e) {
    // sent the review to the API
    e.preventDefault();

    if (!rate) {
      setError(true);
      alert("⭐ Please rate the place");
      return;
    }

    // show success message
    alert("🎉 Review Submitted Successfully!");

    // clear the form
    setTitle("");
    setReview("");
    setIsOpen(false);
    setRate(0);
  }

  function handleClose() {
    // clear the form
    setTitle("");
    setReview("");
    setIsOpen(false);
    setRate(0);
  }

  return (
    <div className={styles.popupOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Share your experience with us</h3>
        <button className={styles.popupClose} onClick={handleClose}>
          <IoMdClose />
        </button>
        <Rate rate={rate} setRate={setRate} />
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
    </div>
  );
}

export default ReviewForm;
