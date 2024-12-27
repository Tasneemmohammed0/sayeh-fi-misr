import React, { useState, useReducer, useContext, useEffect } from "react";
import styles from "../styles/AccountSetting.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { UserContext } from "../App";

import { Toaster } from "sonner";

import "react-toastify/dist/ReactToastify.css";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Signout from "../components/Signout";
import axios from "axios";
import AccountPhotoEditFrom from "../components/AccountPhotoEditFrom";

function reducer(state, action) {
  switch (action.type) {
    case "updateFirstname":
      if (!action.payload) {
        return {
          ...state,
          first_name: action.payload,
          error_firstname: "Firstname must not be empty",
        };
      } else if (action.payload.length < 3) {
        return {
          ...state,
          first_name: action.payload,
          error_firstname: "Firstname must be at least 3 characters long",
        };
      } else if (action.payload.length > 50) {
        return {
          ...state,
          error_firstname: "Firstname must be less than 50 characters long",
        };
      } else if (!/^[a-zA-Z\s]+$/.test(action.payload)) {
        return {
          ...state,
          error_firstname: "Firstname must only contain letters and spaces",
        };
      }

      return { ...state, first_name: action.payload, error_firstname: "" };

    case "updateLastname":
      if (!action.payload) {
        return {
          ...state,
          last_name: action.payload,
          error_lastname: "Lastname must not be empty",
        };
      } else if (action.payload.length < 3) {
        return {
          ...state,
          last_name: action.payload,
          error_lastname: "Lastname must be at least 3 characters long",
        };
      } else if (action.payload.length > 50) {
        return {
          ...state,
          error_lastname: "Lastname must be less than 50 characters long",
        };
      } else if (!/^[a-zA-Z\s]+$/.test(action.payload)) {
        return {
          ...state,
          error_lastname: "Lastname must only contain letters and spaces",
        };
      }
      return { ...state, last_name: action.payload, error_lastname: "" };

    case "updateUsername":
      if (!action.payload) {
        return {
          ...state,
          username: action.payload,
          error_username: "Usernane must not be empty",
        };
      } else if (action.payload.length < 3) {
        return {
          ...state,
          username: action.payload,
          error_username: "Username must be at least 3 characters long",
        };
      } else if (action.payload.length > 50) {
        return {
          ...state,
          username: action.payload,
          error_username: "Username must be less than 50 characters long",
        };
      }
      return { ...state, username: action.payload, error_username: "" };

    case "updateEmail":
      if (!action.payload) {
        return {
          ...state,
          email: action.payload,
          error_email: "Email must not be empty",
        };
      } else if (!action.payload.includes("@")) {
        return {
          ...state,
          email: action.payload,
          error_email: "Invalid email",
        };
      }
      return { ...state, email: action.payload, error_email: "" };

    case "updatePassword":
      if (action.payload.length < 8) {
        return {
          ...state,
          password: action.payload,
          error_password: "Password must be at least 8 characters long",
        };
      } else if (
        !action.payload.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
        )
      ) {
        return {
          ...state,
          password: action.payload,
          error_password:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        };
      }
      return { ...state, password: action.payload, error_password: "" };

    default:
      throw new Error("Unknown action type");
  }
}

