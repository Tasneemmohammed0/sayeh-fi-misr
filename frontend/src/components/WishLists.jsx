import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WishListForm from "./WishListForm";
import Loading from "./Loading";
import styles from "../styles/WishLists.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function WishLists({ id }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [wishLists, setWishLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editWishList, setEditWishList] = useState(null);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/wishlists/${id}`
        );
        setWishLists(response.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = (e, id) => {
    if (e.target.tagName.toLowerCase() === "button") {
      return;
    }

    navigate(`wishlist/${id}`);
  };

  const handleUpdateWishList = (updatedWishList) => {
    console.log(updatedWishList);

    setWishLists((prevWishLists) =>
      prevWishLists.map((wishList) =>
        wishList.wishlist_id === updatedWishList.wishlist_id
          ? updatedWishList
          : wishList
      )
    );
  };

  const handleDeleteWishlist = async (deletedWishList) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:1123/api/v1/wishlist/${deletedWishList.wishlist_id}`,
        { withCredentials: true }
      );
      setWishLists((prevWishLists) =>
        prevWishLists.map((wishList) =>
          wishList.wishlist_id === deletedWishList.wishlist_id ? null : wishList
        )
      );
      alert(`🗑️ ${response.data.message}`);
      // toast(response.data.message);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {loading && <Loading />}
      {user?.user_id === id && (
        <button className={styles.create} onClick={() => setIsFormOpen(true)}>
          Create Wishlist
        </button>
      )}
      <WishListForm
        isOpen={isFormOpen}
        handleForm={setIsFormOpen}
        user_id={user?.user_id}
        can={user?.user_id === id}
      />

      <ul className={styles.allWishLists}>
        {wishLists.map(
          (wishList) =>
            wishList && (
              <li
                key={wishList.wishlist_id}
                className={styles.wishListInfo}
                onClick={(e) => handleClick(e, wishList.wishlist_id)}
              >
                <h2 className={styles.titleStyle}>{wishList.name}</h2>
                <p className={styles.description}>{wishList.description}</p>
                <button
                  className={styles.editBtn}
                  onClick={() => setEditWishList(wishList)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteWishlist(wishList)}
                >
                  Delete
                </button>
              </li>
            )
        )}
      </ul>
      {editWishList && (
        <EditWishListPopup
          wishList={editWishList}
          closeForm={() => setEditWishList(null)}
          handleUpdateWishList={handleUpdateWishList}
          setWishLists={setWishLists}
        />
      )}
    </div>
  );
}

// Popup Form Component for Editing Wishlist
function EditWishListPopup({
  wishList,
  closeForm,
  handleUpdateWishList,
  setWishLists,
}) {
  const [name, setName] = useState(wishList.name);
  const [description, setDescription] = useState(wishList.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (name == "") {
      }

      const response = await axios.patch(
        `http://localhost:1123/api/v1/wishlist/${wishList.wishlist_id}`,
        {
          name: name,
          description: description,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.status == 200)
        setWishLists((prevWishLists) =>
          prevWishLists.map((prevwishList) =>
            prevwishList.wishlist_id === wishList.wishlist_id
              ? response.data.data
              : prevwishList
          )
        );
      toast.success("update is complete ");
      setTimeout(() => {
        closeForm();
      }, 1000);
    } catch (err) {
      toast.error(err.message);
      console.error("Error updating wishlist:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.popupContainer}>
      <ToastContainer />
      <div className={styles.popupContent}>
        <h3>Edit Wishlist</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </label>
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WishLists;
