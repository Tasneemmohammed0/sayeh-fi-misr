import React, { useContext, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineReviews, MdOutlineArrowRightAlt } from "react-icons/md";
import { IoCameraOutline, IoPeopleOutline } from "react-icons/io5";
import Stars from "./Stars";
import styles from "../styles/card.module.css";
import { LuCalendarDays } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
import EditPlaceForm from "../Admin/components/EditPlaceForm";
import { Link } from "react-router-dom";
function Card({
  card,
  selectedOption,
  onClick,
  visitList,
  inVisitList = false,
  setVisitList,
  setLoading,
  setStats,
}) {
  {
    /*  admin */
  }

  const [deleted, setDeleted] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { places: Places, setPlaces } = useContext(UserContext);

  async function handleDelete(id) {
    try {
      if (inVisitList) {
        const response = await axios.delete(
          `http://localhost:1123/api/v1/places/${id}/deleteFromVisitedList`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setVisitList(visitList.filter((place) => place.place_id !== id));
          toast.success("Place Deleted successfully.");
        } else {
          toast.error(
            "An error occured while deleting the place please try again later."
          );
        }
        setStats((prevStats) => {
          return {
            ...prevStats,
            places_count: prevStats.places_count - 1,
          };
        });
        setLoading(false);
        return;
      } else {
        await axios.delete(`http://localhost:1123/api/v1/places/${id}`, {
          withCredentials: true,
        });
        toast.success("Place Deleted successfully.");
        setDeleted(true);
        setPlaces(Places.filter((place) => place.place_id !== id));
      }
    } catch (err) {
      console.log(err);
    }
    console.log("delete", id);
    setShowEditForm(false);
  }
  function handleEdit() {
    console.log("edit", card.place_id);

    setShowEditForm(true);
  }

  if (!card.place_id) return null;

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
              onClick={() => handleDelete(card.place_id)}
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
          <img src={card.photo} alt="card image" className={styles.cardImage} />
        </div>
        <div className={styles.cardContent}>
          <h2
            className={styles.cardTitle}
            style={{
              fontSize: `${card.name.length >= 20 ? "18px" : "24px"}`,
            }}
          >
            {card.name}
          </h2>
          <div className={styles.rating}>{<Stars count={card.rate} />}</div>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoDiv}>
            <Link to={`/places/${card.place_id}`}>
              <MdOutlineReviews className={styles.cardIcon} />
            </Link>
            <p style={{ fontSize: "12px" }}>Reviews</p>
          </div>
          <div className={styles.cardInfoDiv}>
            <Link to={`/places/${card.place_id}`}>
              <IoCameraOutline className={styles.cardIcon} />
            </Link>
            <p style={{ fontSize: "12px" }}>Photos</p>
          </div>
          <div className={styles.cardInfoDiv}>
            <Link to={`/places/${card.place_id}`}>
              <IoPeopleOutline className={styles.cardIcon} />
            </Link>
            <p style={{ fontSize: "12px" }}>People</p>
          </div>
        </div>
        <div className={styles.location}>
          <FaLocationDot
            className={`${styles.cardIcon} ${styles.LocationCardIcon}  `}
          />
          <p style={{ fontSize: "12px" }}>{card.city}</p>
        </div>
        <div className={styles.dottedLine}></div>
        <div className={styles.cardFooter}>
          <p className={styles.details}>Read More</p>
        </div>
      </div>

      {showEditForm && (
        <EditPlaceForm
          card={card}
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}

export default Card;
