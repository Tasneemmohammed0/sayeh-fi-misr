import React, { useState } from "react";
import Loading from "../../components/Loading";
import VistorsCount from "./StatisticsComponents/VistorsCount";
import TopNationalities from "./StatisticsComponents/TopNationalities";
import MostPopularGathering from "./StatisticsComponents/MostPopularGathering";
import LastWeekVisits from "./StatisticsComponents/LastWeekVisits";
import style from "../styles/AdminStatistics.module.css";
import AverageRating from "./StatisticsComponents/AverageRating";
import CountsByType from "./StatisticsComponents/CountsByType";

function AdminStatistics() {
  const [loadingStates, setLoadingStates] = useState({
    vistorsCount: false,
    topNationalities: false,
    lastWeekVisits: false,
    mostPopularGathering: false,
    averageRating: false,
    countsByType: false,
  });

  // Determine global loading state
  const loading = Object.values(loadingStates).some((isLoading) => isLoading);

  const setLoading = (componentName, isLoading) => {
    setLoadingStates((prev) => ({
      ...prev,
      [componentName]: isLoading,
    }));
  };

  return (
    <>
      {loading && <Loading />}
      <div id="statistics">
        <h2 className={style.header}>AdminStatistics</h2>
        <section className={style.statistics}>
          <VistorsCount
            setLoading={(isLoading) => setLoading("vistorsCount", isLoading)}
          />
          <TopNationalities
            setLoading={(isLoading) =>
              setLoading("topNationalities", isLoading)
            }
          />
          <LastWeekVisits
            setLoading={(isLoading) => setLoading("lastWeekVisits", isLoading)}
          />
          <MostPopularGathering
            setLoading={(isLoading) =>
              setLoading("mostPopularGathering", isLoading)
            }
          />
          <AverageRating
            setLoading={(isLoading) => setLoading("averageRating", isLoading)}
          />
          <CountsByType
            setLoading={(isLoading) => setLoading("countsByType", isLoading)}
          />
        </section>
      </div>
    </>
  );
}

export default AdminStatistics;
