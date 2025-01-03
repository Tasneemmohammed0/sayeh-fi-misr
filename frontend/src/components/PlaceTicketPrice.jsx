/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/PlaceTicketPrice.module.css";
function PlaceTicketPrice({
  egyptianChildPrice,
  egyptianAdultPrice,
  otherChildPrice,
  otherAdultPrice,
}) {
  const [selectedTab, setSelectedTab] = useState("Egyptian");

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Ticket Price</h3>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedTab == "Egyptian" ? styles.active : ""
          }`}
          onClick={() => setSelectedTab("Egyptian")}
        >
          Egyptian
        </button>
        <button
          className={`${styles.tab} ${
            selectedTab == "Other" ? styles.active : ""
          }`}
          onClick={() => setSelectedTab("Other")}
        >
          Other Nationality
        </button>
      </div>

      <div className={styles.tabContent}>
        {selectedTab === "Egyptian" ? (
          <div className={styles.price}>
            <div className={styles.adult}>
              <h4>Adult</h4>
              <p>{egyptianAdultPrice ? `${egyptianAdultPrice} EGP` : `FREE`}</p>
            </div>
            <div className={styles.child}>
              <h4>Student</h4>
              <p>{egyptianChildPrice ? `${egyptianChildPrice} EGP` : `FREE`}</p>
            </div>
          </div>
        ) : (
          <div className={styles.price}>
            <div className={styles.adult}>
              <h4>Adult</h4>
              <p>{otherAdultPrice ? `${otherAdultPrice} EGP` : `FREE`}</p>
            </div>
            <div className={styles.child}>
              <h4>Student</h4>
              <p>{otherChildPrice ? `${otherChildPrice} EGP` : `FREE`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceTicketPrice;
