import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "../styles/ReportCard.module.css";

function ReportCard({ card, setReports }) {
  const formattedDate = new Date(card.date);
  const formattedDateString = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  async function handleResolve(report_id) {
    try {
      const res = await axios.delete(
        `http://localhost:1123/api/v1/reports/${report_id}`,
        {
          withCredentials: true,
        }
      );
      setReports((prevReports) =>
        prevReports.filter((report) => report.report_id !== report_id)
      );

      setTimeout(() => {
        toast.success("Report resolved successfully.");
      }, 1000);
    } catch (err) {
      toast.error("Failed to resolve report.");
      console.log(err);
    }

    return;
  }

  return (
    <div className={styles.card}>
      <ToastContainer />
      <h2 className={styles.header}>Report id {card.report_id}</h2>

      <div className={styles.details}>
        <div className={styles.detailColumn}>
          <p className={styles.detailItem}>
            On {card.type}: {card.name}
          </p>
          <p className={styles.detailItem}>Report by: {card.username}</p>
          <p
            className={styles.detailItem}
            style={{
              backgroundColor:
                card.severity === "Low"
                  ? "green"
                  : card.severity === "Medium"
                    ? "yellow"
                    : "red",
              color: card.severity === "Medium" ? "black" : "white",
            }}
          >
            Severity: {card.severity}
          </p>
          <p className={styles.detailItem}>Reason: {card.reason}</p>
          <p className={styles.detailItem}>Date: {formattedDateString}</p>
        </div>

        <div className={styles.description}>
          <p style={{ margin: "5px" }}>{card.description}</p>
        </div>
      </div>

      <button
        className={styles.button}
        onClick={() => handleResolve(card.report_id)}
      >
        Resolve
      </button>
    </div>
  );
}

export default ReportCard;
