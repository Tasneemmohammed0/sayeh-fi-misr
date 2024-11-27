import React from "react";
import { PiMapPinLight } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import styles from "../styles/userinfo.module.css";
// <HiOutlineMail />

function UserInfo({ user,selectedList,setSelectedList }) {
  selectedList=selectedList || "Reviews";
  

  return (
    <section className="container "  >
      <div className={styles.userWrapper}>
        <div className={styles.info}>
          <img
            src={user.profilePic}
            alt="user profile"
            className={styles.avater}
          />
          <h2 style={{marginTop:"20px",marginBottom:"20px "}}>{user.name}</h2>
          <div>
            <p className={styles.p}>
              <PiMapPinLight style={{fontSize:"20px"}} /> Lives in {user.city}, {user.country}{" "}
            </p>
            <p className={styles.p} >
              <HiOutlineMail style={{fontSize:"20px"}} /> {user.email}
            </p>
          </div>
        </div>
        <div className={styles.info}>
          <ul className={styles.statistics}>
            <li className={styles.statisticsItem}>
              <span style={{fontSize:"30px" ,marginBottom:"5px"}}>{user.placesVisited}</span>
              <span >Places Visited</span>
            </li>
            <li className={styles.statisticsItem}>
              <span style={{fontSize:"30px" ,marginBottom:"5px"}}>{user.reviews}</span>
              <span>Reviews</span>
            </li>
            <li className={styles.statisticsItem}>
            <span style={{fontSize:"30px" ,marginBottom:"5px"}}>{user.photosCount}</span>
              <span>Photos</span>
            </li>
          </ul>
          {user.padges.length > 0 &&
          <div >
            <h3 style={{textAlign:"center", marginTop:"10px"}}>Badges Earned</h3>
            <div className={styles.badgeContainer}>
              {user.padges.map((badge, index) => {
                return <img src={badge} alt="badge" key={index} className={styles.badge} />;
              })}
            </div>
        
          </div>}
        </div>
      </div>

      <ul className={styles.lists}> 
        <li className={`${styles.listItem} ${selectedList === "Reviews" ? styles.active : ""}`}  onClick={()=>setSelectedList("Reviews")}>Reviews</li>
        <li className={`${styles.listItem} ${selectedList === "Wish List" ? styles.active : ""}`}  onClick={ ()=>setSelectedList("Wish List")} >Wish List</li>
        <li className={`${styles.listItem} ${selectedList === "Visted List" ? styles.active : ""}`   }  onClick={ ()=>setSelectedList("Visted List")} >Visted List</li>
        <li className={`${styles.listItem} ${selectedList === "Gathering" ? styles.active : ""}`} onClick={ ()=>setSelectedList("Gathering")}>Gathering</li>
      </ul>
    </section>
  );
}

export default UserInfo;
