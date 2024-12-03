import React from "react";
import styles from "../styles/userprofile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserInfo from "../components/UserInfo";
import ReviewsList from "../components/ReviewsList";
import VisitedList from "../components/VisitedList";
import WishLists from "../components/WishLists";

function UserProfile() {
  const [userId, setUserId] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const { id } = useParams();

  const [selectedList, setSelectedList] = React.useState("Reviews");
  React.useEffect(() => {
    console.log("INSIDE EFFECT");
    const handleId = async () => {
      try {
        if (id == undefined) {
          console.log("USERID IS UNDEFINED");
          const response = await axios.get(
            "http://localhost:1123/api/v1/users/me",
            {
              withCredentials: true,
            }
          );
          console.log("RESPONSE:", response);
          setUserId(response.data.data.user.user_id);
          setCurrentUser(response.data.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleId();
  }, [id]);
  console.log("USER", currentUser);

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
        {selectedList === "Reviews" && <ReviewsList id={currentUser.user_id} />}

        {selectedList === "Wish List" && <WishLists id={currentUser.user_id} />}

        {selectedList === "Visted List" && (
          <VisitedList id={currentUser.user_id} />
        )}
      </section>
    </>
  );
}
export default UserProfile;
