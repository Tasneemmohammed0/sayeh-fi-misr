import { BiCoinStack } from "react-icons/bi";
import styles from "../styles/bazaar.module.css";
import Gift from "../components/Gift";

function Bazaar({ totalPoints = 198 }) {
  const gifts = [];
  for (let i = 0; i < 7; i += 1) {
    gifts.push(<Gift key={i} />);
  }

  return (
    <main className={styles.mainBazaar}>
      <div className={styles.bazaarHeader}>
        <h1>The Bazaar</h1>
        <p>Spend your points and get prizes for free</p>
      </div>
      <div className={styles.bazaarContent}>
        <div className={styles.pointsContainer}>
          <div className={styles.pointsBox}>
            <p className={styles.yourPoints}>Your Points:</p>

            <p className={styles.points}>
              <BiCoinStack size="1.3rem" color="orange" /> {totalPoints}
            </p>
          </div>
        </div>
        <div className={styles.giftContainer}>{gifts}</div>
      </div>
    </main>
  );
}
export default Bazaar;
