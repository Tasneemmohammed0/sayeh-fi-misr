import React, { useState } from "react";
import styles from "../styles/EditGiftForm.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
function EditGiftForm({ onClose, giftData, setGifts, places }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: giftData?.name || "",
    points: giftData?.points || "",
    place: giftData?.place_name || "",
    description: giftData?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        name: formData.name,
        points: formData.points,
        place: formData.place,
        description: formData.description,
      };
      // console.log(data);
      const response = axios.put(
        `http://localhost:1123/api/v1/bazaar/${giftData.product_code}/editGift`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === "fail") {
        toast.error("Failed to update gift");
        return;
      }

      setGifts((prevGifts) =>
        prevGifts.map((item) =>
          item.product_code === giftData.product_code
            ? { ...item, ...data }
            : item
        )
      );
      toast.success("Gift updated successfully");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.overlay}>
      <ToastContainer />
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit Gift</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.points}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="place" className={styles.label}>
              Place
            </label>
            <select
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="" disabled>
                Select a place
              </option>
              {places.map((place) => (
                <option key={place.id} value={place.name}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              required
            ></textarea>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGiftForm;
