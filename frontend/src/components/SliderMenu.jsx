import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Importing a close icon from react-icons
import styles from "../styles/SliderMenu.module.css";
import { HashLink } from "react-router-hash-link";
function SliderMenu({
  sliderOpen,
  setSliderOpen,
  currentUser,
  user,
  handleLogout,
}) {
  return (
    <div
      className={`${styles.sliderMenu} ${
        sliderOpen ? styles.sliderOpen : styles.sliderClosed
      }`}
    >
      {/* Close Button */}
      <button
        className={styles.closeButton}
        onClick={() => setSliderOpen(false)}
      >
        <AiOutlineClose />
      </button>

      <ul className={styles.navLinks}>
        <li className={styles.li}>
          <NavLink to="/" activeclassname="active-link" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/gatherings"
            activeclassname="active-link"
            className={styles.link}
          >
            Gatherings
          </NavLink>
        </li>
        <li className={styles.li}>
          <HashLink smooth to="/#trending" className={styles.link}>
            Trending Places
          </HashLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/bazaar"
            activeclassname="active-link"
            className={styles.link}
          >
            Bazaar
          </NavLink>
        </li>

        {currentUser?.role === "admin" && (
          <li className={styles.li}>
            <NavLink
              to="/dashboard"
              activeclassname="active-link"
              className={styles.link}
            >
              Dashboard
            </NavLink>
          </li>
        )}
        <li onClick={handleLogout} className={styles.li}>
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
          <li className={styles.li}>
            <NavLink
              to="/profile"
              activeclassname="active-link"
              className={styles.link}
            >
              <img
                src={currentUser ? currentUser.profile_pic : user?.profile_pic}
                className={styles.profileIcon}
                alt="Profile"
              />
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SliderMenu;
