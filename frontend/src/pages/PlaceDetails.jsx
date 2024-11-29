import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/PlaceDetails.module.css";
import SeeMoreText from "../components/SeeMoreText";
import PlaceTicketPrice from "../components/PlaceTicketPrice";
import OpeningHours from "../components/OpeningHours";
import PlaceLocation from "../components/PlaceLocation";
import ReviewCards from "../components/ReviewCards";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  // fetch place data from the API
  useEffect(() => {
    console.log(placeId);
    fetch(` http://localhost:1123/api/v1/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => setPlace(data.data.Place))
      .then((err) => setError(err));
  }, [placeId]);

  // review => {rating, title, main_content, date, user_id, place_id, username, profile_photo}
  // fetch place reviews
  useState(() => {
    fetch(` http://localhost:1123/api/v1/reviews/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.reviews);
        setReviews(data.data.reviews);
      });
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
        <div className={styles.info}>
          <PlaceTicketPrice
            egyptianChildPrice={place.egyptian_child_ticket_price}
            egyptianAdultPrice={place.egyptian_adult_ticket_price}
            otherChildPrice={place.foreign_child_ticket_price}
            otherAdultPrice={place.foreign_adult_ticket_price}
          />
          {/* <hr className={styles.vLine}></hr> */}
          <div>
            <OpeningHours
              openingHoursNormal={place.opening_hours_normal}
              openingHoursHoliday={place.opening_hours_holidays}
            />
            <PlaceLocation location={place.location} />
          </div>
        </div>
        <div className={styles.reviewSection}>
          <h3 className={styles.header}>See what visitors are saying</h3>
          <ReviewCards reviews={reviews} />
        </div>
      </div>
    </main>
  );
}

export default PlaceDetails;
