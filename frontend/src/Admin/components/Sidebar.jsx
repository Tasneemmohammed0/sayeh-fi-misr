import React, { useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { PiParkFill } from "react-icons/pi";
import { HiDocumentReport } from "react-icons/hi";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import style from "../styles/Sidebar.module.css";

function Sidebar({ active, setActive, user }) {
  // Function to handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActive(hash.charAt(0).toUpperCase() + hash.slice(1));
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [setActive]);

  function handleActive(name) {
    setActive(name);
  }

  return (
    <nav className={style.navbar}>
      <div className={style.info}>
        <div>
          <img
            className={style.image}
            src={user?.profile_pic || `../src/assets/images/userAvatar.png`}
            alt="User Avatar"
          />
        </div>
        <h2>
          Hi <span className={style.name}> {user?.username} </span>
        </h2>
      </div>

      <ul className={style.buttons}>
        <a
          href="#users"
          className={`${style.btn} ${active === "Users" ? style.active : ""}`}
          onClick={() => handleActive("Users")}
        >
          <li className={style.link}>
            <IoPersonCircleOutline />
            Users
          </li>
        </a>

        <a
          href="#places"
          className={`${style.btn} ${active === "Places" ? style.active : ""}`}
          onClick={() => handleActive("Places")}
        >
          <li className={style.link}>
            <HiHomeModern />
            Places
          </li>
        </a>

        <Link
          to="/gatherings"
          className={`${style.btn} ${
            active === "Gatherings" ? style.active : ""
          }`}
          onClick={() => handleActive("Gatherings")}
        >
          <li className={style.link}>
            <PiParkFill />
            Gatherings
          </li>
        </Link>

        <a
          href="#reports"
          className={`${style.btn} ${active === "Reports" ? style.active : ""}`}
          onClick={() => handleActive("Reports")}
        >
          <li className={style.link}>
            <HiDocumentReport />
            Reports
          </li>
        </a>

        <a
          href="#bazaar"
          className={`${style.btn} ${active === "Bazaar" ? style.active : ""}`}
          onClick={() => handleActive("Bazaar")}
        >
          <li className={style.link}>
            <BsShop />
            Bazaar
          </li>
        </a>

        <a
          href="#statistics"
          className={`${style.btn} ${
            active === "Statistics" ? style.active : ""
          }`}
          onClick={() => handleActive("Statistics")}
        >
          <li className={style.link}>
            <IoStatsChartSharp />
            Statistics
          </li>
        </a>

        <Link to="/" className={style.btn}>
          <li className={style.link}>
            <IoIosHome />
            Go To Home
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Sidebar;
