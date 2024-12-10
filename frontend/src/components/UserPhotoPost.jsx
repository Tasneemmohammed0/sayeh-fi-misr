import React from "react";
import styles from "../styles/UserPhotoPost.module.css";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
function UserPhotoPost({ post, selectedOption }) {
  return (
    <div className={styles.container}>
      {selectedOption === "edit" && (
        <div className={styles.tooltip}>
          <CiEdit onClick={() => handleEdit()} className={styles.opIcons} />
        </div>
      )}

      {selectedOption === "delete" && (
        <div className={styles.tooltip}>
          <MdDelete
            onClick={() => handleDelete(card.place_id)}
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
        <img
          src="src/assets/images/CMP27.jpg"
          alt="card image"
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.description}>{post.description}</p>
        <p className={styles.place}>Place: {post.place}</p>
        <p className={styles.date}>Date post: {post.date}</p>
      </div>
    </div>
  );
}

export default UserPhotoPost;
