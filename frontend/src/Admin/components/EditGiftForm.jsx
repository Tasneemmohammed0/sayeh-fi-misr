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
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handlesImage(filex) {
    const file = filex;
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dtnpd6qvp/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Amrhany");
      data.append("cloud_name", "dtnpd6qvp");

      const response = await axios.post(CLOUDINARY_URL, data);
      const urlimage = response.data;
      return urlimage.url;
    } else {
      return "";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let url = await handlesImage(file);

      const data = {
        name: +formData.name ? +formData.name : formData.name,
        points: formData.points,
        place: formData.place,
        description: formData.description,
        photo: url,
      };

      const response = await axios.put(
        `http://localhost:1123/api/v1/bazaar/${giftData.product_code}/editGift`,
        data,
        {
          withCredentials: true,
        }
      );
      setGifts((prevGifts) =>
        prevGifts.map((item) =>
          item.product_code === giftData.product_code
            ? response.data.data
            : item
        )
      );
      toast.success("Gift updated successfully");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message);
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
            <label htmlFor="photo" className={styles.label}>
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={(e) => setFile(e.target.files[0])}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="points" className={styles.label}>
              points
            </label>
            <input
              type="number"
              id="points"
              name="points"
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
              <option value="" disabled key={0}>
                Select a place
              </option>
              {places.map((place, index) => (
                <option key={index + 1} value={place.name}>
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
