import React, { useEffect, useState } from "react";
import axios from "axios";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import style from "../../styles/AdminStatistics.module.css";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
function AverageRating({ setLoading }) {
  const [city, setCity] = useState("Cairo");

  const [value, setValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const cities = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Luxor",
    "Aswan",
    "Suez",
    "Ismailia",
    "Marsa Matrouh",
    "Al-Beheira",
    "Kafr al-Sheikh",
    "Gharbiyya",
    "Sharqiyya",
    "Fayyum",
    "Beni Suef",
    "Minya",
    "Asyut",
    "New Valley",
    "Sohag",
    "Qena",
    "The Red Sea",
    "South Sinai",
  ];

  useEffect(() => {
    async function fetchMostPopularGathering() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/stats/ratings/${city}`,
          {
            withCredentials: true,
          }
        );
        setValue(Number(+response.data.data.rate).toFixed(2));

        // console.log(res.data);
        setErrorMessage("");
      } catch (err) {
        console.log(err);
        setErrorMessage(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMostPopularGathering();
  }, [city]);

  let settings = {
    width: 200,
    height: 200,
    value: value,
    valueMax: 5,
    animation: true,
  };
  return (
    <div className={style.card}>
      <h3 className={style.header}>City Average Ratings</h3>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={style.select}
      >
        {cities.map((city, index) => (
          <option key={index} value={city} className={style.option}>
            {city}
          </option>
        ))}
      </select>
      {errorMessage ? (
        <ErrorMessage error={errorMessage} />
      ) : (
        <Gauge
          {...settings}
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
            },
            [`& .${gaugeClasses.valueText} text`]: {
              fill: "gold",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#E9932F",
            },
          })}
        />
      )}
    </div>
  );
}

export default AverageRating;
