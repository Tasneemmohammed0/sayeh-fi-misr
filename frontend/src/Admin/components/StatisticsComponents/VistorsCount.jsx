import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

function VisitorsCount() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchVisitorsData = async () => {
      try {
        const res = await axios.get("http://localhost:1123/api/stats/users");
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
      }
    };

    fetchVisitorsData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Visitors Count</h2>
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
