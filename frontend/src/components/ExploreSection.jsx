import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlacesList from "./PlacesList";
import GatheringList from "./GatheringList"; // New component for gatherings
import "../styles/exploresection.css";

function ExploreSection() {
  const [activeTab, setActiveTab] = useState("places"); // State to track active tab

  return (
    <section className="places-cards">
      <h2 className="secondary-heading">
        Explore {activeTab === "places" ? "Places" : "Gatherings"}
      </h2>
      <h1 className="main-heading">Let’s create your next adventure</h1>
      <div className="solid-line"></div>
      {/* Links to toggle between tabs */}
      <ul className="links">
        <li>
          <Link
            to="#"
            className={activeTab === "places" ? "active-link" : ""}
            onClick={() => setActiveTab("places")}
          >
            Places
          </Link>
          <Link
            to="#"
            className={activeTab === "gatherings" ? "active-link" : ""}
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
        className="see-more"
        onClick={() => (window.location.href = "/places")}
      >
        See More
      </button>
    </section>
  );
}

export default ExploreSection;
