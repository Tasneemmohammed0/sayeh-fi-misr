import React, { useState, useContext } from "react";
import styles from "../styles/EditGatheringForm.module.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../App";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Arabic",
  "Hindi",
  "Russian",
  "Japanese",
  "Portuguese",
  "Italian",
  "Korean",
  "Turkish",
  "Dutch",
  "Swedish",
  "Polish",
  "Finnish",
  "Norwegian",
  "Danish",
  "Greek",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Czech",
  "Hungarian",
  "Romanian",
  "Bulgarian",
  "Slovak",
  "Ukrainian",
  "Malay",
  "Bengali",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Marathi",
  "Gujarati",
  "Urdu",
  "Persian",
  "Swahili",
  "Amharic",
  "Hausa",
  "Yoruba",
  "Igbo",
  "Zulu",
  "Xhosa",
  "Afrikaans",
  "Albanian",
  "Serbian",
  "Macedonian",
  "Croatian",
  "Slovenian",
  "Lithuanian",
  "Latvian",
  "Estonian",
  "Icelandic",
  "Irish",
  "Welsh",
  "Basque",
  "Catalan",
];

function EditGatheringForm({ gathering, isOpen, onClose, setGatheringList }) {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { places } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: gathering.title,
    placeName: gathering.name,
    capacity: gathering.max_capacity,
    duration: gathering.duration,
    description: gathering.description,
    status: gathering.is_open,
    gathering_date: formatDate(gathering.gathering_date),
    language: gathering.spoken_language,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      title,
      placeName,
      capacity,
      duration,
      description,
      gathering_date,
    } = formData;

    const payload = {
      title,
      placeName,
      max_capacity: parseInt(capacity, 10),
      duration: parseInt(duration, 10),
      description,
      is_open: formData.status,
      gathering_date,
      spoken_language: formData.language,
    };

    try {
      await axios.put(
        `http://localhost:1123/api/v1/gatherings/${gathering.gathering_id}`,
        payload,
        { withCredentials: true }
      );

      setGatheringList((list) =>
        list.map((g) =>
          g.gathering_id === gathering.gathering_id ? { ...g, ...payload } : g
        )
      );

      // Trigger toast and close modal after the toast disappears
      toast.success("Gathering updated successfully", {
        position: "top-right",
        autoClose: 800,
        onClose: () => onClose(), // Close the modal after the toast disappears
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 800,
      });
    }
  }

  return (
    <div className={styles.overlay}>
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="light"
      />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className={styles.heading}>Edit Gathering</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">
              Title:
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Place:
            </label>
            <select
              className={`${styles.input} ${styles.select}`}
              value={formData.placeName}
              name="placeName"
              onChange={handleChange}
            >
              <option value={formData.placeName} disabled key={0}>
                {formData.placeName}
              </option>
              {places.map(
                (place, index) =>
                  place.name !== formData.placeName && (
                    <option key={index + 1} value={place.name}>
                      {place.name}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Language:</label>
            <select
              name="language"
              value={formData.language}
              className={`${styles.input} ${styles.select}`}
              onChange={handleChange}
            >
              <option value="" disabled key={0}>
                Select Language
              </option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="capacity">
              Capacity:
            </label>
            <input
              className={styles.input}
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="gathering_date">
              Gathering Date:
            </label>
            <input
              className={styles.input}
              type="date"
              id="gathering_date"
              name="gathering_date"
              value={formData.gathering_date}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="duration">
              Duration (hours):
            </label>
            <input
              className={styles.input}
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
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
          <button
            className={styles.statusButton}
            type="button"
            style={{
              background: formData.status ? "#e10a0a" : "rgb(90, 253, 26)",
            }}
            onClick={() =>
              setFormData((prev) => ({ ...prev, status: !prev.status }))
            }
          >
            {formData.status ? "Close" : "Open"}
          </button>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditGatheringForm;
