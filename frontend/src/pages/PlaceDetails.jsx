import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/placeDetails.module.css";
import SeeMoreText from "../components/SeeMoreText";
import PlaceTicketPrice from "../components/PlaceTicketPrice";
import axios from "axios";
function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);
  console.log(placeId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}`
        );
        console.log(response.data.data);
        if (response.status === "fail") {
          console.log("error");
          return;
        }
        setPlace(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.mainDetailsPlace}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${place.photo})` }}
      >
        <h1 className={styles.title}>Pyramids of Giza</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.breif}>
          <h3 style={{ fontSize: "1.6rem", color: "#0c3e69" }}>Breif</h3>
          <SeeMoreText className={styles.breifText} text={place.breif} />
        </div>
        <hr></hr>
        <div>
          <PlaceTicketPrice />
        </div>
      </div>
    </main>
  );
}

export default PlaceDetails;
