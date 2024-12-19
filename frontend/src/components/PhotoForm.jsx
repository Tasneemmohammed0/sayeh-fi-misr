import styles from "../styles/PhotoForm.module.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

function PhotoForm({ isOpen, setIsOpen, placeId, setTriggerFetch }) {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");

  if (!isOpen) return null;

  function handleClose() {
    setPhoto(null);
    setIsOpen(false);
  }

  async function handleImage(file) {
    if (!file) {
      toast("Please choose a photo to upload.");
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
      console.error(err);
      toast("Error uploading the photo");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!photo) {
      toast("Please choose a photo to upload.");
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

      await axios.post(
        `http://localhost:1123/api/v1/places/${placeId}/addPhoto`,
        data,
        { withCredentials: true }
      );

      // Update the photo list
      setTriggerFetch((prev) => !prev);

      notify("Photo uploaded successfully");
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  // pretty alerts
  function notify(msg) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: msg,
      timer: 3000,
    });
  }

  return (
    <div className={styles.popupOverlay}>
      <ToastContainer />
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
