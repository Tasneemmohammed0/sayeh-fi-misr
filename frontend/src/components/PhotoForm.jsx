import styles from "../styles/reviewForm.module.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rate from "./Rate";
import ErrorMessage from "./ErrorMessage";

function ReviewForm({ isOpen, setIsOpen, placeId }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  function handleClose() {
    setIsOpen(false);
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
        {/* {error && <ErrorMessage error={error} />} */}

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
