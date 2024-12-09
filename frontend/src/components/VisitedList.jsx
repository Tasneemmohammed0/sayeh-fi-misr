import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../styles/placeslist.module.css";
import Loading from "./Loading";
import Card from "./Card";

function VisitedList({ id }) {
  /// fetching by user id to get the visited places

  const [visitList, setVisitList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:1123/api/v1/users/visitlist/${id}`
        );
        setVisitList(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.list}>
      {loading && <Loading />}
      {visitList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Card key={index} card={item} />
        </div>
      ))}
    </div>
  );
}

export default VisitedList;
