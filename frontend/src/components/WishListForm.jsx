import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ErrorMessage from "./ErrorMessage";
import styles from "../styles/WishListForm.module.css"; 

function WishListForm({ isOpen, handleForm }) {

  const [wishlistName, setWishlistName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);


  if (!isOpen) return null; 

  function handleSubmit(e) {
    e.preventDefault();
    console.log(error);
    if (!wishlistName) {
      setError(true);
      return;
    }
    setError(false);
    console.log(wishlistName, description);
    handleForm(false);
    setWishlistName("");
    setDescription("");
    //// post to the api to create the wishlist
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button
          className={styles.popupClose}
          onClick={() => handleForm(false)}
        >
          <IoMdClose />
        </button>
        <h2>Create Wishlist</h2>
        <form>
          <label className={styles.formLabel}>
            Wishlist Name:
            <input
              type="text"
              placeholder="Enter wishlist name"
              className={styles.formInput}
              value={wishlistName}
              onChange={(e) => setWishlistName(e.target.value)}
            />
          </label>
          <label className={styles.formLabel}>
            Description:
            <textarea
              placeholder="Enter description"
              className={styles.formTextarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            ></textarea>
          </label>
          {error && <ErrorMessage error="Wishlist name is required" />}
          <button type="submit" className={styles.formButton} onClick={(e)=>handleSubmit(e)}>
            Create
          </button>

         
        </form>
      </div>
    </div>
  );
}

export default WishListForm;
