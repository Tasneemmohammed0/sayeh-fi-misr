
import React from "react";
import styles from "../styles/placeslist.module.css";
import Card from "./Card";

function GatheringList({ search, filter, count = 100 }) {
  //// test before connecting to the backend

  let gatherings = [];
  const temp = {
    id: 2,
    name: " CMP Temple",
    city: "Giza",
    image: "/src/assets/images/CMP27.jpg",
    rate: 4,
  };

  for (let i = 0; i < count; i++) {
    gatherings.push(temp);
  }

  const temp2 = {
    id: 2,
    name: "Hany Temple",
    city: "Cairo",
    image: "/src/assets/images/temple.png",
    rate: 4,
  };
  gatherings.push(temp2);

  const temp3 = {
    id: 2,
    name: "Hany Temple",
    city: "Luxor",
    image: "/src/assets/images/temple.png",
    rate: 4,
  };
  gatherings.push(temp3);

  if (search) {
    gatherings = gatherings.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter && filter !== "all") {
    gatherings = gatherings.filter((item) => item.city === filter);
  }

  return (
    <div className={styles.list}>
      {gatherings.map((item, index) => (
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
            photo={item.image}
            placeName={item.name}
            location={item.city}
            rate={item.rate}
            type="gathering"
          />
        </div>
      ))}
    </div>
  );
}

export default GatheringList;
