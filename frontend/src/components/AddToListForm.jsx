import styles from "../styles/AddToListForm.module.css";
import { useState, useEffect } from "react";
import { IoMdClose, IoIosAddCircleOutline } from "react-icons/io";
import Loading from "./Loading";

import axios from "axios";

function AddToListForm({ isOpen, setIsOpen, placeId }) {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Fetch lists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1123/api/v1/users/myWishlists",
          { withCredentials: true }
        );

        console.log(response.data.data);
        setLists(response.data.data);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLists();
  }, []);

  function handleSelectedItem(listId) {
    // if the list is already selected, deselect it
    listId === selectedList ? setSelectedList(null) : setSelectedList(listId);
    console.log(selectedList);
  }

  // send bookmark to API
  async function handleSubmit(e) {
    e.preventDefault();

    // if no list is selected
    if (!selectedList) {
      alert("Please, select a list");
      return;
    }

    // send bookmark to API
    const bookmarkData = {
      place_id: placeId,
      wishlist_id: selectedList,
    };

    try {
      const res = await fetch(
        `http://localhost:1123/api/v1/places/${placeId}/addToWishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmarkData),
        }
      );

      if (!res.ok) {
        throw new Error("❌ Error adding to list");
      }

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }

    // show success message
    alert("🎉 place added to the list");

    // clear the form
    handleClose();
  }

  function handleClose() {
    // clear the form
    setSelectedList(null);
    setIsOpen(false);
  }

  return (
    <div className={styles.popupOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Add this place to a list</h3>
        <button className={styles.popupClose} onClick={handleClose}>
          <IoMdClose />
        </button>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.listContainer}>
            {lists &&
              lists.map((list, index) => {
                return (
                  <div
                    className={`${styles.listItem} ${selectedList === list.wishlist_id ? styles.active : ""}`}
                    key={list.wishlist_id}
                    onClick={() => handleSelectedItem(list.wishlist_id)}
                  >
                    <div className={styles.listName}>{list.name}</div>
                    <IoIosAddCircleOutline className={styles.addIcon} />
                  </div>
                );
              })}
          </div>
        )}
        <button
          type="submit"
          className={styles.formButton}
          onClick={handleSubmit}
        >
          Add to list
        </button>
      </form>
    </div>
  );
}

export default AddToListForm;
