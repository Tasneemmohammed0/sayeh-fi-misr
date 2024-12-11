import React from "react";
import styles from "../styles/GiftPopup.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
function GiftPopup({ card, handleForm, totalPoints }) {
  const handlePurchase = async (product_code) => {
    const purchaseData = {
      date: new Date().toISOString(),
      product_code: product_code,
    };

    try {
      const endPoint = `http://localhost:1123/api/v1/bazaar`;

      const response = await axios.post(endPoint, purchaseData, {
        withCredentials: true,
      });
      handleForm(false);
    } catch (err) {
      console.log(err);
    }
  };

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
          onClick={() => handlePurchase(card.product_code)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default GiftPopup;
