import React, { useState } from "react";
import styles from "../styles/userprofile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserInfo from "../components/UserInfo";
import ReviewsList from "../components/ReviewsList";
import VisitedList from "../components/VisitedList";
import WishLists from "../components/WishLists";
import UserGatheingList from "../components/UserGatheingList";

function UserProfile() {
  const [currentUser, setCurrentUser] = React.useState({});
  const { id } = useParams();
  const [selectedList, setSelectedList] = useState("Reviews");
  console.log("selectedList", selectedList);
  //// fetching user data by id
  React.useEffect(() => {
    const handleId = async () => {
      try {
        if (!id) {
          console.log("NO ID");
          const response = await axios.get(
            "http://localhost:1123/api/v1/users/me",
            {
              withCredentials: true,
            }
          );
          setCurrentUser(response.data.data.user);
        } else {
          console.log("ID");

          const response = await axios.get(
            `http://localhost:1123/api/v1/users/${id}`
          );
          setCurrentUser(response.data.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleId();
  }, [id]);
  console.log("USER ID:", currentUser.user_id);
  return (
    <>
      <section
        style={{ backgroundColor: "#ece3d3", borderBottom: "1px solid black" }}
      >
        <img
          src="/src/assets/images/temple.png"
          alt="user profile bg"
          className={styles.coverPhoto}
        />
        <UserInfo
          user={currentUser}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </section>
      <section style={{ background: "#D3C4A9", padding: "20px 10px " }}>
        {currentUser.user_id && selectedList === "Reviews" && (
          <ReviewsList id={currentUser.user_id} />
        )}

        {currentUser.user_id && selectedList === "Wish List" && (
          <WishLists id={currentUser.user_id} />
        )}

        {currentUser.user_id && selectedList === "Visted List" && (
          <VisitedList id={currentUser.user_id} />
        )}

        {currentUser.user_id && selectedList === "Gathering List" && (
          <UserGatheingList id={currentUser.user_id} />
        )}
      </section>
    </>
  );
}
export default UserProfile;
