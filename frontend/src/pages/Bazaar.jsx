import styles from "../styles/bazaar.module.css";
import Gift from "../components/Gift";

function Bazaar() {
  const gifts = [];
  for (let i = 0; i < 7; i += 1) {
    gifts.push(<Gift />);
  }

  return (
    <main className={styles.mainBazaar}>
      <div className={styles.bazaarHeader}>
        <h1>The Bazaar</h1>
        <p>Spend your points and get prizes for free</p>
      </div>
      <div className={styles.bazaarContent}>
        <div className={styles.giftContainer}>{gifts.map((gift) => gift)}</div>
      </div>
    </main>
  );
}
export default Bazaar;
