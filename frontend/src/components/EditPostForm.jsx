import React, { useState } from "react";
import styles from "../styles/EditPostForm.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function EditPostForm({ post, onClose, setPostList }) {
  const [caption, setCaption] = useState(post.caption);

  function handleChange(e) {
    setCaption(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:1123/api/v1/photos/${post.photo_id}`,
        { caption: caption },
        {
          withCredentials: true,
        }
      );
      toast.success("Post updated successfully.");
      setPostList((prev) =>
        prev.map((item) =>
          item.photo_id === post.photo_id ? { ...item, caption: caption } : item
        )
      );
      setCaption("");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className={styles.overlay}>
      <ToastContainer />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className={styles.heading}>Edit Post</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Caption:
            </label>
            <input
              className={styles.input}
              type="text"
              id="caption"
              name="caption"
              value={caption}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit" className={styles.saveButton}>
            Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPostForm;
