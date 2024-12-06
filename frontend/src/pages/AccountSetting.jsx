import React, { useState, useReducer } from "react";
import styles from "../styles/AccountSetting.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Signout from "../components/Signout";
const usertemp = {
  id: 1,
  firstname: "Amr",
  lastname: "Hany",
  username: "fire gamer",
  profilePic: "/src/assets/images/user avatar.png",
  email: "amrhanyseed@gmail.com",
  password: "Amrhany123",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateFirstname":
      if (action.payload.length === 0) {
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
      if (action.payload.length === 0) {
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
      if (action.payload.length === 0) {
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
      if (action.payload.length === 0) {
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

  const [state, dispatch] = useReducer(reducer, {
    first_name: usertemp.firstname,
    error_firstname: "",
    last_name: usertemp.lastname,
    error_lastname: "",
    username: usertemp.username,
    error_username: "",
    email: usertemp.email,
    error_email: "",
    password: "",
    error_password: "",
  });

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

    errorMessages.forEach((message) => toast.error(message)); // Display each error message using toast
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = Object.keys(state).filter(
      (key) => key.startsWith("error_") && state[key]
    );
    if (errors.length > 0) {
      if (state.error_firstname === "Firstname must not be empty") {
        console.log("empty here ");
        dispatch({ type: "updateFirstname", payload: usertemp.firstname });
      }
      if (state.error_lastname === "Lastname must not be empty") {
        console.log("empty here last ");
        dispatch({ type: "updateLastname", payload: usertemp.lastname });
      }
      if (state.error_username === "Usernane must not be empty") {
        dispatch({ type: "updateUsername", payload: usertemp.username });
      }
      if (state.error_email === "Email must not be empty") {
        dispatch({ type: "updateEmail", payload: usertemp.email });
      }

      handleErrors();
      return;
    }
    toast.success("Account settings updated successfully!");
    setEdit("");
  }

  console.log("state", state);

  return (
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
      <h1 className={styles.heading}>Account Settings</h1>

      <form className={styles.form}>
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
        </div>

        <div className={styles.formGroup}>
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
        userPassword={usertemp.password}
      />

      <Signout
        isOpen={showSignOut}
        handleForm={setShowSignOut}
        user={usertemp}
      />
    </div>
  );
}

export default AccountSetting;
