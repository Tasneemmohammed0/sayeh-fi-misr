import styles from "../styles/ReviewCard.module.css";
import { useState } from "react";

function ReviewCard({ placeId }) {
  // fetch all reviews of a certian place => getPlaceReviews API
  // review => {rating, title, main_content, date, user_id, place_id}
  // from user_id => get {username, profile photo}
  const [reviews, setReviews] = useState([]);
  const [username, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");

  useState(() => {
    fetch(` http://localhost:1123/api/v1/reviews/${placeId}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [placeId]);

  return (
    <div className={styles.container}>
      {/* <Stars/> */}
      <div className={styles.userInfo}>
        <img className={styles.profileImage} src={userProfile} />
        <h3 className={styles.username}>{username}</h3>
      </div>
    </div>
  );
}

export default ReviewCard;
