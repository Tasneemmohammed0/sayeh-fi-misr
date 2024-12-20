import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import axios from "axios";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import style from "../../styles/AdminStatistics.module.css";

// const dataset = [
//   {
//     type: "Historical",
//     visitCount: 150,
//     reviewCount: 200,
//     photosCount: 250,
//     gatheringCount: 100,
//   },
//   {
//     type: "Museums",
//     visitCount: 120,
//     reviewCount: 180,
//     photosCount: 220,
//     gatheringCount: 90,
//   },
//   {
//     type: "Religious",
//     visitCount: 170,
//     reviewCount: 210,
//     photosCount: 260,
//     gatheringCount: 110,
//   },
//   {
//     type: "Saqqara & Dahshur",
//     visitCount: 130,
//     reviewCount: 190,
//     photosCount: 240,
//     gatheringCount: 95,
//   },
// ];

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: "Count",
      labelStyle: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
      },
    },
  ],
  width: 800,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label} tspan`]: {
      dy: "20px",
    },
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
      fontSize: "14px",
      fontWeight: "bold",
      fill: "#333",
    },
  },
};

function CountsByType() {
  const [dataset, setDataSet] = useState([]);
  useEffect(() => {
    const fetchActivitiesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/stats/activities`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status !== "fail") {
          const transformedData = response.data.data.map((item) => ({
            type: item.type,
            visitCount: +item.visits_count,
            gatheringCount: +item.gatherings_count,
            reviewCount: +item.reviews_count,
            photosCount: +item.photos_count,
            reportsCount: +item.reports_count,
          }));
          setDataSet(transformedData);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchActivitiesData();
  }, []);

  return (
    <div
      className={style.graph}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 className={style.header}>Counts By Type</h2>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "type" }]}
        series={[
          { dataKey: "visitCount", label: "Visit Count", valueFormatter },
          { dataKey: "reviewCount", label: "Review Count", valueFormatter },
          { dataKey: "photosCount", label: "Photos Count", valueFormatter },
          {
            dataKey: "gatheringCount",
            label: "Gathering Count",
            valueFormatter,
          },
          { dataKey: "reportsCount", label: "Reports Count", valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

export default CountsByType;
