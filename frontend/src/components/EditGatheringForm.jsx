import React, { useState, useContext } from "react";
import styles from "../styles/EditGatheringForm.module.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../App";

function EditGatheringForm({ gathering, isOpen, onClose, setGatheringList }) {
  if (!isOpen) return null;

  const { places, setPlaces } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: gathering.title,
    placeName: gathering.name,
    capacity: gathering.max_capacity,
    duration: gathering.duration,
    description: gathering.description,
  });

  console.log("formData", formData);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Extract data from formData
    const { title, placeName, capacity, duration, description } = formData;

    if (!title || title.trim() === "") {
      toast.error("Title is required.");
      return;
    }

    if (!placeName || placeName.trim() === "") {
      toast.error("Place name is required.");
      return;
    }

    if (!capacity || isNaN(capacity) || capacity <= 0) {
      toast.error("Capacity must be a positive number.");
      return;
    }

    if (!duration || isNaN(duration) || duration <= 0) {
      toast.error("Duration must be a positive number.");
      return;
    }

    if (!description || description.trim() === "") {
      toast.error("Description is required.");
      return;
    }

    const payload = {
      title,
      placeName,
      max_capacity: parseInt(capacity, 10),
      duration: parseInt(duration, 10),
      description,
    };

    console.log("Submitting data:", payload);

    try {
      // Simulate API call
      const response = await axios.put(
        `http://localhost:1123/api/v1/gatherings/${gathering.gathering_id}`,
        payload,
        { withCredentials: true }
      );

      console.log("Response:", response.data);

      if (response.status != "fail") {
        setGatheringList((list) =>
          list.map((g) => {
            if (g.gathering_id === gathering.gathering_id) {
              return {
                ...g,
                ...payload,
              };
            }
            return g;
          })
        );
        toast.success("Gathering updated successfully.");

        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        toast.error("Failed to update the gathering. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred while updating the gathering.");
    }
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
              required
            />

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
