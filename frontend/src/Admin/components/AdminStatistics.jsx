import React from "react";
import VistorsCount from "./StatisticsComponents/VistorsCount";
import style from "../styles/AdminStatistics.module.css";
function AdminStatistics() {
  return (
    <div>
      <h2 className={style.header}>AdminStatistics</h2>
      <section className={style.statistics}>
        <VistorsCount />
      </section>
    </div>
  );
}

export default AdminStatistics;
