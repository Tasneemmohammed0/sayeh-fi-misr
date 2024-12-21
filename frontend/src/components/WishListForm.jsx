import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import Loading from "./Loading";
import styles from "../styles/WishListForm.module.css";

function WishListForm({ isOpen, handleForm, user_id, setWishLists }) {
  const [wishlistName, setWishlistName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!wishlistName) {
        setError("Wishlist name is required");
        return;
      }
      setError(false);
      const response = await axios.post(
        `http://localhost:1123/api/v1/wishlist`,
        {
          user_id,
          name: wishlistName,
          description,
        },
        {
          withCredentials: true,
        }
      );
      setWishLists((prev) => [...prev, response.data.data]);
      handleClose();
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    handleForm(false);
    setWishlistName("");
    setDescription("");
    setError("");
  }

  return (
    <div className={styles.popupOverlay}>
      {loading && <Loading />}
      <div className={styles.popup}>
        <button className={styles.popupClose} onClick={handleClose}>
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
          {error.length > 0 && <ErrorMessage error={error} />}
          <button
            type="submit"
            className={styles.formButton}
            onClick={(e) => handleSubmit(e)}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default WishListForm;
