import styles from "../styles/bazaar.module.css";
import Gift from "../components/Gift";

function Bazaar() {
  return (
    <main className={styles.mainBazaar}>
      <div className={styles.bazaarHeader}>
        <h1>The Bazaar</h1>
        <p>Spend your points and get prizes for free</p>
      </div>
      <div className={styles.bazaarContent}>
        <div className={styles.cardsContainer}>
          <Gift />
          <Gift />
          <Gift />
          <Gift />
        </div>
      </div>
    </main>
  );
}
export default Bazaar;
