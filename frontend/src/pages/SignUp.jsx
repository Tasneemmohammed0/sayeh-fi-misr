import React, { useEffect, useState, useReducer } from "react";
import styles from "../styles/signup.module.css";
import PersonalForm from "../components/PersonalForm";
import AccountForm from "../components/AccountForm";

function reducer(state, action) {
  switch (action.type) {
    case "updateFirstname":
      if (action.payload.length < 1) {
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
      if (action.payload.length < 1) {
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
    case "updateAge":
      return { ...state, age: action.payload };
    case "updateGender":
      return { ...state, gender: action.payload };
    case "updateCountry":
      return { ...state, country: action.payload, cities: [], city: "" };
    case "updateCity":
      return { ...state, city: action.payload };
    case "updateNationality":
      return { ...state, nationality: action.payload };

    ///////////////////////////////////////////////////////////
    case "updateUsername":
      if (action.payload.length < 3) {
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
    case "updateProfilepic":
      return { ...state, profilepic: action.payload };
    case "updateEmail":
      if (!action.payload.includes("@")) {
        return {
          ...state,
          email: action.payload,
          error_email: "Invaild email ",
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
    case "updateRole":
      return { ...state, role: action.payload };

    case "updatePhone":
      if (action.payload.length < 11) {
        return {
          ...state,
          phone: action.payload,
          error_phone: "Phone number must be at least 11 characters long",
        };
      } else if (action.payload.length > 11) {
        return {
          ...state,
          phone: action.payload,
          error_phone: "Phone number must be less than 11 characters long",
        };
      } else if (!action.payload.match(/^0\d*$/)) {
        return {
          ...state,
          phone: action.payload,
          error_phone: "the phone number must number & start with zero ",
        };
      }
      return { ...state, phone: action.payload, error_phone: "" };

    case "updateBackGround":
      return { ...state, background: action.payload };

    case "setCountries":
      return {
        ...state,
        countries: action.payload,
        nationalities: action.payload.map(
          (country) => country.name.split(" ")[0]
        ),
      };
    case "setCities":
      return { ...state, cities: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function SignUp() {
  const initialState = {
    first_name: "",
    error_firstname: "",
    last_name: "",
    error_lastname: "",
    age: 0,
    gender: "",
    country: "",
    city: "",
    nationality: [],
    username: "",
    error_username: "",
    profilepic: null,
    email: "",
    error_email: "",
    password: "",
    error_password: "",
    role: "",
    phone: "",
    error_phone: "",
    background: "",
    countries: [],
    cities: [],
    nationalities: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [count, setCount] = useState(0);

  function handleCount(e, dir) {
    if (count === 0 && dir !== "next") {
      return;
    }
    if (count === 1 && dir !== "back") {
      return;
    }

    if (dir === "next") {
      setCount((count) => count + 1);
    } else {
      setCount((count) => count - 1);
    }
  }

  return (
    <div className={styles.backGround}>
      <h2 className={styles.head}>Explore the beauty of Egypt</h2>

      {count == 0 && (
        <PersonalForm
          state={state}
          dispatch={dispatch}
          handleCount={handleCount}
        />
      )}
      {count == 1 && (
        <AccountForm
          state={state}
          dispatch={dispatch}
          handleCount={handleCount}
        />
      )}
    </div>
  );
}

export default SignUp;
