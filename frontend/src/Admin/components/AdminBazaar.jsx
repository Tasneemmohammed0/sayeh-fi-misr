import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Gift from "../../components/Gift";
import styles from "../styles/AdminBazaar.module.css";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Loading from "../../components/Loading";
import AddGiftForm from "./AddGiftForm";
import { UserContext } from "../../App";
function AdminBazaar() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);

  const { places } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = `http://localhost:1123/api/v1/bazaar`;

        const response = await axios.get(endpoint);
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setLoading(false);
        setGifts(response.data.data);
        console.log("==========Gift", response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

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

  function addItem() {
    setSelectedOption((op) => (op === "add" ? null : "add"));
    setShowAddItem(true);
  }

  return (
    <div className={styles.mainBazaar}>
      {loading && <Loading />}
      <div style={{ position: "absolute", top: "-10px", right: "10px" }}>
        {showOptions && (
          <>
            <IoAddSharp className={styles.addIcon} onClick={() => addItem()} />

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

      <div className={styles.giftContainer}>
        {gifts.map((item, index) => (
          <Gift
            key={index}
            card={item}
            role="admin"
            setGifts={setGifts}
            selectedOption={selectedOption}
          />
        ))}
      </div>
      {showAddItem && (
        <AddGiftForm
          onClose={() => setShowAddItem(false)}
          setGifts={setGifts}
          places={places}
        />
      )}
    </div>
  );
}

export default AdminBazaar;
