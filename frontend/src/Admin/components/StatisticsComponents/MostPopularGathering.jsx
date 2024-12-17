import React, { useEffect, useState } from "react";
import axios from "axios";
import GatheringCard from "../../../components/GatheringCard";
import style from "../../styles/AdminStatistics.module.css";

function MostPopularGathering() {
  const [gatheringData, setGatheringData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1123/api/v1/stats/gathering",
          { withCredentials: true }
        );

        // console.log(res.data);

        if (res && res.data && res.data.status !== "fail") {
          const { gathering_id, count } = res.data.data;
          setCount(count);

          console.log(gathering_id);

          const gatheringRes = await axios.get(
            `http://localhost:1123/api/v1/gatherings/${gathering_id}`,
            { withCredentials: true }
          );
          console.log(gatheringRes.data);

          if (
            gatheringRes &&
            gatheringRes.data &&
            gatheringRes.data.status !== "fail"
          ) {
            setGatheringData(gatheringRes.data.data.gathering[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.card}>
      {gatheringData ? (
        <>
          <h2 className={style.header} style={{ height: "fit-content" }}>
            Most Popular Gathering
          </h2>
          <p>Total members count: {count}</p>
          <GatheringCard gathering={gatheringData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MostPopularGathering;