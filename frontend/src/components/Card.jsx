

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineReviews, MdOutlineArrowRightAlt } from "react-icons/md";
import { IoCameraOutline, IoPeopleOutline } from "react-icons/io5";
import Stars from "./Stars";
import "../styles/Card.css";

function Card({photo="/src/assets/images/temple.png", placeName="Luxor Tempale", location="Luxor ", rate=5}) {

  return (
    <div className="card">
      <div className="card-image">
        <img src={photo} alt="card image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{placeName}</h2>
        <div className="rating">{<Stars count={rate}/>}</div>
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
