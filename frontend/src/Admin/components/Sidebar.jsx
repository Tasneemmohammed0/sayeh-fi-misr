import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { PiParkFill } from "react-icons/pi";
import { HiDocumentReport } from "react-icons/hi";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { BsShop } from "react-icons/bs";
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
          <Link to="#Users" className={style.link}>
            <IoPersonCircleOutline />
            Users
          </Link>
        </li>

        <li
          className={`${style.btn}  ${active == "Places" ? style.active : ""} `}
          onClick={() => handleActive("Places")}
        >
          <Link to="#Places" className={style.link}>
            <HiHomeModern />
            Places
          </Link>
        </li>

        <li
          className={`${style.btn}  ${active == "Gatherings" ? style.active : ""} `}
          onClick={() => handleActive("Gatherings")}
        >
          <Link to="/gatherings" className={style.link}>
            <PiParkFill />
            Gatherings
          </Link>
        </li>

        <li
          className={`${style.btn}  ${active == "Reports" ? style.active : ""} `}
          onClick={() => handleActive("Reports")}
        >
          <Link to="#reports" className={style.link}>
            <HiDocumentReport />
            Reports
          </Link>
        </li>

        <li
          className={`${style.btn}  ${active == "Bazaar" ? style.active : ""} `}
          onClick={() => handleActive("Bazaar")}
        >
          <Link to="#bazaar" className={style.link}>
            <BsShop />
            Bazaar
          </Link>
        </li>

        <li
          className={`${style.btn}  ${active == "Statistics" ? style.active : ""} `}
          onClick={() => handleActive("Statistics")}
        >
          <Link to="#statistics" className={style.link}>
            <IoStatsChartSharp />
            Statistics
          </Link>
        </li>

        <li className={style.btn}>
          <Link to="/" className={style.link}>
            <IoIosHome />
            Go To Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