function AccountSetting() {
  const [edit, setEdit] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);

  const currentUser = useLoaderData();
  const [hover, sethover] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, {
    first_name: currentUser?.first_name,
    error_firstname: "",
    last_name: currentUser?.last_name,
    error_lastname: "",
    username: currentUser?.username,
    error_username: "",
    email: currentUser?.email,
    error_email: "",
    password: "",
    error_password: "",
    profile: currentUser?.profile_pic,
  });

  if (!currentUser) return <h1>Please login</h1>;

  function handleEdit(e, type) {
    e.preventDefault();
    if (e.target.tagName == "DIV" || e.target.tagName == "FORM") {
      setEdit("");
      return;
    }

    if (!type) {
      return;
    }

    if (type === "first_name") {
      setEdit("first_name");
    } else if (type === "last_name") {
      setEdit("last_name");
    } else if (type === "username") {
      setEdit("username");
    } else if (type === "email") {
      setEdit("email");
    }
  }

  function handleErrors() {
    const errorMessages = Object.keys(state)
      .filter((key) => key.startsWith("error_") && state[key]) // Filter error keys that are non-empty
      .map((key) => state[key]); // Get their corresponding error messages

    errorMessages.forEach((message) => toast.error(message));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = Object.keys(state).filter(
      (key) => key.startsWith("error_") && state[key]
    );
    if (errors.length > 0) {
      if (state?.error_firstname === "Firstname must not be empty") {
        dispatch({ type: "updateFirstname", payload: currentUser?.first_name });
      }
      if (state?.error_lastname === "Lastname must not be empty") {
        dispatch({ type: "updateLastname", payload: currentUser?.last_name });
      }
      if (state?.error_username === "Usernane must not be empty") {
        dispatch({ type: "updateUsername", payload: currentUser?.username });
      }
      if (state?.error_email === "Email must not be empty") {
        dispatch({ type: "updateEmail", payload: currentUser?.email });
      }

      handleErrors();
      return;
    }
    const response = await axios.patch(
      "http://localhost:1123/api/v1/users",
      {
        state,
      },
      { withCredentials: true }
    );
    toast.success("Account settings updated successfully!");
    setEdit("");
  }

  return (
    <>
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onClick={(e) => handleEdit(e, "")}
      >
        <ToastContainer />
        <Toaster richColors />

        <h1 className={styles.heading}>Account Settings</h1>

        <form className={styles.form}>
          <div
            className={styles.profileContainer}
            onMouseEnter={() => sethover(true)}
            onMouseLeave={() => setEdit(false)}
          >
            <img
              src={state.profile || "../../src/assets/images/userAvatar.png"}
              alt="Profile Picture"
              className={styles.profilePicture}
            />
            {hover && (
              <button
                className={styles.editProfileButton}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPhotoForm(true);
                }}
              >
                Edit
              </button>
            )}
          </div>

          {/* First Name */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              value={state.first_name}
              onChange={(e) =>
                dispatch({ type: "updateFirstname", payload: e.target.value })
              }
              disabled={edit !== "first_name"}
            />
            <button
              className={styles.edit}
              onClick={(e) => handleEdit(e, "first_name")}
            >
              Edit
            </button>
          </div>

          {/* Last Name */}
          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              value={state.last_name}
              onChange={(e) =>
                dispatch({ type: "updateLastname", payload: e.target.value })
              }
              disabled={edit !== "last_name"}
            />
            <button
              className={styles.edit}
              onClick={(e) => handleEdit(e, "last_name")}
            >
              Edit
            </button>
          </div>

          {/* Username */}
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "updateUsername", payload: e.target.value })
              }
              disabled={edit !== "username"}
            />
            <button
              className={styles.edit}
              onClick={(e) => handleEdit(e, "username")}
            >
              Edit
            </button>
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "updateEmail", payload: e.target.value })
              }
              disabled={edit !== "email"}
            />
            <button
              className={styles.edit}
              onClick={(e) => handleEdit(e, "email")}
            >
              Edit
            </button>
          </div>

          <div className={styles.formGroup}>
            <button
              className={`${styles.button} ${styles.password}`}
              onClick={(e) => {
                e.preventDefault();
                setShowChangePassword(true);
              }}
            >
              Change Password
            </button>

            <button
              className={`${styles.button} ${styles.password}`}
              onClick={(e) => {
                e.preventDefault();
                setShowSignOut(true);
              }}
            >
              Sign Out
            </button>
          </div>

          {/* Submit Button */}
          <button className={styles.button} onClick={(e) => handleSubmit(e)}>
            Save Changes
          </button>
        </form>

        <ChangePasswordForm
          isOpen={showChangePassword}
          handleForm={setShowChangePassword}
          userPassword={currentUser?.password}
        />

        <Signout
          isOpen={showSignOut}
          handleForm={setShowSignOut}
          user={currentUser}
          setUser={setUser}
        />
      </div>

      {showPhotoForm && (
        <AccountPhotoEditFrom
          photo={state.profile || "../../src/assets/images/userAvatar.png"}
          onClose={() => setShowPhotoForm(false)}
          user={currentUser}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default AccountSetting;
