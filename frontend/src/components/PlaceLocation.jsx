import { FaSearchLocation } from "react-icons/fa";
import styles from "../styles/PlaceLocation.module.css";
function PlaceLocation({ location }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        <FaSearchLocation
          className={styles.icon}
          onClick={() => window.open(location, "_blank")}
        />
        <span onClick={() => window.open(location, "_blank")}>
          View Location on Google Maps
        </span>
      </p>
    </div>
  );
}

export default PlaceLocation;
