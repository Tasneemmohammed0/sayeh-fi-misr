import React, { useEffect, useState } from "react";
import axios from "axios";
import Gift from "../../components/Gift";
import styles from "../styles/AdminBazaar.module.css";
function AdminBazaar() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = `http://localhost:1123/api/v1/bazaar`;

        const response = await axios.get(endpoint);
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setLoading(false);
        setGifts(response.data.data);
        console.log("==========Gift", response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.mainBazaar}>
      <div className={styles.giftContainer}>
        {gifts.map((item, index) => (
          <Gift key={index} card={item} role="admin" setGifts={setGifts} />
        ))}
      </div>
    </div>
  );
}

export default AdminBazaar;
