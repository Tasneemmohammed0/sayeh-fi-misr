import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "../styles/placeslist.module.css";
import styles2 from "../styles/UserGatheringList.module.css";
import Loading from "./Loading";
import GatheringCard from "./GatheringCard";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import CreateGatheringForm from "./CreateGatheringForm";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

function UserGatheingList({ id, canEdit }) {
  const [gatheringList, setGatheringList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [userPlaces, setUserPlaces] = useState([]);
  const { places: Places, setPlaces } = useContext(UserContext);
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   if (message === "Gathering created successfully") {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success!",
  //       text: message,
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //     setMessage("");
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // setUserPlaces(places);
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/gatherings/${id}`
        );
        setGatheringList(response.data.data);
        console.log("gathering list ", response.data.data);
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
  function handleAdd() {
    setSelectedOption((op) => (op === "add" ? null : "add"));
    setCreateFormVisible(true);
  }

  return (
    <>
      <ToastContainer />
      <div
        className={styles.list}
        style={{ position: "relative" }}
        id="gatheringlist"
      >
        {loading && <Loading />}
        {canEdit && (
          <div style={{ position: "absolute", top: "-50px", right: "10px" }}>
            {showOptions && (
              <>
                <IoAddSharp className={styles2.addIcon} onClick={handleAdd} />

                <CiEdit
                  className={styles2.editIcon}
                  onClick={() => {
                    handleEdit();
                  }}
                />
                <MdDelete
                  onClick={handleDelete}
                  className={styles2.deleteIcon}
                />
              </>
            )}

            <FiSettings
              onClick={handleOptions}
              className={styles2.optionIcon}
            />
          </div>
        )}

        {gatheringList.map((item, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <GatheringCard
              key={index}
              gathering={item}
              setGatheringList={setGatheringList}
              selectedOption={selectedOption}
              onDelete={handleDelete}
              setLoading={setLoading}
              // canEdit={id === item.host_id}
            />
          </div>
        ))}
      </div>

      {selectedOption === "add" && (
        <CreateGatheringForm
          id={id}
          places={Places}
          createFormVisible={createFormVisible}
          onClose={() => setCreateFormVisible(false)}
          setGatheringList={setGatheringList}
          setLoading={setLoading}
          setMessage={setMessage}
        />
      )}
    </>
  );
}

export default UserGatheingList;
