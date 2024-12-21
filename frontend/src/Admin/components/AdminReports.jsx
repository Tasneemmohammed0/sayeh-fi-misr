import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "./ReportCard";
import styles from "../styles/AdminReports.module.css";
import Loading from "../../components/Loading";
import { Toaster, toast } from "sonner";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    if (message == "Failed to resolve report") {
      toast.error(message);
    } else if (message == "Report resolved successfully") {
      toast.success(message);
    }
  }, [message, loading]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <section className={styles.container} id="reports">
        <Toaster richColors />
        <h2 className={styles.header}>Reports</h2>
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
            <ReportCard
              card={report}
              key={index}
              setReports={setReports}
              setLoading={setLoading}
              setMessage={setMessage}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default AdminReports;
