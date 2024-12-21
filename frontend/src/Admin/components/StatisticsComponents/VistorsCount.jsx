import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import style from "../../styles/AdminStatistics.module.css";
function VisitorsCount({ setLoading }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchVisitorsData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:1123/api/v1/stats/users",
          {
            withCredentials: true,
          }
        );

        if (res.data.status !== "fail") {
          const formattedData = res.data.data.map((item, index) => ({
            id: index,
            value: item.count,
            label: item.role,
          }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorsData();
  }, []);

  return (
    <div className={style.card}>
      <h2 style={{ margin: "20px 0" }}>Visitors Count</h2>
      <PieChart
        series={[
          {
            data: chartData,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default VisitorsCount;
