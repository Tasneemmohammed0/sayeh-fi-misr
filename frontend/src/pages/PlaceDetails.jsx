import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/placeDetails.module.css";
import SeeMoreText from "../components/SeeMoreText";
import PlaceTicketPrice from "../components/PlaceTicketPrice";
import OpeningHours from "../components/OpeningHours";
import PlaceLocation from "../components/PlaceLocation";
import ReviewCards from "../components/ReviewCards";
import { IoAddCircleSharp } from "react-icons/io5";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}/reviews`
        );
        console.log(response.data.data);
        setReviews(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchReviews();
  }, []);

  return (
    <main className={styles.main}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${place.photo})` }}
      >
        <h1 className={styles.title}>{place.name}</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.breif}>
          <h3>Breif</h3>
          <SeeMoreText className={styles.breifText} text={place.description} />
        </div>
        <hr></hr>
        <div className={styles.info}>
          <PlaceTicketPrice
            egyptianChildPrice={place.egyptian_student_ticket_price}
            egyptianAdultPrice={place.egyptian_adult_ticket_price}
            otherChildPrice={place.foreign_student_ticket_price}
            otherAdultPrice={place.foreign_adult_ticket_price}
          />
          {/* <hr className={styles.vLine}></hr> */}
          <div>
            <OpeningHours
              openingHoursNormal={place.opening_hours_working_days}
              openingHoursHoliday={place.opening_hours_holidays}
            />
            <PlaceLocation location={place.location} />
          </div>
        </div>
        <hr></hr>
        <div className={styles.reviewSection}>
          <div className={styles.reviewsHeader}>
            <h3>See what visitors are saying</h3>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <h5>Share Your Review</h5>

              <IoAddCircleSharp
                className={styles.addIcon}
                onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              />
            </div>
          </div>
          <ReviewCards reviews={reviews} />
          <ReviewForm
            isOpen={isReviewFormOpen}
            setIsOpen={setIsReviewFormOpen}
            placeId={placeId}
          />
        </div>
      </div>
    </main>
  );
}

export default PlaceDetails;
