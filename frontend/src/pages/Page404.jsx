import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Page404.module.css";
function Page404() {
  return (
    <div className={styles.imageCover}>
      <h1>Oops! This page is as lost as an undiscovered tomb!</h1>
      <Link to="/" className={styles.link}>
        Take me Home
      </Link>
    </div>
  );
}

export default Page404;
