import styles from "../styles/Gift.module.css";
import { BiCoinStack } from "react-icons/bi";
import { React, useState } from "react";
import GiftPopup from "./GiftPopup";
function Gift({
  photo = "../src/assets/images/gift-1.jpg",
  price = "50",
  title = "Something Earring",
  place = "Pyramids of Giza",
  description = "placeholder for the gift description. It'll contain some details about the gift",
  totalPoints,
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <main className={styles.mainContainer} onClick={() => setShowPopup(true)}>
        <img src={photo} alt="gift 1" className={styles.giftImage}></img>
        <div className={styles.giftDetailsContainer}>
          <div className={styles.priceContainer}>
            <BiCoinStack color="orange" size="1.3rem" />
            <p className={styles.priceText}>{price}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.giftTitle}>{title}</div>
            <div className={styles.giftPlace}>{place}</div>
          </div>
        </div>
      </main>
      {showPopup && (
        <GiftPopup
          photo={photo}
          price={price}
          title={title}
          place={place}
          description={description}
          handleForm={setShowPopup}
          totalPoints={totalPoints}
        />
      )}
    </>
  );
}

export default Gift;
