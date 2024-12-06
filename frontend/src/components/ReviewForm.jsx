import styles from "../styles/reviewForm.module.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rate from "./Rate";
import { ToastContainer, toast } from "react-toastify";

function ReviewForm({ isOpen, setIsOpen, placeId, gatheringId, isReport }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  // send review to API
  async function postReview() {
    const reviewData = {
      rating: rate,
      date: new Date().toISOString(),
      title,
      main_content: review,
    };

    const reportData = {
      date: new Date().toISOString(),
      severity: rate,
      reason: title,
      description: review,
    };

    try {
      // Determine the end point
      const url = isReport
        ? `http://localhost:1123/api/v1/places/${placeId ? placeId : gatheringId}/addReport`
        : `http://localhost:1123/api/v1/places/${placeId}/addReview`;

      // Send the request
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isReport ? reportData : reviewData),
      });

      if (!res.ok) {
        const errMessage = `❌ Error: ${res.status} ${res.statusText}`;
        toast.error(errMessage);
        throw new Error(errMessage);
      }

      const result = await res.json();
      console.log(result);
    } catch (err) {
      toast("❌ Error submitting");
      console.error(err); // Log the error for debugging purposes
      setError(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Review without rating
    if (!rate && !isReport) {
      setError(true);
      toast("⭐ Please rate the place");
      return;
    }
    console.log(rate);

    // Report without title and review
    if ((isReport && !title) || !review || !rate) {
      toast(
        "Please enter the reason, content of your report and it's severity to consider it"
      );
      return;
    }

    // send review to API
    postReview();

    // show success message
    isReport
      ? toast("Report Submitted Successfully!")
      : toast("🎉 Review Submitted Successfully!");

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
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        {isReport ? (
          <h3 style={{ fontSize: "20px" }}>
            Open for Feedback: Send your report
          </h3>
        ) : (
          <h3>Share your experience with us</h3>
        )}
        <button className={styles.popupClose} onClick={handleClose}>
          <IoMdClose />
        </button>
        {!isReport && <Rate rate={rate} setRate={setRate} />}
        <label className={styles.formLabel}>
          {isReport ? "Reason" : "Title"}
          <input
            className={styles.title}
            type="text"
            placeholder={
              isReport ? "Enter your report reason" : "Enter review title"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className={styles.formLabel}>
          {isReport ? "Content" : "Review"}
          <textarea
            className={styles.reviewText}
            placeholder={
              isReport ? "Write your report..." : "Write your review.."
            }
            value={review}
            onChange={(e) => setReview(e.target.value)}
            maxLength={400}
          ></textarea>
        </label>
        {isReport && (
          <div className={styles.severity}>
            <p className={styles.formLabel}>Severity</p>
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1;
              return (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    onChange={() => setRate(value)}
                  />
                  {value}
                </label>
              );
            })}
          </div>
        )}

        <button
          type="submit"
          className={styles.formButton}
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
