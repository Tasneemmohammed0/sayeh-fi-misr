import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/PlaceDetails.module.css";
import SeeMoreText from "../components/SeeMoreText";
import PlaceTicketPrice from "../components/PlaceTicketPrice";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);

  // fetch place data from the API
  useEffect(() => {
    console.log(placeId);
    fetch(` http://localhost:1123/api/v1/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => setPlace(data.data.Place))
      .then((err) => setError(err));
  }, [placeId]);

  return (
    <main className={styles.main}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${place.image})` }}
      >
        <h1 className={styles.title}>Pyramids of Giza</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.breif}>
          <h3>Breif</h3>
          <SeeMoreText className={styles.breifText} text={place.breif} />
        </div>
        <hr></hr>
        <div>
          <PlaceTicketPrice
            egyptianChildPrice={place.egyptian_child_ticket_price}
            egyptianAdultPrice={place.egyptian_adult_ticket_price}
            otherChildPrice={place.foreign_child_ticket_price}
            otherAdultPrice={place.foreign_adult_ticket_price}
          />
        </div>
      </div>
    </main>
  );
}

export default PlaceDetails;
