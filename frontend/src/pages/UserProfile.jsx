import React, { useState, useContext } from "react";
import styles from "../styles/userprofile.module.css";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";

import UserInfo from "../components/UserInfo";
import ReviewsList from "../components/ReviewsList";
import VisitedList from "../components/VisitedList";
import WishLists from "../components/WishLists";
import UserGatheingList from "../components/UserGatheingList";
import UserPhotosList from "../components/UserPhotosList";
import { UserContext } from "../App";
import Loading from "../components/Loading";

function UserProfile() {
  const currentUser = useLoaderData();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [selectedList, setSelectedList] = useState("Reviews");
  if (!currentUser && !id) return <h1>login</h1>;
  if (!currentUser && id) return <h1>User not found</h1>;

  return (
    <>
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
            canEdit={currentUser.user_id === user?.user_id}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </section>
        <section style={{ background: "#D3C4A9", padding: "20px 10px " }}>
          {currentUser.user_id && selectedList === "Reviews" && (
            <ReviewsList
              id={currentUser.user_id}
              canEdit={currentUser?.user_id === user?.user_id}
            />
          )}

          {currentUser.user_id && selectedList === "Wish List" && (
            <WishLists id={currentUser.user_id} />
          )}

          {currentUser.user_id && selectedList === "Visted List" && (
            <VisitedList
              id={currentUser.user_id}
              canEdit={currentUser?.user_id === user?.user_id}
            />
          )}

          {currentUser.user_id && selectedList === "Gathering List" && (
            <UserGatheingList
              id={currentUser.user_id}
              canEdit={currentUser?.user_id === user?.user_id}
            />
          )}

          {currentUser.user_id && selectedList === "Photos" && (
            <UserPhotosList id={currentUser.user_id} />
          )}
        </section>
      </div>
    </>
  );
}
export default UserProfile;

export async function UserLoader({ params }) {
  const id = params.id;

  let cu = null;
  try {
    if (!id) {
      const response = await axios.get(
        `http://localhost:1123/api/v1/users/me`,
        {
          withCredentials: true,
        }
      );
      cu = response.data.data.user;
    } else if (id) {
      const response = await axios.get(
        `http://localhost:1123/api/v1/users/${id}`,
        {
          withCredentials: true,
        }
      );
      cu = response.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }

  return cu;
}
