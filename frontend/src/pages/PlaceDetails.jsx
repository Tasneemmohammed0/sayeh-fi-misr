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
import AddToListForm from "../components/AddToListForm";
import Loading from "../components/Loading";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import NavBar from "../components/NavBar";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [isVisited, setIsVisited] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [isPhotosFormOpen, setIsPhotosFormOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  // Fetch place details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFinalLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}`
        );

        const data = response.data.data;
        setPlace(data.place);
        setReviews(data.reviews);
        setPhotos(data.photos);
        setFinalLoading(false);
      } catch {
        setFinalLoading(false);
      }
    };
    fetchData();
  }, [triggerFetch, placeId]);

  // check if the place is visited
  useEffect(() => {
    const checkVisited = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}/checkVisited`,
          { withCredentials: true }
        );

        setIsVisited(response.data.data);
      } catch (err) {
        toast(err.response.data.message);
      }
    };
    checkVisited();
  }, []);

  // Scroll to the target section when hash changes
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.slice(1);

      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Handle visited
  async function handleVisited() {
    try {
      if (isVisited) {
        toast("This place is already in your visited list");
        return;
      }

      const date = new Date().toISOString();

      const res = await axios.post(
        `http://localhost:1123/api/v1/places/${placeId}/addToVisitedList`,
        { date },
        {
          withCredentials: true,
        }
      );

      setIsVisited((isVisited) => !isVisited);
    } catch (err) {
      toast(err.response.data.message);
    }
  }

  function handleBookmark() {
    setIsBookmarked((isBookmarked) => !isBookmarked);
  }

  return (
    <>
      {finalLoading && <Loading />}
      <ToastContainer />
      <main className={styles.main}>
        <NavBar open={false} />
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${place.photo})` }}
        >
          {isBookmarked ? (
            <>
              <FaBookmark
                onClick={handleBookmark}
                className={styles.bookmarkIcon}
              />
              <AddToListForm
                isOpen={isBookmarked}
                setIsOpen={setIsBookmarked}
                placeId={placeId}
              />
            </>
          ) : (
            <FaRegBookmark
              onClick={handleBookmark}
              className={styles.bookmarkIcon}
            />
          )}
          <h1 className={styles.title}>{place.name}</h1>
          {isVisited && <button className={styles.visitLabel}>VISITED</button>}
        </div>
        <div className={styles.container}>
          <div className={styles.breif}>
            <h3>Breif</h3>
            <SeeMoreText text={place.description} />
          </div>
          <div className={styles.placeBtns}>
            <div className={styles.btnContainer}>
              <IoAddCircleSharp
                onClick={handleVisited}
                className={styles.addIcon}
              />
              <p className={styles.btnLabel} onClick={handleVisited}>
                Visited
              </p>
            </div>

            <div className={styles.btnContainer}>
              <IoAddCircleSharp
                onClick={() => setIsReportFormOpen(true)}
                className={styles.addIcon}
              />
              <p
                className={styles.btnLabel}
                onClick={() => setIsReportFormOpen(true)}
              >
                Add Report
              </p>
            </div>
          </div>
          <hr className={styles.horizontalLine}></hr>
          <section id="info" className={styles.info}>
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
              <PlaceLocation location={place.location} name={place.name} />
            </div>
          </section>
          <hr></hr>
          <section id="reviews" className={styles.reviewSection}>
            <div className={styles.reviewsHeader}>
              <h3>See what visitors are saying</h3>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <h5 onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}>
                  Share Your Review
                </h5>

                <IoAddCircleSharp
                  className={styles.addIcon}
                  onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                />
              </div>
            </div>
            <DetailsPlaceCards reviews={reviews} />
            <ReviewForm
              isOpen={isReportFormOpen}
              setIsOpen={setIsReportFormOpen}
              placeId={placeId}
              isReport={true}
            />
            <ReviewForm
              setTriggerFetch={setTriggerFetch}
              triggerFetch={triggerFetch}
              isOpen={isReviewFormOpen}
              setIsOpen={setIsReviewFormOpen}
              placeId={placeId}
              isReport={false}
            />
          </section>
          <hr style={{ margin: "20px" }}></hr>

          <section id="photos" className={styles.photoSection}>
            <div className={styles.reviewsHeader}>
              <h3>Captured Moments of {place.name} 🌍</h3>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <h5 onClick={() => setIsPhotosFormOpen(!isPhotosFormOpen)}>
                  Got a Shot to Share? Show Us Your Perspective!
                </h5>

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
              setTriggerFetch={setTriggerFetch}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default PlaceDetails;
