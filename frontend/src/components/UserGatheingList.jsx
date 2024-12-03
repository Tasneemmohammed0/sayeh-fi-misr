import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../styles/placeslist.module.css";
import Loading from "./Loading";
import GatheringCard from "./GatheringCard";

function UserGatheingList({ id }) {
  /// fetching by user id to get the gathering list

  // const [gatheringList, setGatheringList] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await axios.get(
  //         `http://localhost:1123/api/v1/users/gatheringlist/${id}`
  //       );
  //       setGatheringList(response.data.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [id]);
  let gatheringList = [];
  const temp = {
    photo: "/src/assets/images/temple.png",
    placeName: "Luxor Tempale",
    location: "Luxor ",
    hostname: "Hany",
    currentcapacity: 0,
    duration: 1,
  };

  console.log("gatheringList", gatheringList);

  for (let i = 0; i < 5; i++) {
    gatheringList.push(temp);
  }

  return (
    <div className={styles.list}>
      {loading && <Loading />}

      {gatheringList.map((item, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <GatheringCard
            key={index}
            photo={item.photo}
            placeName={item.name}
            location={item.city}
            hostname={item.hostName}
            currentcapacity={item.currentCapacity}
            duration={item.duration}
          />
        </div>
      ))}
    </div>
  );
}

export default UserGatheingList;
