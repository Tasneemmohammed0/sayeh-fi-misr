import React, { useState, useEffect } from "react";
import styles from "../styles/GiftPopup.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
function GiftPopup({ card, handleForm, totalPoints, updatePoints }) {
  const [message, setMessage] = useState("");
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
        // toast.success("");
        console.log(response.data);

        setMessage(
          "Gift purchased successfully order code  : " +
            response.data.data.order_id
        );
        //Update points
        const newTotalPoints = totalPoints - card.points;
        updatePoints(newTotalPoints);

        setTimeout(() => {
          handleForm(false);
        }, 0);
      }
    } catch (err) {
      console.log(err);
      toast.error("Purchase failed");
    }
  };

  useEffect(() => {
    if (message !== "") {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${message} `,
        showConfirmButton: true,
      });
      setMessage("");
    }
  }, [message]);

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
