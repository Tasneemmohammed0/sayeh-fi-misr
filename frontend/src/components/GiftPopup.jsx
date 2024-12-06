import React from "react";
import styles from "../styles/GiftPopup.module.css";
import { IoMdClose } from "react-icons/io";

function GiftPopup({
  photo,
  price,
  title,
  place,
  description,
  handleForm,
  totalPoints,
}) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        {/* Close Button */}
        <button className={styles.popupClose} onClick={() => handleForm(false)}>
          <IoMdClose />
        </button>
        {/* Content Wrapper */}
        <div className={styles.contentWrapper}>
          {/* Gift Image */}
          <div className={styles.imageContainer}>
            <img src={photo} alt="gift image" className={styles.giftImage} />
          </div>
          {/* Gift Details */}
          <div className={styles.details}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {/* <p className={styles.place}>{place}</p> */}
          </div>
        </div>
        {/* Buy Button */}
        <button
          disabled={totalPoints < price}
          className={`${styles.btn} ${totalPoints < price ? styles.disabled : ""}`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default GiftPopup;
