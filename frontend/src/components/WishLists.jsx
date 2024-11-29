import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import WishListForm from "./WishListForm";
import WishList from "./WishList";
import styles from "../styles/WishLists.module.css";

function WishLists({ id }) {
  ////// fetching by user id to get the wishlists
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [wishLists, setWishLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/wishlists/${id}`
        );
        setWishLists(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);
  //// note validation if the user has no wishlists no need

  return (
    <div style={{ position: "relative" }}>
      <button className={styles.create} onClick={() => setIsFormOpen(true)}>
        Create Wishlist
      </button>
      <WishListForm isOpen={isFormOpen} handleForm={setIsFormOpen} />

      <ul className={styles.allWishLists}>
        {wishLists.map((wishList, index) => {
          return (
            <NavLink key={index} to={`wishlist/${wishList.id}`}>
              <li key={index} className={styles.wishListInfo}>
                <h2 className={styles.titleStyle}>{wishList.name}</h2>
                <p className={styles.description}>{wishList.description}</p>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

export default WishLists;