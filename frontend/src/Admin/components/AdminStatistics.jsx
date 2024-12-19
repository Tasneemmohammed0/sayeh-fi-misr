import React from "react";
import VistorsCount from "./StatisticsComponents/VistorsCount";
import TopNationalities from "./StatisticsComponents/TopNationalities";
import MostPopularGathering from "./StatisticsComponents/MostPopularGathering";
import LastWeekVisits from "./StatisticsComponents/LastWeekVisits";
import style from "../styles/AdminStatistics.module.css";
import DetailedStats from "./StatisticsComponents/DetailedStats";
function AdminStatistics() {
  return (
    <div id="statistics">
      <h2 className={style.header}>AdminStatistics</h2>
      <section className={style.statistics}>
        <VistorsCount />
        <TopNationalities />
        <LastWeekVisits />
        <MostPopularGathering />
        <DetailedStats />
      </section>
    </div>
  );
}

export default AdminStatistics;
