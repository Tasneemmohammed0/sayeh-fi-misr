import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import style from "../../styles/AdminStatistics.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LastWeekVisits() {
  const [counts, setCounts] = useState([]);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:1123/api/v1/stats/place/5",
          {
            withCredentials: true,
          }
        );

        if (res.data && res.data.status !== "fail" && res.data.data) {
          const validData = res.data.data.filter(
            (item) => item.visit_count != null && item.visit_date
          );

          const counts = validData.map((item) => item.visit_count);
          const days = validData.map((item) => item.visit_date);

          setCounts(counts);
          setDays(days);
        } else {
          console.error("Invalid API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (days.length === 0 || counts.length === 0) {
    return <p>No data available for the last week.</p>;
  }

  const data = {
    labels: days, // X-axis labels
    datasets: [
      {
        label: "Visits",
        data: counts, // Y-axis data
        borderColor: "#DE9033",
        backgroundColor: "#DE9033",
        tension: 0, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Visit Count",
        },
        beginAtZero: true,
        suggestedMax: Math.max(...counts) + 5, // Set max value for Y-axis
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio for custom sizing
  };

  return (
    <div className={style.graph}>
      <div>
        <h2 className={style.header}>Last Week Visits</h2>
        {/* <select name="" id=""></select> */}
      </div>
      <div style={{ height: "400px", width: "100%", padding: "20px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LastWeekVisits;