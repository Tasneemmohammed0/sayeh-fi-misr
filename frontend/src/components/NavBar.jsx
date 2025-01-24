import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import { useMediaQuery } from "react-responsive"; // Import from react-responsive
import styles from "../styles/NavBar.module.css";
import SliderMenu from "./SliderMenu";
import NavMenu from "./NavMenu";

function NavBar({ open = true, currentUser, setCurrentUser }) {
  const { user, setUser } = useContext(UserContext);
  const [allow, setAllow] = useState(open);
  const [sliderOpen, setSliderOpen] = useState(false); // State for slider
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" }); // Mobile breakpoint
  const location = useLocation();

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
    if (isMobile) setSliderOpen((prev) => !prev);
    else setAllow((prev) => !prev);
  };

  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.logo} onClick={handleClick}>
        Sayeh fe Misr
      </div>

      {/* Render NavMenu on larger screens */}
      {!isMobile && allow && (
        <NavMenu
          currentUser={currentUser}
          user={user}
          handleLogout={handleLogout}
        />
      )}

      {/* Render SliderMenu only on mobile */}
      {isMobile && (
        <SliderMenu
          sliderOpen={sliderOpen}
          setSliderOpen={setSliderOpen}
          currentUser={currentUser}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
}

export default NavBar;
