/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/PlaceTicketPrice.module.css";
function Tabs({ firstTab, secondTab }) {
  const [selectedTab, setSelectedTab] = useState(firstTab.title);
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Ticket Price</h3>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedTab == firstTab.title ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(firstTab.title)}
        >
          {firstTab.title}
        </button>
        <button
          className={`${styles.tab} ${
            selectedTab == secondTab.title ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(secondTab.title)}
        >
          {secondTab.title}
        </button>
      </div>
      <div className={styles.tabContent}>
        {selectedTab === firstTab.title ? firstTab.content : secondTab.content}
      </div>
    </div>
  );
}

export default Tabs;
