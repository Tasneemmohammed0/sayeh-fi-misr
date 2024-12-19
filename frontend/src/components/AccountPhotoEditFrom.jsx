import React, { useState } from "react";
import styles from "../styles/AccountSetting.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AccountPhotoEditFrom({ onClose, photo, user, setUser }) {
  const [currentPhoto, setcurrentPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [test, setTest] = useState("");
  const navigate = useNavigate();

  function handlePhotoChange(e) {
    setcurrentPhoto(e.target.files[0]);
  }
  async function handlesImage(filex) {
    const file = filex;
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dtnpd6qvp/image/upload";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Amrhany"); // Cloudinary upload preset
      data.append("cloud_name", "dtnpd6qvp"); // Cloudinary cloud name

      const response = await axios.post(CLOUDINARY_URL, data);
      const urlimage = response.data;
      return urlimage.url;
    } else {
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      let url = await handlesImage(currentPhoto);
      let state = {
        profile_pic: url,
      };
      const response = await axios.patch(
        "http://localhost:1123/api/v1/users",
        {
          state,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.status !== "fail") {
        setUser({ ...user, profile_pic: url });
        toast.success("Profile picture updated successfully!");
        setTimeout(() => {
          onClose();
          navigate("/profile");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <ToastContainer />
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        <h2 className={styles.header}>Change Profile Picture</h2>
        <div className={styles.formphoto}>
          <div className={styles.formGroup}>
            <input
              type="file"
              id="photo"
              name="photo"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={(e) => {
                handlePhotoChange(e);
              }}
              className={styles.inputphoto}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default AccountPhotoEditFrom;
