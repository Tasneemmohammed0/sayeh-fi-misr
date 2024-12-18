import React from "react";
import VistorsCount from "./StatisticsComponents/VistorsCount";
import TopNationalities from "./StatisticsComponents/TopNationalities";
import style from "../styles/AdminStatistics.module.css";
function AdminStatistics() {
  return (
    <div>
      <h2 className={style.header}>AdminStatistics</h2>
      <section className={style.statistics}>
        <VistorsCount />
        <TopNationalities />
      </section>
    </div>
  );
}

export default AdminStatistics;
