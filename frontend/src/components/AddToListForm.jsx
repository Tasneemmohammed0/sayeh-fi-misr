import styles from "../styles/AddToListForm.module.css";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

function AddToListForm({ isOpen, setIsOpen, placeId }) {
  const [lists, setLists] = useState([]);

  if (!isOpen) return null;

  // Fetch reviews
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1123/api/v1/users/wishlists/1"
        );

        console.log(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLists();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // send review to API

    // show success message

    // clear the form
  }

  function handleClose() {
    // clear the form
  }

  return (
    <div className={styles.popupOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Add this place to a list</h3>
        <button className={styles.popupClose} onClick={handleClose}>
          <IoMdClose />
        </button>
        <div className={styles.list}></div>

        <button
          type="submit"
          className={styles.formButton}
          onClick={handleSubmit}
        >
          Add Review
        </button>
      </form>
    </div>
  );
}

export default AddToListForm;
