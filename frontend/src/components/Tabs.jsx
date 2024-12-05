/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/PlaceTicketPrice.module.css";
function Tabs({ destination, host }) {
  const [selectedTab, setSelectedTab] = useState(destination.title);
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Ticket Price</h3>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedTab == destination.title ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(destination.title)}
        >
          {destination.title}
        </button>
        <button
          className={`${styles.tab} ${
            selectedTab == host.title ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(host.title)}
        >
          {host.title}
        </button>
      </div>
      <div>
        {selectedTab === destination.title ? (
          <div
            style={{
              marginLeft: "70px",
              marginTop: "30px",
              fontSize: "20px",
              color: "var(--our-blue)",
            }}
          >
            {destination.name}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <img
              src={host.photo}
              style={{ width: "40px", height: "40px", border: "50%" }}
            />
            <div
              style={{
                marginLeft: "10px",

                fontSize: "20px",
                color: "var(--our-blue)",
              }}
            >
              {destination.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
