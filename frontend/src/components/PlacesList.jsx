import { React, useState, useEffect, useContext } from "react";
import styles from "../styles/placeslist.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Card from "./Card";
import Loading from "./Loading";
import { UserContext } from "../App";

function PlacesList({ search, filter, count = 100 }) {
  // let [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { places: Places, setPlaces } = useContext(UserContext);

  //places = places.slice(0, count);
  let places = Places.slice(0, count);

  const handleSelectedPlace = (id) => {
    navigate(`/places/${id}`);
  };

  if (search) {
    places = places.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter && filter !== "all") {
    places = places.filter((item) => item.city === filter);
  }

  return (
    <div className={styles.list}>
      {loading && <Loading top="70%" />}

      {places.map((item, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          key={index}
        >
          <Card
            key={index}
            photo={item.photo}
            placeName={item.name}
            location={item.city}
            rate={item.rate}
            onClick={() => handleSelectedPlace(item.place_id)}
          />
        </div>
      ))}
    </div>
  );
}

export default PlacesList;
