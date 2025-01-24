import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styles from "../styles/NavMenu.module.css";
function NavMenu({ currentUser, user, handleLogout }) {
  return (
    <>
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
          <HashLink smooth to="/#trending" className={styles.link}>
            Trending Places
          </HashLink>
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

        {currentUser?.role === "admin" && (
          <li>
            <NavLink
              to="/dashboard"
              activeclassname="active-link"
              className={styles.link}
            >
              Dashboard
            </NavLink>
          </li>
        )}
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
    </>
  );
}
export default NavMenu;
