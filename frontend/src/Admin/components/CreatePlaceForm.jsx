import React, { useState, useContext } from "react";
import styles from "../styles/EditPlaceForm.module.css";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../App";
import "react-toastify/dist/ReactToastify.css";

function CreatePlaceForm({ isOpen, onClose, setLoading }) {
  const { places: Places, setPlaces } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    photo: "",
    type: "",
    description: "",
    foreign_adult_ticket_price: "",
    foreign_student_ticket_price: "",
    egyptian_adult_ticket_price: "",
    egyptian_student_ticket_price: "",
    opening_hours_holidays: "",
    opening_hours_working_days: "",
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

  const types = ["Historical", "Museum", "Religious", "Saqqara & Dahshur"];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:1123/api/v1/places`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success("Place Updated successfully.");

      setPlaces((prev) => [...prev, res.data.data]);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <ToastContainer />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className={styles.heading}>Create Place</h2>
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
              <option value="" disabled name="city" key={0}>
                {" "}
                Select City{" "}
              </option>
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
              <option value="" disabled name="type" key={0}>
                {" "}
                Select Type{" "}
              </option>
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

export default CreatePlaceForm;
