import React from 'react'
import { PiMapPinLight } from "react-icons/pi";

function UserInfo({ user }) {

  usertemp = {
    name:"Amr Hany",
    profilePic:"/src/assets/images/user avatar.png",
    country:"Egypt",
    city:"Cairo",
    email:"amrhanyseed@gmail.com",
    padges:3,
    placesVisited:5,
    Reviews:2,
    Photo:39,


  }



  return (
    <section>
      <div>
        <img src={usertemp.profilePic} alt="user profile" />
        <h2>{usertemp.name}</h2>
        <div>
        <p> <PiMapPinLight /> Lives in {usertemp.city}, {usertemp.country} </p>
        </div>
      </div>
    </section>
  )
}

export default UserInfo