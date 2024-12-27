import React, { useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import styles from "../styles/Signout.module.css";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
function Signout({ isOpen, handleForm, user, setUser }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sign-out handler
  async function handleSignOut() {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:1123/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      handleForm(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Sign-out error:", error);
      setLoading(false);
    }
  }

  // If the popup is not open, return null
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button
          className={styles.popupClose}
          onClick={() => handleForm(false)}
          aria-label="Close"
        >
          <IoMdClose />
        </button>
        <h3 className={styles.header}>Are you sure you want to sign out?</h3>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <button className={styles.popupButton} onClick={handleSignOut}>
              Sign Out
            </button>
            <button
              className={styles.popupButton}
              onClick={() => handleForm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signout;
