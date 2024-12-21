import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import styles from "../styles/NavBar.module.css";

function NavBar({ open = true, currentUser, setCurrentUser }) {
  const { user, setUser } = useContext(UserContext);
  const [allow, setAllow] = useState(open);
  const location = useLocation(); // Get current location
  // Check if the current path is "/"

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1123/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setCurrentUser(null);
      currentUser = null;
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setAllow(true);
      return; // Do nothing if on the home page
    }
    setAllow((prev) => !prev); // Toggle menu visibility
  };
  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.logo} onClick={handleClick}>
        Sayeh fe Misr
      </div>

      <ul className={`  ${allow ? styles.navLinks : styles.navlinkopen}  `}>
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
        <li>
          <NavLink
            to="/bazaar"
            activeclassname="active-link"
            className={styles.link}
          >
            Bazaar
          </NavLink>
        </li>

        {currentUser?.role === "admin" ? (
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
          {currentUser || user ? (
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

        {(currentUser || user) && (
          <li>
            <NavLink
              to="/profile"
              activeclassname="active-link"
              className={styles.link}
            >
              <img
                src={currentUser ? currentUser.profile_pic : user?.profile_pic}
                className={styles.profileIcon}
              />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
