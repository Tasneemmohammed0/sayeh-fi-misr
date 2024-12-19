import styles from "../styles/AddToListForm.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose, IoIosAddCircleOutline } from "react-icons/io";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";

function AddToListForm({ isOpen, setIsOpen, placeId, isWishList }) {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noListMsg, SetNoListMsg] = useState(false);

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

        setLists(response.data.data);

        setLoading(false);
      } catch (err) {
        if (err.response.data.message == "No wishlists found.")
          SetNoListMsg(true);

        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  function handleSelectedItem(listId) {
    // if the list is already selected, deselect it
    listId === selectedList ? setSelectedList(null) : setSelectedList(listId);
  }

  // send bookmark to API
  async function handleSubmit(e) {
    e.preventDefault();

    // if no list is selected
    if (!selectedList) {
      toast("Please, select a list");
      return;
    }

    // send bookmark to API
    const bookmarkData = {
      place_id: placeId,
      wishlist_id: selectedList,
    };

    try {
      const res = await axios.post(
        `http://localhost:1123/api/v1/places/${placeId}/addToWishlist`,
        bookmarkData,
        {
          withCredentials: true,
        }
      );

      // show success message
      notify("Place added to the list");

      // clear the form
      handleClose();
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    }
  }

  function handleClose() {
    // clear the form
    setSelectedList(null);
    setIsOpen(false);
  }

  // pretty alerts
  function notify(msg) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: msg,
      timer: 3000,
    });
  }

  return (
    <div className={styles.popupOverlay}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        {noListMsg ? (
          <>
            <h3>No Lists Found</h3>
            <div
              onClick={() => navigate("/profile#wishlist")}
              className={styles.createList}
            >
              <p>Create a list first to get started!</p>
              <IoIosAddCircleOutline className={styles.addListIcon} />
            </div>
          </>
        ) : (
          <h3>Add this place to a list</h3>
        )}
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
        {!noListMsg && (
          <button
            type="submit"
            className={styles.formButton}
            onClick={handleSubmit}
          >
            Add to list
          </button>
        )}
      </form>
    </div>
  );
}

export default AddToListForm;
