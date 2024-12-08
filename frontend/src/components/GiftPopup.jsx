import React from "react";
import styles from "../styles/GiftPopup.module.css";
import { IoMdClose } from "react-icons/io";

function GiftPopup({ card, handleForm, totalPoints }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.popupClose} onClick={() => handleForm(false)}>
          <IoMdClose />
        </button>

        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <img
              src={card.photo}
              alt="gift image"
              className={styles.giftImage}
            />
          </div>

          <div className={styles.details}>
            <h3 className={styles.title}>{card.name}</h3>
            <p className={styles.description}>{card.description}</p>
            <p className={styles.place}>{card.place_name}</p>
          </div>
        </div>

        <button
          disabled={totalPoints < card.points}
          className={`${styles.btn} ${totalPoints < card.points ? styles.disabled : ""}`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default GiftPopup;
