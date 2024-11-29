import styles from "../styles/OpeningHours.module.css";
import { useState } from "react";

function OpeningHours({ openingHoursNormal, openingHoursHoliday }) {
  const [selectedDay, setSelectedDay] = useState("");
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Opening Hours</h3>
      <div className={styles.select}>
        <select
          value={selectedDay}
          onChange={(event) => setSelectedDay(event.target.value)}
          className={styles.dropList}
        >
          <option value="" disabled>
            Choose Day
          </option>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>
        <p>
          {selectedDay == "Friday" || selectedDay == "Saturday"
            ? openingHoursHoliday
            : openingHoursNormal}
        </p>
      </div>
    </div>
  );
}

export default OpeningHours;
