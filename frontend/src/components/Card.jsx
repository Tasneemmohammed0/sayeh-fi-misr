import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineReviews, MdOutlineArrowRightAlt } from "react-icons/md";
import { IoCameraOutline, IoPeopleOutline } from "react-icons/io5";
import "../styles/Card.css";

function Card() {
  const [photo, setPhoto] = useState(
    "images/photo-1502250493741-939d1c76eaad.png"
  );
  const [placeName, setplaceName] = useState("Karnak Temple");
  const [rate, setRate] = useState(3);
  const [location, setLocation] = useState("Egypt, Cairo, Luxor");

  function renderStars() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push(<FaStar className="star-icon" key={i} />);
      }
    }
    return stars;
  }

  return (
    <div className="card">
      <div className="card-image">
        <img src={photo} alt="card image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{placeName}</h2>
        <div className="rating">{renderStars()}</div>
      </div>
      <div className="card-info">
        <div>
          <MdOutlineReviews className="card-icon" />
          <p>Reviews</p>
        </div>
        <div>
          <IoCameraOutline className="card-icon" />
          <p>Photos</p>
        </div>
        <div>
          <IoPeopleOutline className="card-icon" />
          <p>People</p>
        </div>
      </div>
      <div className="location">
        <FaLocationDot className="card-icon" />
        <p>{location}</p>
      </div>
      <div className="dotted-line"></div>
      <div className="card-footer">
        <p className="join">JOIN</p>
        <MdOutlineArrowRightAlt className="right-arrow" />
      </div>
    </div>
  );
}

export default Card;
