import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "./ReportCard";
import styles from "../styles/AdminReports.module.css";
import Loading from "../../components/Loading";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1123/api/v1/reports", {
          withCredentials: true,
        });
        setReports(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return loading ? (
    <Loading />
  ) : reports.length > 0 ? (
    <section className={styles.container}>
      <div className={styles.reportList}>
        {reports.map((report, index) => (
          <ReportCard card={report} key={index} setReports={setReports} />
        ))}
      </div>
    </section>
  ) : (
    <h2>No Reports</h2>
  );
}

export default AdminReports;
