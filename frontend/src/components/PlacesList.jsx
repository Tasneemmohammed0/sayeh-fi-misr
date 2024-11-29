import React from "react";
import styles from "../styles/placeslist.module.css";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlacesList({ search, filter, count = 100 }) {
  let [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1123/api/v1/places`);
        console.log(response.data);
        if (response.status === "fail") {
          console.log("error");
          return;
        }
        setPlaces(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleSelectedPlace = (id) => {
    console.log("nav");
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
      {places.map((item, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
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
