import React from "react";
import axios from "axios";

import styles from "../styles/ReportCard.module.css";

function ReportCard({ card, setReports, setLoading, setMessage }) {
  const formattedDate = new Date(card.date);
  const formattedDateString = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  async function handleResolve(report_id) {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:1123/api/v1/reports/${report_id}`,
        {
          withCredentials: true,
        }
      );

      setReports((prevReports) =>
        prevReports.filter((report) => report.report_id !== report_id)
      );
      setMessage("Report resolved successfully");
    } catch (err) {
      console.log(err);
      setMessage("Failed to resolve report");
    } finally {
      setLoading(false);
    }
    return;
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Report ID: {card.report_id}</h2>

      {/* Report Info Section */}
      <div className={styles.reportInfo}>
        <p className={styles.detailItem}>
          Reported On: {card.type} - {card.name}
        </p>
        <p className={styles.detailItem}>Reported By: {card.username}</p>
        <p
          className={`${styles.severity} ${
            card.severity === "Low"
              ? styles["severity-low"]
              : card.severity === "Medium"
                ? styles["severity-medium"]
                : styles["severity-high"]
          }`}
        >
          Severity: {card.severity}
        </p>

        <p className={styles.detailItem}>Reason: {card.reason}</p>
        <p className={styles.detailItem}>Date: {formattedDateString}</p>
      </div>

      {/* Report Details Section */}
      <div className={styles.description}>
        <h3>Description</h3>
        <p style={{ margin: "5px" }}>{card.description}</p>
      </div>

      {/* Resolve Button */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => handleResolve(card.report_id)}
        >
          Resolve
        </button>
      </div>
    </div>
  );
}

export default ReportCard;
