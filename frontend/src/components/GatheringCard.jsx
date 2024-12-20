import React, { useEffect, useState } from "react";

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineArrowRightAlt, MdEmojiPeople } from "react-icons/md";
import { IoCameraOutline, IoPeopleOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import styles from "../styles/GatheringCard.module.css";
import EditGatheringForm from "./EditGatheringForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GatheringCard({
  gathering,
  onClick,
  selectedOption = null,
  setGatheringList,
  setLoading,
}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:1123/api/v1/gatherings/${id} `,
        {
          withCredentials: true,
        }
      );

      if (response.data.status !== "fail") {
        setGatheringList((list) => list.filter((g) => g.gathering_id !== id));
        toast.success("Gathering deleted successfully");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    setShowEditForm(false);
  }
  function handleEdit() {
    // console.log("edit", id);
    setShowEditForm(true);
  }

  console.log(gathering);

  return (
    <>
      <ToastContainer />

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
              onClick={() => handleDelete(gathering.gathering_id)}
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
          <img
            src={gathering.photo}
            alt="card image"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardContent}>
          <h2
            className={styles.cardTitle}
            style={{
              fontSize: `${gathering.title?.length >= 20 ? "18px" : "24px"}`,
            }}
          >
            {gathering.title}
          </h2>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoDiv}>
            <IoPeopleOutline className={styles.cardIcon} />
            <p style={{ fontSize: "12px" }}>
              Max Capacity:{gathering.max_capacity}
            </p>
          </div>
          <div className={styles.cardInfoDiv}>
            <LuCalendarDays className={styles.cardIcon} />
            <p style={{ fontSize: "12px" }}>
              {" "}
              Duration:{gathering.duration} hours{" "}
            </p>
          </div>
          <div className={styles.cardInfoDiv}>
            <MdEmojiPeople className={styles.cardIcon} />
            <p style={{ fontSize: "12px" }}>
              Created by:{" "}
              <span style={{ color: "#FF6B00" }}>{gathering.first_name}</span>
            </p>
          </div>
        </div>
        <div className={styles.location}>
          <FaLocationDot
            className={`${styles.cardIcon}`}
            style={{ color: "orange" }}
          />
          <p style={{ fontSize: "16px" }}>{gathering.city}</p>
        </div>
        <div className={styles.dottedLine}></div>
        <div className={styles.cardFooter}>
          <p className="join">JOIN</p>
          <MdOutlineArrowRightAlt
            className={styles.rightArrow}
            onClick={() => navigate(`/gatherings/${gathering.gathering_id}`)}
          />
        </div>
      </div>

      <EditGatheringForm
        gathering={gathering}
        isOpen={showEditForm}
        setGatheringList={setGatheringList}
        onClose={() => setShowEditForm(false)}
      />
    </>
  );
}

export default GatheringCard;
