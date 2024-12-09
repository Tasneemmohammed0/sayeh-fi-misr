import React from "react";
import styles from "../styles/ReportCard.module.css";

function ReportCard({ card }) {
  async function handleResolve(report_id) {
    //   try {
    //     const res = await axios.put(`http://localhost:1123/api/v1/reports/${report_id}`, {
    //       withCredentials: true,
    //     });
    //     setReports((prevReports) => prevReports.filter((report) => report.report_id !== report_id));
    //   } catch (err) {
    //     console.log(err);
    //   }

    return;
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Report id {card.report_id}</h2>

      <div className={styles.details}>
        <div className={styles.detailColumn}>
          <p className={styles.detailItem}>On Place: dar el salem</p>
          <p className={styles.detailItem}>Report by: Amr Hany</p>
          <p className={styles.detailItem}>Severity: {card.severity}</p>
          <p className={styles.detailItem}>Reason: {card.reason}</p>
          <p className={styles.detailItem}>Date: {card.date}</p>
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
