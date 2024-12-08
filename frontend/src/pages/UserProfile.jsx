import React, { useState, useContext } from "react";
import styles from "../styles/userprofile.module.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

import UserInfo from "../components/UserInfo";
import ReviewsList from "../components/ReviewsList";
import VisitedList from "../components/VisitedList";
import WishLists from "../components/WishLists";
import UserGatheingList from "../components/UserGatheingList";
import Loading from "../components/Loading";

function UserProfile() {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();
  const [selectedList, setSelectedList] = useState("Reviews");
  const [loading, setLoading] = useState(true);
  console.log("selectedList", selectedList);
  //// fetching user data by id
  React.useEffect(() => {
    setCurrentUser(user);
    const handleId = async () => {
      setLoading(true);
      try {
        if (user) {
          setCurrentUser(user);
        } else if (id) {
          console.log("ID");

          const response = await axios.get(
            `http://localhost:1123/api/v1/users/${id}`
          );
          setCurrentUser(response.data.data.user);
        }
        console.log("CURRENT:", currentUser, user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    handleId();
  }, [id, user]);
  // console.log("USER ID:", currentUser.user_id);
  if (!currentUser) return <h1>login</h1>;

  return (
    <>
      {loading && <Loading />}
      <div>
        <section
          style={{
            backgroundColor: "#ece3d3",
            borderBottom: "1px solid black",
          }}
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
      </div>
    </>
  );
}
export default UserProfile;
