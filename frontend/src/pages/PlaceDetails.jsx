import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/placeDetails.module.css";
import SeeMoreText from "../components/SeeMoreText";
import PlaceTicketPrice from "../components/PlaceTicketPrice";
import OpeningHours from "../components/OpeningHours";
import PlaceLocation from "../components/PlaceLocation";
import DetailsPlaceCards from "../components/DetailsPlaceCards";
import { IoAddCircleSharp } from "react-icons/io5";
import ReviewForm from "../components/ReviewForm";
import PhotoForm from "../components/PhotoForm";
import Loading from "../components/Loading";
import axios from "axios";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);
  const [finalLoading, setFinalLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingReview, setloadingReview] = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isPhotosFormOpen, setIsPhotosFormOpen] = useState(false);

  // Fetch place details
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
        setPlace(response.data.data);
        setLoadingData(false);
      } catch (err) {
        console.log(err.message);
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setloadingReview(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}/reviews`
        );

        setReviews(response.data.data);
        setloadingReview(false);
      } catch (err) {
        console.log(err.message);
        setloadingReview(false);
      }
    };
    fetchReviews();
  }, []);

  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoadingPhotos(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}/photos`
        );

        setPhotos(response.data.data);
        console.log(response.data.data);
        setLoadingPhotos(false);
        setFinalLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoadingPhotos(false);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <>
      {finalLoading && <Loading />}
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
            <SeeMoreText
              className={styles.breifText}
              text={place.description}
            />
          </div>
          <hr></hr>
          <div className={styles.info}>
            <PlaceTicketPrice
              egyptianChildPrice={place.egyptian_student_ticket_price}
              egyptianAdultPrice={place.egyptian_adult_ticket_price}
              otherChildPrice={place.foreign_student_ticket_price}
              otherAdultPrice={place.foreign_adult_ticket_price}
            />
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
            <DetailsPlaceCards reviews={reviews} />
            <ReviewForm
              isOpen={isReviewFormOpen}
              setIsOpen={setIsReviewFormOpen}
              placeId={placeId}
            />
          </div>
          <hr style={{ margin: "20px" }}></hr>
          <div className={styles.photoSection}>
            <div className={styles.reviewsHeader}>
              <h3>Captured Moments of {place.name} 🌍</h3>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <h5>Got a Shot to Share? Show Us Your Perspective!</h5>

                <IoAddCircleSharp
                  className={styles.addIcon}
                  onClick={() => setIsPhotosFormOpen(!isPhotosFormOpen)}
                />
              </div>
            </div>
            <DetailsPlaceCards photos={photos} />
            <PhotoForm
              isOpen={isPhotosFormOpen}
              setIsOpen={setIsPhotosFormOpen}
              placeId={placeId}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default PlaceDetails;
