import React, { useState } from "react";
import styles from "../styles/accountForm.module.css";
import ErrorMessage from "./ErrorMessage";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AccountForm({ state, dispatch, handleCount }) {
  const backGrounds = [
    "Tourism and Hospitality Management",
    "History Studies",
    "Geography Studies",
  ];

  console.log(state);
  const [error, setError] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError(0);
    console.log(state);
    if (
      state.username === "" ||
      state.email === "" ||
      state.role === "" ||
      state.password === ""
    ) {
      setError(1);
      console.log("error 1");
      return;
    }
    if (state.password !== confirmPassword) {
      setError(2);
      console.log("error 2");
      return;
    }

    if (
      state.role == "guide" &&
      (state.phone === "" || state.background === "")
    ) {
      setError(1);
      console.log("error 3");
      return;
    }

    let url = await handlesImage(state.profilepic);

    const User = {
      firstname: state.firstname,
      lastname: state.lastname,
      age: state.age,
      gender: state.gender,
      country: state.country,
      city: state.city,
      nationality: state.nationality,
      username: state.username,
      email: state.email,
      profilepic: url,
      role: state.role,
      password: state.password,
    };

    if (state.role === "guide") {
      User.phone = state.phone;
      User.background = state.background;
    }

    //// send the data to Loay API
    console.log(User.profilepic);
    navigate("/home");
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

  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>User Name </label>
        <input
          className={styles.input}
          type="text"
          name="username"
          placeholder="User Name"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "updateUsername", payload: e.target.value })
          }
        />
        <ErrorMessage error={state.error_username} />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "updateEmail", payload: e.target.value })
          }
        />
        <ErrorMessage error={state.error_email} />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Profile Image</label>
        <input
          className={styles.input}
          type="file"
          name="profilepic"
          accept=".jpg,.jpeg,.png,.svg"
          onChange={(e) =>
            dispatch({ type: "updateProfilepic", payload: e.target.files[0] })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Role</label>
        <select
          className={styles.select}
          name="role"
          value={state.role}
          onChange={(e) =>
            dispatch({ type: "updateRole", payload: e.target.value })
          }
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="tourist">Tourist</option>
          <option value="guide">Guide</option>
        </select>
      </div>

      {state.role == "guide" && (
        <>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Phone</label>
            <input
              className={styles.input}
              type="text"
              name="phone"
              placeholder="Phone"
              value={state.phone}
              onChange={(e) =>
                dispatch({ type: "updatePhone", payload: e.target.value })
              }
            />
            <ErrorMessage error={state.error_phone} />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}> Educational Back Ground</label>
            <select
              className={styles.select}
              name="backGround"
              value={state.background}
              onChange={(e) =>
                dispatch({ type: "updateBackGround", payload: e.target.value })
              }
            >
              <option value="" disabled>
                Select Back Ground
              </option>
              {backGrounds.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) =>
            dispatch({ type: "updatePassword", payload: e.target.value })
          }
        />
        <ErrorMessage error={state.error_password} />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Confirm Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error == 2 && (
          <ErrorMessage error="Confirm password Must Equal Password" />
        )}
      </div>

      <div>
        <button className={styles.btn} onClick={(e) => handleCount(e, "back")}>
          {" "}
          <span className={styles.arrow}>
            <FaArrowLeft />
          </span>{" "}
          Previous
        </button>
      </div>

      <div>
        <button
          className={`${styles.btn} ${styles.specialBtn}`}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>

      <div>
        {error === 1 && <ErrorMessage error="All fields are required" />}
      </div>
    </form>
  );
}

export default AccountForm;
