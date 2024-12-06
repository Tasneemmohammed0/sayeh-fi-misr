import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { PiParkFill } from "react-icons/pi";
import { HiDocumentReport } from "react-icons/hi";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { Link } from "react-router-dom";
import style from "../styles/Sidebar.module.css";
function Sidebar({ active, setActive }) {
  function handleActive(name) {
    setActive(name);
  }

  return (
    <nav className={style.navbar}>
      <div className={style.info}>
        <div>
          <img
            className={style.image}
            src="../src/assets/images/userAvatar.png"
          />
        </div>
        <h2>
          Hi <span className={style.name}> Hany </span>
        </h2>
      </div>

      <ul className={style.buttons}>
        <li
          className={`${style.btn}  ${active == "Users" ? style.active : ""} `}
          onClick={() => handleActive("Users")}
        >
          <IoPersonCircleOutline />
          Users
        </li>

        <li
          className={`${style.btn}  ${active == "Places" ? style.active : ""} `}
          onClick={() => handleActive("Places")}
        >
          <HiHomeModern />
          Places
        </li>

        <li
          className={`${style.btn}  ${active == "Gatherings" ? style.active : ""} `}
          onClick={() => handleActive("Gatherings")}
        >
          <PiParkFill />
          Gatherings
        </li>

        <li
          className={`${style.btn}  ${active == "Reports" ? style.active : ""} `}
          onClick={() => handleActive("Reports")}
        >
          <HiDocumentReport />
          Reports
        </li>
        <li
          className={`${style.btn}  ${active == "Statistics" ? style.active : ""} `}
          onClick={() => handleActive("Statistics")}
        >
          <IoStatsChartSharp />
          Statistics
        </li>

        <Link to="/">
          <li className={style.btn}>
            <IoIosHome />
            Go To Home
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Sidebar;
