import React, { useState, useContext } from "react";
import styles from "../styles/EditPlaceForm.module.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../App";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function EditPlaceForm({ isOpen, card, onClose }) {
  if (!isOpen) return null;
  const { places: Places, setPlaces } = useContext(UserContext);
  const [formData, setFormData] = useState({
    place_id: card.place_id,
    name: card.name,
    location: card.location,
    city: card.city,
    photo: card.photo,
    type: card.type,
    description: card.description,
    foreign_adult_ticket_price: card.foreign_adult_ticket_price,
    foreign_student_ticket_price: card.foreign_student_ticket_price,
    egyptian_adult_ticket_price: card.egyptian_adult_ticket_price,
    egyptian_student_ticket_price: card.egyptian_student_ticket_price,
    opening_hours_holidays:
      card.opening_hours_holidays == null
        ? card.opening_hours_working_days
        : card.opening_hours_holidays,
    opening_hours_working_days: card.opening_hours_working_days,
  });

  const cities = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Luxor",
    "Aswan",
    "Suez",
    "Ismailia",
    "Marsa Matrouh",
    "Al-Beheira",
    "Kafr al-Sheikh",
    "Gharbiyya",
    "Sharqiyya",
    "Fayyum",
    "Beni Suef",
    "Minya",
    "Asyut",
    "New Valley",
    "Sohag",
    "Qena",
    "The Red Sea",
    "South Sinai",
  ];

  const types = ["Historical", "Museums", "Religious", "Saqqara & Dahshur"];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    try {
      const res = await axios.patch(
        `http://localhost:1123/api/v1/places`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      toast.success("Place updated successfully.");
      setPlaces(
        Places.map((place) =>
          place.place_id === card.place_id ? { ...place, ...formData } : place
        )
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to update place.");
    }

    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <div className={styles.overlay}>
      <ToastContainer />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className={styles.heading}>Edit Place</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="location">
              Location:
            </label>
            <input
              className={styles.input}
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="city">
              City:
            </label>
            <select
              className={styles.input}
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              {cities.map((city) => (
                <option key={city} value={city} name="city">
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="photo">
              Photo URL:
            </label>
            <input
              className={styles.input}
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="type">
              Type:
            </label>
            <select
              className={styles.input}
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              {types.map((type) => (
                <option key={type} value={type} name="type">
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">
              Description:
            </label>
            <textarea
              className={styles.textarea}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          {[
            "foreign_adult_ticket_price",
            "foreign_student_ticket_price",
            "egyptian_adult_ticket_price",
            "egyptian_student_ticket_price",
          ].map((field) => (
            <div className={styles.formGroup} key={field}>
              <label className={styles.label} htmlFor={field}>
                {field
                  .replace(/_/g, " ")
                  .replace(/^\w/, (c) => c.toUpperCase())}
                :
              </label>
              <input
                className={styles.input}
                type="number"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          {["opening_hours_holidays", "opening_hours_working_days"].map(
            (field) => (
              <div className={styles.formGroup} key={field}>
                <label className={styles.label} htmlFor={field}>
                  {field
                    .replace(/_/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                  :
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder="From hh:mmam to hh:mmpm"
                />
              </div>
            )
          )}
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPlaceForm;
