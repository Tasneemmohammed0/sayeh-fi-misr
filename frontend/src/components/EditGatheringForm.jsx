import React, { useState } from "react";
import styles from "../styles/EditGatheringForm.module.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
function EditGatheringForm({
  isOpen,
  id,
  duration,
  currentcapacity,
  location,
  photo,
  placeName,
  onClose,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    placeName: placeName,
    capacity: currentcapacity,
    duration: duration,
    location: location,
    photo: photo,
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    //// api to update the gathering by id with the new data
    /// and

    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className={styles.heading}>Edit Gathering</h2>
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
              value={formData.placeName}
              onChange={handleChange}
              required
            />
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
