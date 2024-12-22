import React, { useState, useEffect } from "react";
import styles from "../styles/placeslist.module.css";
import GatheringCard from "./GatheringCard";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
function GatheringList({ search, filter, count = 100 }) {
  let [gatherings, setGatherings] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const endpoint =
          location.pathname === "/"
            ? `http://localhost:1123/api/v1/exploregatherings`
            : `http://localhost:1123/api/v1/gatherings`;

        const response = await axios.get(endpoint);
        setGatherings(response.data.data);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [location.pathname]);

  gatherings = gatherings.slice(0, count);

  if (search) {
    gatherings = gatherings.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter && filter !== "all") {
    gatherings = gatherings.filter((item) => item.city === filter);
  }

  return (
    <div className={styles.list}>
      {loading && <Loading />}

      {gatherings.map((item, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          key={index}
        >
          <GatheringCard key={index} gathering={item} />
        </div>
      ))}
    </div>
  );
}

export default GatheringList;
