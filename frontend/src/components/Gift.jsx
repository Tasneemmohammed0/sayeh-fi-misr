import styles from "../styles/Gift.module.css";
import { BiCoinStack } from "react-icons/bi";
import { React, useState, useContext, useEffect } from "react";
import GiftPopup from "./GiftPopup";
import axios from "axios";
import Loading from "../../src/components/Loading";

function Gift({ card, totalPoints, updatePoints, role = "user", setGifts }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleActivation = async () => {
    if (role !== "admin") return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:1123/api/v1/bazaar/${card.product_code}`,
        {
          is_available: !card.is_available,
        },
        {
          withCredentials: true,
        }
      );
      setGifts((prevGifts) =>
        prevGifts.map((item) =>
          item.product_code === card.product_code
            ? { ...item, is_available: !item.is_available }
            : item
        )
      );
    } catch (err) {
      console.error("Error activating gift:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <main
        className={styles.mainContainer}
        style={role === "admin" ? { height: "21rem" } : undefined}
        onClick={() => setShowPopup(true)}
      >
        <img src={card.photo} alt="gift 1" className={styles.giftImage}></img>
        <div className={styles.giftDetailsContainer}>
          <div className={styles.priceContainer}>
            <BiCoinStack color="orange" size="1.3rem" />
            <p className={styles.priceText}>{card.points}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.giftTitle}>{card.name}</div>
            <div
              className={styles.giftPlace}
              style={{
                fontSize: `${card.place_name.length > 35 ? "10px" : "14px"}`, // Corrected spacing
              }}
            >
              {card.place_name}
            </div>
          </div>
        </div>
        {role === "admin" && (
          <div className={styles.activationContainer}>
            <p className={styles.status}>
              Status:
              <span
                style={{
                  color: card.is_available ? "green" : "red",
                }}
              >
                {card.is_available ? "Active" : "InActive"}
              </span>
            </p>
            <button
              onClick={handleActivation}
              className={styles.actionBtn}
              style={{
                backgroundColor: card.is_available ? "red" : "green",
                color: "white",
              }}
            >
              {card.is_available ? "DeActivate" : "Activate"}
            </button>
          </div>
        )}
      </main>

      {role !== "admin" && showPopup && (
        <GiftPopup
          card={card}
          handleForm={setShowPopup}
          totalPoints={totalPoints}
          updatePoints={updatePoints}
        />
      )}
    </>
  );
}

export default Gift;
