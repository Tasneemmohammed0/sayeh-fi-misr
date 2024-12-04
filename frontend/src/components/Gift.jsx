import styles from "../styles/Gift.module.css";
import { BiCoinStack } from "react-icons/bi";

function Gift({
  photo = "../src/assets/images/gift-1.jpg",
  price = "198",
  title = "Something Earring",
  place = "Pyramids of Giza",
  description = "placeholder for the gift description. It'll contain some details about the gift",
}) {
  return (
    <main className={styles.mainContainer}>
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
  );
}

export default Gift;
