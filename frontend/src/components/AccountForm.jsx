import React, { useState, useContext } from "react";
import styles from "../styles/accountForm.module.css";
import ErrorMessage from "./ErrorMessage";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { UserContext } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AccountForm({ state, dispatch, handleCount }) {
  const backGrounds = [
    "Tourism and Hospitality Management",
    "History Studies",
    "Geography Studies",
  ];

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setError(0);
      if (
        state.username === "" ||
        state.email === "" ||
        state.role === "" ||
        state.password === ""
      ) {
        setError(1);
        return;
      }
      if (state.password !== confirmPassword) {
        setError(2);
        return;
      }

      if (
        state.role == "host" &&
        (state.phone === "" || state.background === "")
      ) {
        setError(1);
        return;
      }

      setLoading(true);
      let url = await handlesImage(state.profilepic);

      const User = {
        firstName: state.first_name,
        lastName: state.last_name,
        age: state.age,
        gender: state.gender,
        country: state.country,
        city: state.city,
        nationalities: state.nationality,
        username: state.username,
        email: state.email,
        photo: url ? url : undefined,
        role: state.role,
        password: state.password,
      };

      if (state.role === "host") {
        User.phone = state.phone;
        User.background = state.background;
      }

      const res = await axios.post(
        "http://localhost:1123/api/v1/users/signup",
        User,
        {
          withCredentials: true,
        }
      );
      setUser(res.data.data);
      navigate("/home");
    } catch (err) {
      if (err.response.data.message === "Email already in use") {
        setError(3);
      } else if (err.response.data.message === "Username already in use") {
        setError(4);
      } else {
        console.log(err.message);
        console.log(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
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
      {loading && <Loading />}
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
        {error === 4 && <ErrorMessage error="username already in use" />}
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
        {error === 3 && <ErrorMessage error="Email already in use" />}
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
          <option value="visitor">Visitor</option>
          <option value="host">Host</option>
        </select>
      </div>

      {state.role == "host" && (
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
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={(e) =>
              dispatch({ type: "updatePassword", payload: e.target.value })
            }
          />
          <span
            className={styles.icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <ErrorMessage error={state.error_password} />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Confirm Password</label>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showConfirmPassword ? "text" : "password"}
            name="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className={styles.icon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error == 2 && (
          <ErrorMessage error="Confirm Password must match the Password" />
        )}
      </div>

      <div>
        <button className={styles.btn} onClick={(e) => handleCount(e, "back")}>
          <span className={styles.arrow}>
            <FaArrowLeft />
          </span>
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
