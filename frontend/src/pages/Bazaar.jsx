import { BiCoinStack } from "react-icons/bi";
import styles from "../styles/bazaar.module.css";
import Gift from "../components/Gift";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";

function Bazaar({ totalPoints = 198 }) {
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
        console.log(response.data.data);
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.mainBazaar}>
      <div className={styles.bazaarHeader}>
        <h1>The Bazaar</h1>
        <p>Spend your points and get prizes for free</p>
      </div>
      <div className={styles.bazaarContent}>
        <div className={styles.pointsContainer}>
          <div className={styles.pointsBox}>
            <p className={styles.yourPoints}>Your Points:</p>

            <p className={styles.points}>
              <BiCoinStack size="1.3rem" color="orange" /> {totalPoints}
            </p>
          </div>
        </div>
        <div className={styles.giftContainer}>
          {gifts.map((item, index) => (
            <Gift key={index} card={item} totalPoints={totalPoints} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Bazaar;
