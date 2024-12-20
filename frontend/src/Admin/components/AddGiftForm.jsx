import React, { useState } from "react";
import styles from "../styles/EditGiftForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "../../components/Loading";
function AddGiftForm({ onClose, setGifts, places }) {
  const [formData, setFormData] = useState({
    name: "",
    points: "",
    place: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    let url = await handlesImage(file);
    if (!url) {
      toast.error("Failed to upload image");
      return;
    }

    const data = {
      name: formData.name,
      points: parseInt(formData.points, 10),
      place_name: formData.place,
      description: formData.description,
      photo: url,
      is_available: true,
    };
    //console.log("==========Data", data);
    try {
      const response = await axios.post(
        `http://localhost:1123/api/v1/bazaar/addGift`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === "fail") {
        toast.error("Failed to add gift");
        return;
      }
      setGifts((prev) => [...prev, response.data.data]);
      toast.success("Gift added successfully");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to add gift");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <ToastContainer />
      {loading && <Loading />}
      <div className={styles.modal}>
        <h2 className={styles.title}>Add Gift</h2>
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
            <label htmlFor="name" className={styles.label}>
              Photo
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={(e) => setFile(e.target.files[0])}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="points" className={styles.label}>
              Price
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

export default AddGiftForm;
