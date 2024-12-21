import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/TopNationalities.module.css";

function TopNationalities({ setLoading }) {
  const [nationalitiesData, setNationalitiesData] = useState([]);

  useEffect(() => {
    const fetchNationalitiesData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1123/api/v1/stats/nationalities",
          {
            withCredentials: true,
          }
        );
        if (response.data.status !== "fail") {
          setNationalitiesData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNationalitiesData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Top Nationalities</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.thead}>
            <th className={styles.th}>#</th>
            <th className={styles.th}>Nationality</th>
            <th className={styles.th}>Count</th>
          </tr>
        </thead>
        <tbody>
          {nationalitiesData.map((item, index) => (
            <tr key={index} className={styles.tr}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{item.nationality}</td>
              <td className={styles.td}>{item.user_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopNationalities;
