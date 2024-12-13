import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";
import { UserContext } from "../App";
import axios from "axios";

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    console.log("Logging out..");
    try {
      const response = await axios.post(
        "http://localhost:1123/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        document.getElementById("navbar").style.display = "none";
      } else {
        document.getElementById("navbar").style.display = "flex";
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log("USER:", user);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.logo}>Sayeh fe Misr</div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" activeclassname="active-link" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gatherings"
            activeclassname="active-link"
            className={styles.link}
          >
            Gatherings
          </NavLink>
        </li>
        <li>
          <a href="#trending" className={styles.link}>
            Trending Places
          </a>
        </li>
        {user?.role === "admin" ? (
          <li>
            <NavLink
              to="/dashboard"
              activeclassname="active-link"
              className={styles.link}
            >
              Dashboard
            </NavLink>
          </li>
        ) : null}
        <li onClick={handleLogout}>
          {user ? (
            <NavLink activeclassname="active-link" className={styles.link}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink
              to="/signin"
              activeclassname="active-link"
              className={styles.link}
            >
              Sign In
            </NavLink>
          )}
        </li>
        <li>
          {user ? (
            <NavLink
              to="/bazaar"
              activeclassname="active-link"
              className={styles.link}
            >
              Bazaar
            </NavLink>
          ) : (
            <NavLink
              to="/signin"
              activeclassname="active-link"
              className={styles.link}
            >
              Sign In
            </NavLink>
          )}
        </li>

        <li>
          <NavLink
            to="/profile"
            activeclassname="active-link"
            className={styles.link}
          >
            {user ? (
              <img src={`${user.profile_pic}`} className={styles.profileIcon} />
            ) : (
              <FaUserCircle className={styles.profileIcon} />
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
