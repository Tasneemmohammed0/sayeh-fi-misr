import styles from "../styles/PlaceTicketPrice.module.css";
function PlaceTicketPrice() {
  return (
    <div className={styles.container}>
      <h3>Ticket Price</h3>
      <div className={styles.tabs}>
        <button className={styles.tab}>Egyptian</button>
        <button className={styles.tab}>Other Nationality</button>
      </div>
    </div>
  );
}

export default PlaceTicketPrice;
