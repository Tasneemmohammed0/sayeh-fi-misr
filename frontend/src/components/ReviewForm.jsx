import styles from "../styles/reviewForm.module.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Rate from "./Rate";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

function ReviewForm({
  isOpen,
  setIsOpen,
  placeId,
  gatheringId,
  isReport,
  setTriggerFetch,
  triggerFetch,
}) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [reason, setReason] = useState("Offensive");

  if (!isOpen) return null;

  // send review to API
  async function postReview() {
    const reviewData = {
      rating: rate,
      date: new Date().toISOString(),
      title,
      main_content: review,
    };

    // Determine the severity of the report
    const severity = rate == 3 ? "Medium" : rate < 3 ? "Low" : "High";

    const reportData = {
      date: new Date().toISOString(),
      severity,
      reason,
      description: review,
      entityType: placeId ? "place" : "gathering",
      placeId,
      gatheringId,
    };

    try {
      // Determine the end point
      const url = isReport
        ? `http://localhost:1123/api/v1/reports`
        : `http://localhost:1123/api/v1/places/${placeId}/addReview`;

      // Send the request
      const res = await axios.post(url, isReport ? reportData : reviewData, {
        withCredentials: true,
      });

      // Update the review list
      if (!isReport) setTriggerFetch((prev) => !prev);
    } catch {
      toast("❌ Error submitting");
    } finally {
      // show success message
      isReport
        ? notify("Report Submitted Successfully!")
        : notify("🎉 Review Submitted Successfully!");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Review without rating
    if (!rate && !isReport) {
      toast("⭐ Please rate the place");
      return;
    }

    // Report without title and review
    if (isReport && (!reason || !review || !rate)) {
      toast(
        "Please enter the reason, content of your report and it's severity to consider it"
      );
      return;
    }

    // send review to API
    postReview();

    // clear the form
    handleClose();
  }

  function handleClose() {
    // clear the form
    setTitle("");
    setReview("");
    setIsOpen(false);
    setRate(0);
    setReason("Offensive");
  }

  // pretty alerts
  function notify(msg) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: msg,
      timer: 3000,
    });
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
        <div className={styles.reviewContent}>
          {!isReport && (
            <label className={styles.formLabel}>
              <span>Title</span>
              <input
                style={{ marginLeft: "2rem" }}
                className={styles.title}
                type="text"
                placeholder={"Enter review title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          )}
          {isReport && (
            <label className={styles.formLabel}>
              <span>Reason</span>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={styles.dropList}
              >
                <option>Offensive</option>
                <option>Spam</option>
                <option>Inappropriate</option>
                <option>Other</option>
              </select>
            </label>
          )}
          <label className={styles.formLabel}>
            <span style={{ marginTop: "0.5rem" }}>
              {isReport ? "Content" : "Review"}
            </span>
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
              <p>Severity</p>
              <div>
                {Array.from({ length: 5 }, (_, index) => {
                  const value = index + 1;
                  return (
                    <label key={value}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        onChange={() => setRate(value)}
                        style={{ marginLeft: "10px", marginRight: "5px" }}
                      />
                      {value}
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
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
