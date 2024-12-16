/* eslint-disable react/prop-types */
import styles from "../styles/GatheringInfo.module.css";
import {
  FaCalendarAlt,
  FaClock,
  FaHourglassHalf,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";

// format date and time
function formatDate(date) {
  const newDate = new Date(date);

  // Format as day/month/year
  const formattedDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;

  // Format time as hour: minute
  let hours = newDate.getHours();
  const mins = newDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12; // convert 24-hour to 12-hour time

  const formattedTime = `${hours}:${mins.toString().padStart(2, "0")} ${ampm}`;
  return { formattedDate, formattedTime };
}

function GatheringInfo({ gathering, currentCapacity }) {
  const { formattedDate, formattedTime } = formatDate(gathering.gathering_date);

  return (
    <div className={styles.container}>
      <div className={styles.detailItem}>
        <FaCalendarAlt className={styles.icon} />
        <p>Date: {formattedDate}</p>
      </div>
      <div className={styles.detailItem}>
        <FaClock className={styles.icon} />
        <p>Start Time: {formattedTime}</p>
      </div>
      <div className={styles.detailItem}>
        <FaHourglassHalf className={styles.icon} />
        {gathering.duration && <p>Duration: {gathering.duration}h</p>}
      </div>
      <div className={styles.detailItem}>
        <FaUsers className={styles.icon} />
        {currentCapacity && <span>Current Capacity: {currentCapacity}</span>}
        {gathering.max_capacity && (
          <span className={styles.maxCapacity}>
            Max Capacity: {gathering.max_capacity}
          </span>
        )}
      </div>
    </div>
  );
}

export default GatheringInfo;
