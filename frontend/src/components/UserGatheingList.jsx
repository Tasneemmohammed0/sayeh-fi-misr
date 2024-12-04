import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../styles/placeslist.module.css";
import Loading from "./Loading";
import GatheringCard from "./GatheringCard";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
function UserGatheingList({ id }) {
  /// fetching by user id to get the gathering list

  // const [gatheringList, setGatheringList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  let [gatheringList, setGatheringsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const endpoint = `http://localhost:1123/api/v1/gatherings`;

        const response = await axios.get(endpoint);
        console.log("response");
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setGatheringsList(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await axios.get(
  //         `http://localhost:1123/api/v1/users/gatheringlist/${id}`
  //       );
  //       setGatheringList(response.data.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [id, setGatheringList, gatheringList]);
  // let gatheringList = [];
  // const temp = {
  //   id: 1,
  //   photo: "/src/assets/images/temple.png",
  //   placeName: "Luxor Tempale",
  //   location: "Luxor ",
  //   hostname: "Hany",
  //   currentcapacity: 0,
  //   duration: 1,
  // };
  // const temp1 = {
  //   id: 2,
  //   photo: "/src/assets/images/temple.png",
  //   placeName: "Luxor Tempale",
  //   location: "Luxor ",
  //   hostname: "Hany",
  //   currentcapacity: 0,
  //   duration: 1,
  // };

  // const temp2 = {
  //   id: 3,
  //   photo: "/src/assets/images/temple.png",
  //   placeName: "Luxor Tempale",
  //   location: "Luxor ",
  //   hostname: "Hany",
  //   currentcapacity: 0,
  //   duration: 1,
  // };

  // const temp3 = {
  //   id: 4,
  //   photo: "/src/assets/images/temple.png",
  //   placeName: "Luxor Tempale",
  //   location: "Luxor ",
  //   hostname: "Hany",
  //   currentcapacity: 15,
  //   duration: 18,
  // };

  // // console.log("gatheringList", gatheringList);

  // gatheringList.push(temp);
  // gatheringList.push(temp1);
  // gatheringList.push(temp2);
  // gatheringList.push(temp3);

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

        <MdMenu
          onClick={handleOptions}
          style={{
            fontSize: "50px",
            marginRight: "10px",
            color: "green",
            cursor: "pointer",
          }}
        />
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
