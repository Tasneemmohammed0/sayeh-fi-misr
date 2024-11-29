import React from "react";
import axios from "axios";

import styles from "../styles/placeslist.module.css";
import Card from "./Card";

function VistedList({ id }) {
  /// fetching by user id to get the visited places

  const [visitList, setVisitList] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/visitlist/${id}`
        );
        setVisitList(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.list}>
      {visitList.map((item, index) => (
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
          />
        </div>
      ))}
    </div>
  );
}

export default VistedList;
