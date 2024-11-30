import styles from "../styles/PhotoForm.module.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

function PhotoForm({ isOpen, setIsOpen, placeId }) {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  function handleClose() {
    setPhoto(null);
    setIsOpen(false);
  }

  async function handleImage(file) {
    if (!file) {
      setError("Please choose a photo to upload.");
      return;
    }

    try {
      const CLOUDINARY_URL =
        "https://api.cloudinary.com/v1_1/dtnpd6qvp/image/upload";

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Amrhany");
      data.append("cloud_name", "dtnpd6qvp");

      const response = await axios.post(CLOUDINARY_URL, data);

      const urlImage = response.data.url;
      setPhoto(urlImage);
      console.log(urlImage);
      return urlImage;
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload the image. Please try again.");
      return null;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!photo) {
      setError("Please choose a photo to upload.");
      return;
    }
    const date = new Date().toISOString();
    try {
      const data = {
        photo,
        date,
        placeId,
        caption,
      };

      axios.post(
        `http://localhost:1123/api/v1/places/${placeId}/addPhoto`,
        data
      );

      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.popupOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Share Your View: Upload a Photo</h3>
        <button className={styles.popupClose} onClick={handleClose}>
          <IoMdClose />
        </button>
        <label className={styles.formLabel}>
          Choose a photo
          <input
            className={styles.photo}
            type="file"
            name="uploadedPic"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={async (e) => {
              const url = await handleImage(e.target.files[0]);
              if (url) setPhoto(url);
            }}
          />
        </label>
        <label className={styles.formLabel}>
          Caption
          <textarea
            className={styles.captionText}
            placeholder="Write your caption.."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={400}
          ></textarea>
        </label>

        {photo && (
          <img
            src={photo}
            label="uploadedPhoto"
            className={styles.imagePreview}
          />
        )}

        <button type="submit" className={styles.formButton}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default PhotoForm;
