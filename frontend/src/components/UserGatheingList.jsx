import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../styles/placeslist.module.css";

import styles2 from "../styles/UserGatheringList.module.css";

import Loading from "./Loading";
import GatheringCard from "./GatheringCard";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { FiSettings } from "react-icons/fi";

function UserGatheingList({ id }) {
  const [gatheringList, setGatheringList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:1123/api/v1/users/gatherings/${id}`
        );
        setGatheringList(response.data.data);
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
  console.log("gatheringList", gatheringList);
  return (
    <div className={styles.list} style={{ position: "relative" }}>
      {loading && <Loading />}

      <div style={{ position: "absolute", top: "-50px", right: "10px" }}>
        {showOptions && (
          <>
            <CiEdit
              className={styles2.editIcon}
              style={{
                fontSize: "50px",
                marginRight: "10px",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                handleEdit();
              }}
            />
            <MdDelete
              style={{
                fontSize: "50px",
                marginRight: "10px",
                color: "red",
                cursor: "pointer",
              }}
              onClick={handleDelete}
            />
          </>
        )}

        <FiSettings onClick={handleOptions} className={styles2.optionIcon} />
      </div>

      {gatheringList.map((item, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          key={index}
        >
          <GatheringCard
            key={index}
            photo={item.photo}
            placeName={item.title}
            location={item.city}
            hostname={item.first_name}
            currentcapacity={item.current_capacity}
            duration={item.duration}
            id={item.gathering_id}
            selectedOption={selectedOption}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default UserGatheingList;
