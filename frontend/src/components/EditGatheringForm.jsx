import React, { useState, useContext } from "react";
import styles from "../styles/EditGatheringForm.module.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../App";

function EditGatheringForm({
  isOpen,
  id,
  duration,
  currentcapacity,
  placeName,
  description,
  onClose,
}) {
  if (!isOpen) return null;

  const { places, setPlaces } = useContext(UserContext);

  // console.log("places", places);

  const [formData, setFormData] = useState({
    placeName: placeName,
    capacity: currentcapacity,
    duration: duration,

    description: description || "",
  });

  console.log("formData", formData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    const { placeName, capacity, duration, description } = formData;

    // Check if capacity is a positive integer
    if (isNaN(capacity) || capacity < 0) {
      toast.error("Capacity must be a positive number.");
      formData.capacity = currentcapacity;
      return;
    }

    // Check if duration is a positive integer
    if (isNaN(duration) || duration <= 0) {
      toast.error("Duration must be a positive number.");
      formData.duration = duration;
      return;
    }

    // If all validations pass
    // console.log("Form is valid. Submitting data...");
    toast.success("Gathering updated successfully.");

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
        <h2 className={styles.heading}>Edit Gathering</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Place:
            </label>

            <select
              className={`${styles.input} ${styles.select}`}
              value={formData.placeName}
              name="placeName"
              onChange={(e) => handleChange(e)}
            >
              <option value={formData.placeName} disabled>
                {formData.placeName}
              </option>
              {places.map(
                (place) =>
                  place.name !== formData.placeName && (
                    <option
                      className={styles.input}
                      key={place.id}
                      value={place.name}
                    >
                      {place.name}
                    </option>
                  )
              )}
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
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="duration">
              Duration (days):
            </label>
            <input
              className={styles.input}
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditGatheringForm;
