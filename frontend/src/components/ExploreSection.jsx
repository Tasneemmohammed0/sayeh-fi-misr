import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlacesList from "./PlacesList";
import GatheringList from "./GatheringList"; // New component for gatherings
import styles from "../styles/exploresection.module.css";

function ExploreSection() {
  const [activeTab, setActiveTab] = useState("places"); // State to track active tab

  return (
    <section className={styles.placesCards}>
      <h2 className={styles.secondaryHeading}>
        Explore {activeTab === "places" ? "Places" : "Gatherings"}
      </h2>
      <h1 className={styles.mainHeading}>Let’s create your next adventure</h1>
      <div className={styles.solidLine}></div>
      {/* Links to toggle between tabs */}
      <ul className={styles.links}>
        <li className={styles.item}>
          <Link
            to="#"
            className={activeTab === "places" ? `${styles.activeLink}` : ""}
            onClick={() => setActiveTab("places")}
          >
            Places
          </Link>
          <Link
            to="#"
            className={activeTab === "gatherings" ? `${styles.activeLink}` : ""}
            onClick={() => setActiveTab("gatherings")}
          >
            Gatherings
          </Link>
        </li>
      </ul>
      {/* Conditional rendering based on the active tab */}
      {activeTab === "places" ? (
        <PlacesList count={4} />
      ) : (
        <GatheringList count={6} />
      )}
      <button
        className={styles.seeMore}
        onClick={
          activeTab === "places"
            ? () => (window.location.href = "/places")
            : () => (window.location.href = "/gatherings")
        }
      >
        See More
      </button>
    </section>
  );
}

export default ExploreSection;
