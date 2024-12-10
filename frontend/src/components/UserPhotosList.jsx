import React, { useState } from "react";
import styles from "../styles/UserPhotosList.module.css";
import Loading from "./Loading";
import { FiSettings } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import UserPhotoPost from "./UserPhotoPost";
function UserPhotosList({ id }) {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const tempList = [
    {
      title: "Post 1",
      description: "Description 1",
      place: "Place 1",
      date: "Date 1",
    },
    {
      title: "Post 2",
      description: "Description 2",
      place: "Place 2",
      date: "Date 2",
    },
    {
      title: "Post 3",
      description: "Description 3",
      place: "Place 3",
      date: "Date 3",
    },
    {
      title: "Post 3",
      description: "Description 3",
      place: "Place 3",
      date: "Date 3",
    },
    {
      title: "Post 3",
      description: "Description 3",
      place: "Place 3",
      date: "Date 3",
    },
    {
      title: "Post 3",
      description: "Description 3",
      place: "Place 3",
      date: "Date 3",
    },
  ];

  function handleOptions() {
    setShowOptions((op) => !op);
    setSelectedOption(null);
  }

  async function handleDelete() {
    setSelectedOption((op) => (op === "delete" ? null : "delete"));
  }
  function handleEdit() {
    setSelectedOption((op) => (op === "edit" ? null : "edit"));
  }

  return (
    <div className={styles.list} style={{ position: "relative" }}>
      {loading && <Loading />}

      <div style={{ position: "absolute", top: "-50px", right: "10px" }}>
        {showOptions && (
          <>
            <CiEdit
              className={styles.editIcon}
              onClick={() => {
                handleEdit();
              }}
            />
            <MdDelete className={styles.deleteIcon} onClick={handleDelete} />
          </>
        )}

        <FiSettings onClick={handleOptions} className={styles.optionIcon} />
      </div>

      {tempList.map((item, index) => (
        <UserPhotoPost
          post={item}
          key={index}
          selectedOption={selectedOption}
        />
      ))}
    </div>
  );
}

export default UserPhotosList;
