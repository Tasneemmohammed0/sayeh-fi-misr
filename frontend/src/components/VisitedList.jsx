import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/placeslist.module.css";
import Loading from "./Loading";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import Card from "./Card";

function VisitedList({ id, canEdit, setStats }) {
  /// fetching by user id to get the visited places

  const [visitList, setVisitList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  function handleOptions() {
    setShowOptions((op) => !op);
    setSelectedOption(null);
  }

  async function handleDelete() {
    setSelectedOption((op) => (op === "delete" ? null : "delete"));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:1123/api/v1/users/visitlist/${id}`
        );
        setVisitList(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  function handleClick(id) {
    navigate(`/places/${id}`);
  }

  return (
    <div className={styles.list} id="visitlist">
      {loading && <Loading />}
      {canEdit && (
        <div style={{ position: "absolute", top: "-50px", right: "10px" }}>
          {showOptions && (
            <>
              <MdDelete onClick={handleDelete} className={styles.deleteIcon} />
            </>
          )}

          <FiSettings onClick={handleOptions} className={styles.optionIcon} />
        </div>
      )}

      {visitList.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Card
            setStats={setStats}
            key={index}
            card={item}
            selectedOption={selectedOption}
            visitList={visitList}
            inVisitList={true}
            setVisitList={setVisitList}
            setLoading={setLoading}
            onClick={(e) => handleClick(item.place_id, e)}
          />
        </div>
      ))}
    </div>
  );
}

export default VisitedList;
