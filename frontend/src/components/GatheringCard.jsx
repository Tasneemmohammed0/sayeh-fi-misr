import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineArrowRightAlt, MdEmojiPeople } from "react-icons/md";
import { IoCameraOutline, IoPeopleOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import styles from "../styles/GatheringCard.module.css";
import EditGatheringForm from "./EditGatheringForm";

function GatheringCard({
  photo = "/src/assets/images/temple.png",
  placeName = "Luxor Tempale",
  location = "Luxor ",
  hostname = "Hany",
  currentcapacity = 0,
  duration = 1,
  onClick,
  id,
  selectedOption = null,
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  function handleDelete(id) {
    console.log("delete", id);
    setShowEditForm(false);
  }
  function handleEdit() {
    console.log("edit", id);
    setShowEditForm(true);
  }

  return (
    <>
      <div className={styles.card} onClick={onClick}>
        {selectedOption === "edit" && (
          <div className={styles.tooltip}>
            <CiEdit onClick={() => handleEdit()} className={styles.opIcons} />
            <span className={styles.tooltipText}>Edit</span>
          </div>
        )}

        {selectedOption === "delete" && (
          <div className={styles.tooltip}>
            <MdDelete
              onClick={() => handleDelete(id)}
              className={styles.opIcons}
              style={{ color: "red" }}
            />
            <span className={styles.tooltipText}>Delete</span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingTop: "10px",
          }}
        >
          <img src={photo} alt="card image" className={styles.cardImage} />
        </div>
        <div className={styles.cardContent}>
          <h2
            className={styles.cardTitle}
            style={{ fontSize: `${placeName.length >= 20 ? "18px" : "24px"}` }}
          >
            {placeName}
          </h2>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoDiv}>
            <IoPeopleOutline className={styles.cardIcon} />
            <p style={{ fontSize: "12px" }}>
              Current Capacity:{currentcapacity}
            </p>
          </div>
          <div className={styles.cardInfoDiv}>
            <LuCalendarDays className={styles.cardIcon} />
            <p style={{ fontSize: "12px" }}> Duration:{duration} hours </p>
          </div>
          <div className={styles.cardInfoDiv}>
            <MdEmojiPeople className={styles.cardIcon} />
            <p style={{ fontSize: "12px" }}>
              Created by: <span style={{ color: "#FF6B00" }}>{hostname}</span>
            </p>
          </div>
        </div>
        <div className={styles.location}>
          <FaLocationDot
            className={`${styles.cardIcon}`}
            style={{ color: "orange" }}
          />
          <p style={{ fontSize: "16px" }}>{location}</p>
        </div>
        <div className={styles.dottedLine}></div>
        <div className={styles.cardFooter}>
          <p className="join">JOIN</p>
          <MdOutlineArrowRightAlt className={styles.rightArrow} />
        </div>
      </div>

      <EditGatheringForm
        photo={photo}
        placeName={placeName}
        location={location}
        currentcapacity={currentcapacity}
        duration={duration}
        id={id}
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
      />
    </>
  );
}

export default GatheringCard;
