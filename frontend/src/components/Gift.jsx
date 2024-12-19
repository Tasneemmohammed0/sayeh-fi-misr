import styles from "../styles/Gift.module.css";
import { BiCoinStack } from "react-icons/bi";
import { React, useState, useContext, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import GiftPopup from "./GiftPopup";
import axios from "axios";
import Loading from "../../src/components/Loading";
import EditGiftForm from "../Admin/components/EditGiftForm";
import { UserContext } from "../App";
function Gift({
  card,
  totalPoints,
  updatePoints,
  role = "user",
  setGifts,
  selectedOption,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const { places } = useContext(UserContext);
  const handleActivation = async () => {
    if (role !== "admin") return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:1123/api/v1/bazaar/${card.product_code}`,
        {
          is_available: !card.is_available,
        },
        {
          withCredentials: true,
        }
      );
      setGifts((prevGifts) =>
        prevGifts.map((item) =>
          item.product_code === card.product_code
            ? { ...item, is_available: !item.is_available }
            : item
        )
      );
    } catch (err) {
      console.error("Error activating gift:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleDelete(id) {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:1123/api/v1/bazaar/${id}`, {
        withCredentials: true,
      });
      setGifts((prevGifts) =>
        prevGifts.filter((item) => item.product_code !== id)
      );
    } catch (err) {
      console.error("Error deleting gift:", err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = () => {
    setShowEditForm(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      <main
        className={styles.mainContainer}
        style={role === "admin" ? { height: "21rem" } : undefined}
        onClick={() => setShowPopup(true)}
      >
        {role == "admin" && selectedOption === "edit" && (
          <CiEdit onClick={() => handleEdit()} className={styles.opIcons} />
        )}

        {role == "admin" && selectedOption === "delete" && (
          <MdDelete
            onClick={() => handleDelete(card.product_code)}
            className={styles.opIcons}
            style={{ color: "red" }}
          />
        )}

        <img src={card.photo} alt="gift 1" className={styles.giftImage}></img>
        <div className={styles.giftDetailsContainer}>
          <div className={styles.priceContainer}>
            <BiCoinStack color="orange" size="1.3rem" />
            <p className={styles.priceText}>{card.points}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.giftTitle}>{card.name}</div>
            <div
              className={styles.giftPlace}
              style={{
                fontSize: `${card.place_name.length > 35 ? "10px" : "14px"}`, // Corrected spacing
              }}
            >
              {card.place_name}
            </div>
          </div>
        </div>
        {role === "admin" && (
          <div className={styles.activationContainer}>
            <p className={styles.status}>
              Status:
              <span
                style={{
                  color: card.is_available ? "green" : "red",
                }}
              >
                {card.is_available ? "Active" : "InActive"}
              </span>
            </p>
            <button
              onClick={handleActivation}
              className={styles.actionBtn}
              style={{
                backgroundColor: card.is_available ? "red" : "green",
                color: "white",
              }}
            >
              {card.is_available ? "DeActivate" : "Activate"}
            </button>
          </div>
        )}
      </main>

      {role !== "admin" && showPopup && (
        <GiftPopup
          card={card}
          handleForm={setShowPopup}
          totalPoints={totalPoints}
          updatePoints={updatePoints}
        />
      )}

      {role === "admin" && showEditForm && (
        <EditGiftForm
          giftData={card}
          onClose={() => setShowEditForm(false)}
          setGifts={setGifts}
          places={places}
        />
      )}
    </>
  );
}

export default Gift;

/// price place name description
