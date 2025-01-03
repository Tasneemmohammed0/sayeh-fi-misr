import React, { useState } from "react";
import styles from "../styles/UserPhotoPost.module.css";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditPostForm from "./EditPostForm";
function UserPhotoPost({ post, selectedOption, setPostList, setStats }) {
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);

  // format date
  const formattedDate = new Date(post.date);
  const formattedDateString = formattedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  async function handleDelete(photoId) {
    try {
      const response = await axios.delete(
        `http://localhost:1123/api/v1/photos/${photoId}`,
        {
          withCredentials: true,
        }
      );

      setPostList((prev) => prev.filter((item) => item.photo_id !== photoId));
      setStats((prevStats) => {
        return {
          ...prevStats,
          photos_count: prevStats.photos_count - 1,
        };
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  function handleEdit() {
    setShowEditForm(true);
  }

  return (
    <>
      <div className={styles.container}>
        {selectedOption === "edit" && (
          <div className={styles.tooltip}>
            <CiEdit onClick={() => handleEdit()} className={styles.opIcons} />
          </div>
        )}

        {selectedOption === "delete" && (
          <div className={styles.tooltip}>
            <MdDelete
              onClick={() => handleDelete(post.photo_id)}
              className={styles.opIcons}
              style={{ color: "red" }}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "10px",
          }}
        >
          <img src={post.photo} alt="card image" className={styles.image} />
        </div>
        <div
          className={styles.details}
          onClick={() => navigate(`/places/${post.place_id}#photos`)}
        >
          <h2 className={styles.title}>{post.caption}</h2>
        </div>
        <div className={styles.details}>
          <p className={styles.place}>Place: {post.place_name}</p>
          <p className={styles.date}>Date post: {formattedDateString} </p>
        </div>
      </div>

      {showEditForm && (
        <EditPostForm
          post={post}
          setPostList={setPostList}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}

export default UserPhotoPost;
