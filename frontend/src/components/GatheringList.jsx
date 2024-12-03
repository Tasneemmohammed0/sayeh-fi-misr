import React, { useState, useEffect } from "react";
import styles from "../styles/placeslist.module.css";
import GatheringCard from "./GatheringCard";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
function GatheringList({ search, filter, count = 100 }) {
  let [gatherings, setGatherings] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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
        console.log("response");
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setGatherings(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [location.pathname]);

  const handleSelectedGathering = (id) => {
    console.log("nav");
    navigate(`/gatherings/${id}`);
  };

  gatherings = gatherings.slice(0, count);

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
          <GatheringCard
            key={index}
            photo={item.photo}
            placeName={item.title}
            location={item.city}
            hostname="Hany"
            currentcapacity={0}
            duration={1}
            onClick={() => handleSelectedGathering(item.gathering_id)}
          />
        </div>
      ))}
    </div>
  );
}

export default GatheringList;
