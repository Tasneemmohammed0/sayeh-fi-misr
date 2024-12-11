import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "./ReportCard";
import styles from "../styles/AdminReports.module.css";
import Loading from "../../components/Loading";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1123/api/v1/reports", {
          withCredentials: true,
        });
        res.data.data.places_reports.forEach((report) => {
          report.type = "Place";
        });
        res.data.data.gatherings_reports.forEach((report) => {
          report.type = "Gathering";
        });
        const combinedReports = [
          ...(res.data.data.places_reports || []),
          ...(res.data.data.gatherings_reports || []),
        ];

        console.log(combinedReports);
        setReports(combinedReports);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    if (filter === "" || filter === "All") {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter((report) => report.type === filter));
    }
  }, [filter, reports]);

  return loading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <div className={styles.filter}>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className={styles.select}
        >
          <option value="" disabled>
            Filter by Type
          </option>
          <option value="All">All</option>
          <option value="Place">Place</option>
          <option value="Gathering">Gathering</option>
        </select>
      </div>
      <div className={styles.reportList}>
        {filteredReports.map((report, index) => (
          <ReportCard card={report} key={index} setReports={setReports} />
        ))}
      </div>
    </section>
  );
}

export default AdminReports;
