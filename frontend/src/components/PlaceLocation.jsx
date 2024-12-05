import { FaSearchLocation } from "react-icons/fa";
import styles from "../styles/PlaceLocation.module.css";
function PlaceLocation({ location, name }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        <FaSearchLocation
          className={styles.icon}
          onClick={() => window.open(location, "_blank")}
        />
        <span onClick={() => window.open(location, "_blank")}>{name}</span>
      </p>
    </div>
  );
}

export default PlaceLocation;
