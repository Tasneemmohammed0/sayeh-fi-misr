/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";

import { PiMapPinLight } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import styles from "../styles/userinfo.module.css";
import { Link } from "react-router-dom";
// <HiOutlineMail />

function UserInfo({
  user,
  selectedList,
  setSelectedList,
  canEdit,
  stats,
  setStats,
}) {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setSelectedList(hash.charAt(0).toUpperCase() + hash.slice(1));
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [setSelectedList]);

  // Badges Logic
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/badges/${user.user_id}`
        );
        setBadges(response.data.data);
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    if (user?.user_id) fetchBadges();
  }, [user]);

  // User Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/stats/${user.user_id}`
        );
        setStats(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  selectedList = selectedList || "Reviews";
  return (
    <section className="container ">
      <div className={styles.userWrapper}>
        <div className={styles.info}>
          <img
            src={
              user.profile_pic
                ? user.profile_pic
                : "../src/assets/images/userAvatar.png"
            }
            alt="user profile"
            className={styles.avater}
          />
          <h2
            style={{
              marginTop: "20px",
              marginBottom: "20px ",
              alignSelf: "center",
            }}
          >
            {user.username}
          </h2>
          <div>
            <p className={styles.p}>
              <PiMapPinLight style={{ fontSize: "20px" }} /> Lives in{" "}
              {user.city}, {user.country}
            </p>
            <p className={styles.p}>
              <HiOutlineMail style={{ fontSize: "20px" }} /> {user.email}
            </p>
            {canEdit && (
              <Link to="accountsetting">
                <p className={styles.p}>
                  <FiSettings style={{ fontSize: "20px" }} /> Edit Profile
                </p>
              </Link>
            )}
          </div>
        </div>
        <div className={styles.info}>
          <ul className={styles.statistics}>
            <li className={styles.statisticsItem}>
              <span style={{ fontSize: "30px", marginBottom: "5px" }}>
                {stats.places_count}
              </span>
              <span>Places Visited</span>
            </li>
            <li className={styles.statisticsItem}>
              <span style={{ fontSize: "30px", marginBottom: "5px" }}>
                {stats.reviews_count}
              </span>
              <span>Reviews</span>
            </li>
            <li className={styles.statisticsItem}>
              <span style={{ fontSize: "30px", marginBottom: "5px" }}>
                {stats.photos_count}
              </span>
              <span>Photos</span>
            </li>
          </ul>
          {badges.length > 0 && (
            <div>
              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Badges Earned
              </h3>
              <div className={styles.badgeContainer}>
                {badges.map((badge, index) => (
                  <div key={index} className={styles.badgeWrapper}>
                    <img
                      src={badge.icon}
                      alt={badge.name}
                      className={styles.badge}
                    />
                    <span className={styles.badgeName}>{badge.name}</span>
                    <div className={styles.tooltip}>
                      <p>{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ul className={styles.lists}>
        <a
          href="#reviews"
          style={{ color: "black" }}
          onClick={() => setSelectedList("Reviews")}
        >
          {" "}
          <li
            className={`${styles.listItem} ${selectedList === "Reviews" ? styles.active : ""}`}
          >
            Reviews
          </li>
        </a>
        <a
          href="#wishlist"
          style={{ color: "black" }}
          onClick={() => setSelectedList("Wishlist")}
        >
          <li
            className={`${styles.listItem} ${selectedList === "Wishlist" ? styles.active : ""}`}
          >
            Wish List
          </li>
        </a>
        <a
          href="#visitedlist"
          style={{ color: "black" }}
          onClick={() => setSelectedList("Visitedlist")}
        >
          <li
            className={`${styles.listItem} ${selectedList === "Visitedlist" ? styles.active : ""}`}
          >
            Visted List
          </li>
        </a>
        <a
          href="#gatheringlist"
          style={{ color: "black" }}
          onClick={() => setSelectedList("Gatheringlist")}
        >
          <li
            className={`${styles.listItem} ${selectedList === "Gatheringlist" ? styles.active : ""}`}
          >
            Gathering
          </li>
        </a>

        <a
          href="#photos"
          style={{ color: "black" }}
          onClick={() => setSelectedList("Photos")}
        >
          <li
            className={`${styles.listItem} ${selectedList === "Photos" ? styles.active : ""}`}
          >
            Photos
          </li>
        </a>
      </ul>
    </section>
  );
}

export default UserInfo;
