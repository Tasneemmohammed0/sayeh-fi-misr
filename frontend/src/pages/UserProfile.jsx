import React from 'react'
import styles from '../styles/userprofile.module.css'

import UserInfo from '../components/UserInfo'
import ReviewsList from '../components/ReviewsList'
import VistedList from '../components/VistedList'
import WishLists from '../components/WishLists'
function UserProfile() {

  const [selectedList,setSelectedList]=React.useState("Reviews");


  //// fetching user data by id


  const usertemp = {
    id:1,
    name: "Amr Hany",
    profilePic: "/src/assets/images/user avatar.png",
    country: "Egypt",
    city: "Cairo",
    email: "amrhanyseed@gmail.com",
    padges: [
      "/src/assets/images/badge.png",
      "/src/assets/images/badge.png",
      "/src/assets/images/badge.png",
    ],
    placesVisited: 5,
    reviews: 2,
    photosCount: 39,
  };

  return (
    <>
    <section style={{backgroundColor:"#ece3d3", borderBottom:"1px solid black"}}>
      <img src="/src/assets/images/temple.png" alt="user profile" className={styles.coverPhoto} />
      <UserInfo user={usertemp} selectedList={selectedList} setSelectedList={setSelectedList} />
    </section>
    <section style={{background:"#D3C4A9", padding:"20px 10px "}}>
      { selectedList==="Reviews" &&
        <ReviewsList user={usertemp} />}

      { selectedList==="Wish List" && <WishLists user={usertemp}/>
      }

      {
        selectedList==="Visted List" && <VistedList user={usertemp} />
      }
    </section>
    </>


export default UserProfile