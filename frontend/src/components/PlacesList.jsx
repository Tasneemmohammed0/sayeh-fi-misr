import { React, useState, useEffect } from "react";
import styles from "../styles/placeslist.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import Card from "./Card";
import Loading from "./Loading";

function PlacesList({ search, filter, count = 100 }) {
  let [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint =
          location.pathname === "/"
            ? `http://localhost:1123/api/v1`
            : `http://localhost:1123/api/v1/places`;

        const response = await axios.get(endpoint);
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setLoading(false);
        setPlaces(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [location.pathname]);

  const handleSelectedPlace = (id) => {
    navigate(`/places/${id}`);
  };

  if (search) {
    // places = places.filter((item) =>
    //   item.name.toLowerCase().includes(search.toLowerCase())
    // );

    set;
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
