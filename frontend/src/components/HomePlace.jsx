import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

function HomePlace({ count }) {
  const { places: userPlaces } = useContext(UserContext);
  const displayedPlaces = userPlaces.slice(0, count);
  const navigate = useNavigate();
  const list = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    width: "100%",
  };

  const handleSelectedPlace = (e, id) => {
    navigate(`/places/${id}`);
  };

  return (
    <div style={list}>
      {displayedPlaces.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Card
            card={item}
            onClick={(e) => handleSelectedPlace(e, item.place_id)}
          />
        </div>
      ))}
    </div>
  );
}

export default HomePlace;
