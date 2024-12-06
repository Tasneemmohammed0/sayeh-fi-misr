import styles from "../styles/Gift.module.css";
import { BiCoinStack } from "react-icons/bi";
import { React, useState } from "react";
import GiftPopup from "./GiftPopup";
function Gift({ card, totalPoints }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <main className={styles.mainContainer} onClick={() => setShowPopup(true)}>
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
                fontSize: `${card.place_name.length > 35 ? "10px" : " 14px"} `,
              }}
            >
              {card.place_name}
            </div>
          </div>
        </div>
      </main>
      {showPopup && (
        <GiftPopup
          card={card}
          handleForm={setShowPopup}
          totalPoints={totalPoints}
        />
      )}
    </>
  );
}

export default Gift;
