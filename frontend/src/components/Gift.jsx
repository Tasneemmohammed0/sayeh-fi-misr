import styles from "../styles/Gift.module.css";
import { BiCoinStack } from "react-icons/bi";

function Gift({ photo = "../src/assets/images/gift-1.jpg" }) {
  return (
    <main className={styles.mainContainer}>
      <img src={photo} alt="gift 1" className={styles.giftImage}></img>
      <div className={styles.giftDetailsContainer}>
        <div className={styles.priceContainer}>
          <BiCoinStack color="orange" size="1.3rem" />
          <p className={styles.priceText}>198</p>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.giftTitle}>Something Earring</div>
          <div className={styles.giftPlace}>Pyramids of Giza</div>
        </div>
      </div>
    </main>
  );
}

export default Gift;
