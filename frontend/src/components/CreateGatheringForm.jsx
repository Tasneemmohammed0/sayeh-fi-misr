import React, { useReducer, useState } from "react";
import styles from "../styles/CreateGatheringForm.module.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return { ...state, title: action.value };
    case "UPDATE_DURATION":
      return { ...state, duration: action.value };
    case "UPDATE_GATHERING_DATE":
      return { ...state, gathering_date: action.value };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.value };
    case "UPDATE_MAX_CAPACITY":
      return { ...state, max_capacity: action.value };
    case "UPDATE_PLACE_ID":
      return { ...state, place_id: action.value };
    case "UPDATE_HOST_ID":
      return { ...state, host_id: action.value };

    case "UPDATE_LANGUAGE":
      return { ...state, language: action.value };

    case "RESET_FORM":
      return action.initialState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
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

function CreateGatheringForm({
  id,
  places,
  createFormVisible,
  onClose,
  setGatheringList,
  setLoading,
  setMessage,
}) {
  const initialState = {
    title: "",
    duration: "",
    gathering_date: "",
    description: "",
    max_capacity: "",
    place_id: "",
    host_id: id,
    language: "",
  };
  const [error, setError] = useState("");
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        dispatch({ type: "UPDATE_TITLE", value });
        break;
      case "duration":
        dispatch({ type: "UPDATE_DURATION", value });
        break;
      case "gathering_date":
        dispatch({ type: "UPDATE_GATHERING_DATE", value });
        break;
      case "description":
        dispatch({ type: "UPDATE_DESCRIPTION", value });
        break;
      case "max_capacity":
        dispatch({ type: "UPDATE_MAX_CAPACITY", value });
        break;
      case "place_id":
        dispatch({ type: "UPDATE_PLACE_ID", value });
        break;
      default:
        throw new Error(`Unknown field name: ${name}`);
    }
  };

  /// TODO : Implement onSubmit with post request

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:1123/api/v1/gatherings`,
        {
          title: formState.title,
          duration: parseInt(formState.duration, 10),
          gathering_date: formState.gathering_date,
          description: formState.description,
          max_capacity: parseInt(formState.max_capacity, 10),
          place_name: formState.place_id,
          host_id: formState.host_id,
        },
        {
          withCredentials: true,
        }
      );

      setGatheringList((prev) => [...prev, response.data.data]);
      setMessage("Gathering created successfully!");
      handleClose(); // Close the form after successful submission
      setError("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    onClose();
    dispatch({ type: "RESET_FORM", initialState });
  };

  return (
    <>
      {createFormVisible && (
        <>
          <ToastContainer />

          <div className={styles.overlay}>
            <div className={styles.popup}>
              <h2>Create Gathering</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.formLabel}>
                  Title:
                  <input
                    type="text"
                    name="title"
                    className={styles.formInput}
                    value={formState.title}
                    onChange={handleChange}
                    // required
                  />
                </label>
                <label className={styles.formLabel}>
                  Duration:
                  <input
                    type="number"
                    name="duration"
                    className={styles.formInput}
                    value={formState.duration}
                    onChange={handleChange}
                    // required
                  />
                </label>
                <label className={styles.formLabel}>
                  Gathering Date:
                  <input
                    type="date"
                    name="gathering_date"
                    className={styles.formInput}
                    value={formState.gathering_date}
                    onChange={handleChange}
                    // required
                  />
                </label>
                <label className={styles.formLabel}>
                  Max Capacity:
                  <input
                    type="number"
                    name="max_capacity"
                    className={styles.formInput}
                    value={formState.max_capacity}
                    onChange={handleChange}
                    // required
                  />
                </label>
                <label className={styles.formLabel}>
                  Place:
                  <select
                    name="place_id"
                    value={formState.place_id}
                    className={styles.formSelect}
                    onChange={handleChange}
                    // required
                  >
                    <option value="" disabled>
                      Select Place
                    </option>
                    {places.map((place) => (
                      <option key={place.place_id} value={place.name}>
                        {place.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.formLabel}>
                  Language:
                  <select
                    name="language"
                    value={formState.language || ""}
                    className={styles.formSelect}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LANGUAGE",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Language
                    </option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.formLabel}>
                  Description:
                  <textarea
                    name="description"
                    value={formState.description}
                    className={styles.formTextarea}
                    onChange={handleChange}
                    // required
                  />
                </label>

                <div className={styles.buttonsGroup}>
                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>

                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  {error && <ErrorMessage error={error} />}
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CreateGatheringForm;
