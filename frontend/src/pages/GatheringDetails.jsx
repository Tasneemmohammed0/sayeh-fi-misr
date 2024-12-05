import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/placeDetails.module.css";
import Loading from "../components/Loading";

import Tabs from "../components/Tabs";
import axios from "axios";

function GatheringDetails() {
  const { gatheringId } = useParams();
  const [gathering, setGathering] = useState({});
  const [placeId, setPlaceId] = useState(0);
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);
  const [finalLoading, setFinalLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Fetch gathering details
  useEffect(() => {
    const fetchGathering = async () => {
      try {
        setLoadingData(true);
        setFinalLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/gatherings/${gatheringId}`
        );

        if (response.status === "fail") {
          console.log("error");
          return;
        }
        // get gathering
        console.log(response.data.data);
        setGathering(response.data.data);

        // get place details
        // console.log(response.data.data.place_id);
        setPlaceId(response.data.data.place_id);

        setLoadingData(false);
      } catch (err) {
        console.log(err.message);
        setLoadingData(false);
      }
    };
    fetchGathering();
  }, []);

  // fetch place details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        setFinalLoading(true);

        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}`
        );

        if (response.status === "fail") {
          console.log("error");
          return;
        }

        console.log(placeId);
        console.log(response.data.data);
        setPlace(response.data.data);

        setLoadingData(false);
        setFinalLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoadingData(false);
      }
    };
    fetchData();
  }, [placeId]);

  return (
    <>
      {finalLoading && <Loading />}
      {place && (
        <main className={styles.main}>
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${place.photo})` }}
          >
            <h1 className={styles.title}>{gathering.title}</h1>
          </div>
          <div className={styles.container}>
            {gathering.description && (
              <div className={styles.breif}>
                <h3>Breif</h3>
                <div>{gathering.description}</div>
              </div>
            )}

            <div className={styles.info}>
              <Tabs
                destination={{
                  title: "Destination",
                  name: place.name,
                }}
                host={{ title: "Host" }}
              />
              {/*
            <div>
              <OpeningHours
                openingHoursNormal={place.opening_hours_working_days}
                openingHoursHoliday={place.opening_hours_holidays}
              />
              <PlaceLocation location={place.location} /> */}
              {/* </div> */}
            </div>

            {/* <hr style={{ margin: "20px" }}></hr> */}
          </div>
        </main>
      )}
    </>
  );
}

export default GatheringDetails;
