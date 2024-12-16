import React, { useReducer, useState } from "react";
import styles from "../styles/CreateGatheringForm.module.css";
import axios from "axios";
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
    case "RESET_FORM":
      return action.initialState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

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
  };

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

    if (formState.title == "") {
      toast.error("Please enter a gathering title");
    } else if (formState.duration == "") {
      toast.error("Please enter the duration");
    } else if (formState.gathering_date == "") {
      toast.error("Please enter the gathering date");
    } else if (formState.description == "") {
      toast.error("Please enter a description");
    } else if (formState.max_capacity == "" || isNaN(formState.max_capacity)) {
      toast.error("Please enter a valid maximum capacity");
    } else if (formState.place_id == "") {
      toast.error("Please select a place");
    }

    console.log(formState);

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

      if (response.status === "fail") {
        console.log("error");
        toast.error("unknown error occur");
        return;
      }
      console.log(response.data.data);
      setGatheringList((prev) => [...prev, response.data.data]);

      setMessage("Gathering created successfully");
      onClose();
      setLoading(false);

      dispatch({ type: "RESET_FORM", initialState });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <ToastContainer />
      {createFormVisible && (
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
                Description:
                <textarea
                  name="description"
                  value={formState.description}
                  className={styles.formTextarea}
                  onChange={handleChange}
                  // required
                />
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  className={styles.submitButton}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    onClose();
                    dispatch({ type: "RESET_FORM", initialState });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateGatheringForm;
