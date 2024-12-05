import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
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
          <IoPersonCircleOutline />
          Places
        </li>

        <li
          className={`${style.btn}  ${active == "Gatherings" ? style.active : ""} `}
          onClick={() => handleActive("Gatherings")}
        >
          <IoPersonCircleOutline />
          Gatherings
        </li>

        <li
          className={`${style.btn}  ${active == "Reports" ? style.active : ""} `}
          onClick={() => handleActive("Reports")}
        >
          <IoPersonCircleOutline />
          Reports
        </li>
        <li
          className={`${style.btn}  ${active == "Statistics" ? style.active : ""} `}
          onClick={() => handleActive("Statistics")}
        >
          <IoPersonCircleOutline />
          Statistics
        </li>

        <li
          className={`${style.btn}  ${active == "Settings" ? style.active : ""} `}
          onClick={() => handleActive("Settings")}
        >
          <IoPersonCircleOutline />
          Settings
        </li>

        <Link to="/">
          <li className={style.btn}>
            <IoPersonCircleOutline />
            Go To Home
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Sidebar;
