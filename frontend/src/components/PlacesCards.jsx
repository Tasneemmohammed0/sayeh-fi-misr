import React from "react";
import { Link } from "react-router-dom";
import PlacesList from "./PlacesList";
import "../styles/placescards.css";
function PlacesCards() {
  return (
    <section className="places-cards">
      <h2> Explore Places</h2>
      <h1>Let’s create your next adventure</h1>
      <div className="solid-line"></div>
      <ul className="links">
        <li>
          <Link to="/" activeclassname="activ-link">
            Places
          </Link>
          <Link to="/gatheringcards" activeclassname="activ-link">
            Gatherings
          </Link>
        </li>
      </ul>

      <PlacesList count={2} />

      <button className="see-more">See More</button>
    </section>
  );
}
export default PlacesCards;
