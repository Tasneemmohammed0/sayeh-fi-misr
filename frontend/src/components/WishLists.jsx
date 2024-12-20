import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WishListForm from "./WishListForm";
import Loading from "./Loading";
import styles from "../styles/WishLists.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function WishLists({ id, canEdit = false, canEdit }) {
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
        toast.error(err.response.data.message);
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
    setWishLists((prevWishLists) =>
      prevWishLists.map((wishList) =>
        wishList.wishlist_id === updatedWishList.wishlist_id
          ? updatedWishList
          : wishList
      )
    );
  };

  const handleDeleteWishlist = async (id) => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `http://localhost:1123/api/v1/wishlist/${id}`,
        { withCredentials: true }
      );

      setWishLists((prevWishLists) =>
        (prevWishLists || []).filter((wishlist) => wishlist.wishlist_id !== id)
      );
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }} id="wishlists">
      {loading && <Loading />}
      {canEdit && (
        <button className={styles.create} onClick={() => setIsFormOpen(true)}>
          Create Wishlist
        </button>
      )}

      <WishListForm
        isOpen={isFormOpen}
        handleForm={setIsFormOpen}
        user_id={user?.user_id}
        canEdit={canEdit}
        setWishLists={setWishLists}
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
                {canEdit && (
  
                {canEdit && (
                  <div
                      style={{
                        display: "flex",
                        alignSelf: "flex-end",
                        columnGap: "10px",
                      }}
                    >
                      <button
                        className={styles.editBtn}
                        onClick={() => setEditWishList(wishList)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteWishlist(wishList.wishlist_id)}
                      >
                        Delete
                      </button>
                    </div>
                )}
                )}
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

      if (response.status == 200)
        setWishLists((prevWishLists) =>
          prevWishLists.map((prevwishList) =>
            prevwishList.wishlist_id === wishList.wishlist_id
              ? response.data.data
              : prevwishList
          )
        );

      toast.success(`Updated successfully`);
      setTimeout(() => {
        closeForm();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message);
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
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
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
