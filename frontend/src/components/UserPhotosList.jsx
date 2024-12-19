import React, { useState, useEffect } from "react";
import styles from "../styles/UserPhotosList.module.css";
import Loading from "./Loading";
import { FiSettings } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import UserPhotoPost from "./UserPhotoPost";
import axios from "axios";
function UserPhotosList({ id, canEdit, setStats }) {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:1123/api/v1/users/photos/${id}`
        );
        console.log("response", response.data.data);
        setPostList(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
    <div
      className={styles.list}
      style={{ position: "relative" }}
      id="photoslist"
    >
      {loading && <Loading />}
      {canEdit && (
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
      )}

      {postList.map((item, index) => (
        <UserPhotoPost
          setStats={setStats}
          post={item}
          key={index}
          setPostList={setPostList}
          selectedOption={selectedOption}
        />
      ))}
    </div>
  );
}

export default UserPhotosList;
