

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineReviews, MdOutlineArrowRightAlt } from "react-icons/md";
import { IoCameraOutline, IoPeopleOutline } from "react-icons/io5";
import Stars from "./Stars";
import styles from "../styles/card.module.css";

function Card({photo="/src/assets/images/temple.png", placeName="Luxor Tempale", location="Luxor ", rate=5,type="place"}) {

  return (
    <div className={styles.card}>
      <div >
        <img src={photo} alt="card image" className={styles.cardImage}  />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{placeName}</h2>
        <div className="rating">{<Stars count={rate}/>}</div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoDiv}>
          <MdOutlineReviews className={styles.cardIcon} />
          <p style={{ fontSize: "12px"}}>Reviews</p>
        </div>
        <div className={styles.cardInfoDiv}>
          <IoCameraOutline className={styles.cardIcon} />
          <p style={{ fontSize: "12px"}}>Photos</p>
        </div>
        <div className={styles.cardInfoDiv}>
          <IoPeopleOutline className={styles.cardIcon} />
          <p style={{ fontSize: "12px"}}>{type=="place" ? "Tours" :  "People"}</p>
        </div>
      </div>
      <div className={styles.location}>
        <FaLocationDot className={`${styles.cardIcon} ${styles.LocationCardIcon}  `} />
        <p style={{ fontSize: "12px"}}>{location}</p>
      </div>
      <div className={styles.dottedLine}></div>
      <div className={styles.cardFooter}>
       {type=="gathering" &&
       <>
        <p className="join">JOIN</p>
        <MdOutlineArrowRightAlt className={styles.rightArrow} />
        </>}
        {
          type=="place" &&
          <p className="details">Read More</p>
        }
      </div>
    </div>
  );
}

export default Card;
