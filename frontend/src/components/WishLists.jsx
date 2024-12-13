import React from "react";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

import WishListForm from "./WishListForm";
import WishList from "./WishList";
import Loading from "./Loading";
import styles from "../styles/WishLists.module.css";

function WishLists({ id }) {
  ////// fetching by user id to get the wishlists
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [wishLists, setWishLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:1123/api/v1/users/wishlists/${id}`
        );
        setWishLists(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  //// note validation if the user has no wishlists no need

  return (
    <div style={{ position: "relative" }}>
      {loading && <Loading />}
      {user.user_id === id && (
        <button className={styles.create} onClick={() => setIsFormOpen(true)}>
          Create Wishlist
        </button>
      )}
      <WishListForm
        isOpen={isFormOpen}
        handleForm={setIsFormOpen}
        user_id={user.user_id}
        can={user.user_id === id}
      />

      <ul className={styles.allWishLists}>
        {wishLists.map((wishList, index) => {
          return (
            <NavLink key={index} to={`wishlist/${wishList.wishlist_id}`}>
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
