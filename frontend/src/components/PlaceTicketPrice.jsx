import { useState } from "react";
import styles from "../styles/PlaceTicketPrice.module.css";
function PlaceTicketPrice() {
  const [selectedTab, setSelectedTab] = useState("Egyptian");
  return (
    <div className={styles.container}>
      <h3>Ticket Price</h3>
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
    </div>
  );
}

export default PlaceTicketPrice;
