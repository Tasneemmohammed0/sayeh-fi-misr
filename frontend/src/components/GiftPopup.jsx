import React from "react";
import styles from "../styles/GiftPopup.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function GiftPopup({ card, handleForm, totalPoints, updatePoints }) {
  const handlePurchase = async (product_code) => {
    const purchaseData = {
      date: new Date().toISOString(),
      product_code: product_code,
    };

    try {
      const endPoint = `http://localhost:1123/api/v1/bazaar/buy`;

      const response = await axios.post(endPoint, purchaseData, {
        withCredentials: true,
      });
      if (response.status == 200) {
        //close the popup
        toast.success("Congrats! Your purchase completed successfully");
        //Update points
        const newTotalPoints = totalPoints - card.points;
        updatePoints(newTotalPoints);
        //

        setTimeout(() => {
          handleForm(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Purchase failed");
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <ToastContainer />
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
