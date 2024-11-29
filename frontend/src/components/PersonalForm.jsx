import React, { useState, useEffect } from "react";
import styles from "../styles/personalForm.module.css";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";
function PersonalForm({ state, dispatch, handleCount }) {
  const age = [];

  for (let i = 18; i <= 100; i++) {
    age.push(i);
  }
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(0);
  // Fetch countries on initial load
  // useEffect(() => {
  //   async function getCountries() {
  //     const url = 'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries';
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': 'ca3fc7c7c0mshdd4992f90c668c4p1a3606jsn59fff8298748',
  //         'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com',
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       let result = await response.json();
  //       //// remove this non country from the list (don't remove it)
  //       result= result.filter((item) => item.name !== 'Israel');
  //       ///////////////////////////////////////////////////////
  //       setCountries(result);
  //       console.log(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getCountries();
  // }, []);

  // // Fetch cities when a country is selected
  // useEffect(() => {
  //   if (!state.country) return;

  //   async function getCities() {
  //     const country = countries.find((item) => item.name === state.country);
  //     if (!country || !country.isoCode) return;

  //     const countryCode = country.isoCode;
  //     const url = `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode?countrycode=${countryCode}`;
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': 'ca3fc7c7c0mshdd4992f90c668c4p1a3606jsn59fff8298748',
  //         'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com',
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       setCities(result);
  //       console.log(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getCities();
  // }, [state.country, countries]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(state.first_name);
    console.log(state.last_name);

    if (!state.first_name || !state.last_name) {
      setError(1);
      console.log("error 1");
      return;
    }
    if (
      !state.age ||
      !state.gender ||
      !state.nationality /*|| !state.country || !state.city*/
    ) {
      setError(1);
      console.log("error 2");
      return;
    }
    console.log("go to next");
    handleCount(e, "next");
    setError(0);
  }

  ////////////////////////////////////////////////////

  console.log(state);
  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>First Name</label>
        <input
          className={styles.input}
          type="text"
          name="firstname"
          placeholder="First Name"
          value={state.first_name}
          onChange={(e) =>
            dispatch({ type: "updateFirstname", payload: e.target.value })
          }
        />
        <ErrorMessage error={state.error_firstname} />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Last Name</label>
        <input
          className={styles.input}
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={state.last_name}
          onChange={(e) =>
            dispatch({ type: "updateLastname", payload: e.target.value })
          }
        />
        <ErrorMessage error={state.error_lastname} />
      </div>
      <div className={`${styles.inputWrapper} ${styles.start}`}>
        <label className={`${styles.label} ${styles.marginR}`}>Age</label>
        <select
          className={styles.select}
          name="age"
          value={state.age}
          onChange={(e) =>
            dispatch({ type: "updateAge", payload: e.target.value })
          }
        >
          <option value="" disabled>
            Select Age
          </option>
          {age.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className={`${styles.inputWrapper}`}>
        <label className={`${styles.label} ${styles.marginR}`}>Gender</label>
        <select
          name="gender"
          value={state.gender}
          onChange={(e) =>
            dispatch({ type: "updateGender", payload: e.target.value })
          }
        >
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Nationality</label>
        <input
          className={styles.input}
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={state.nationality}
          onChange={(e) =>
            dispatch({ type: "updateNationality", payload: e.target.value })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label
          className={`${styles.label} ${styles.marginR} ${styles.specialLabel}`}
        >
          Country
        </label>
        <select
          required
          name="country"
          value={state.country}
          onChange={(e) =>
            dispatch({ type: "updateCountry", payload: e.target.value })
          }
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputWrapper}>
        <label className={`${styles.label} ${styles.marginR}`}>City</label>
        <select
          name="city"
          value={state.city}
          onChange={(e) =>
            dispatch({ type: "updateCity", payload: e.target.value })
          }
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className={styles.btn}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Next{" "}
          <span className={styles.arrow}>
            <FaArrowRight />
          </span>
        </button>
      </div>

      {error == 1 && (
        <div>
          <ErrorMessage error="Please fill all the fields" fontSize="15px" />
        </div>
      )}
    </form>
  );
}

export default PersonalForm;
