import React, { useState, useEffect } from "react";
import styles from "../styles/personalForm.module.css";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";
import NationalitySelect from "./NationalitySelect";
import { GetCountries, GetState } from "react-country-state-city";
import Loading from "./Loading";
function PersonalForm({ state, dispatch, handleCount }) {
  const age = [];

  for (let i = 18; i <= 100; i++) {
    age.push(i.toString());
  }

  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const result = await GetCountries();
        dispatch({ type: "setCountries", payload: result });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  function handleCountryChange(e) {
    const Countryname = e.target.value;
    const Country = state.countries.find((item) => item.name == Countryname);
    console.log(Country);
    dispatch({ type: "updateCountry", payload: Country.name });

    /// get cities

    GetState(Country.id)
      .then((result) => {
        dispatch({ type: "setCities", payload: result });
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        dispatch({ type: "setCities", payload: [] });
      });
  }

  function handleCityChange(e) {
    const cityname = e.target.value; // id of the   state
    console.log(cityname);
    // const  City = state.cities.find((item) => item.id == cityid);
    // console.log( City.name);

    dispatch({ type: "updateCity", payload: cityname });
  }

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
      !state.nationality ||
      !state.country ||
      !state.city
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
      <Loading />
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
          <option disabled key={0}>
            Select Age
          </option>
          {age.map((item, index) => (
            <option key={index} value={item.toString()}>
              {item.toString()}
            </option>
          ))}
        </select>
      </div>
      <div className={`${styles.inputWrapper}`}>
        <label className={`${styles.label} ${styles.marginR}`}>Gender</label>
        <select
          name="gender"
          value={state.gender}
          className={styles.select}
          onChange={(e) =>
            dispatch({ type: "updateGender", payload: e.target.value })
          }
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <NationalitySelect state={state} dispatch={dispatch} />

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
          className={styles.select}
          onChange={(e) => handleCountryChange(e)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {state.countries.map((item, index) => (
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
          className={styles.select}
          onChange={(e) => handleCityChange(e)}
        >
          <option value="" disabled>
            Select City
          </option>
          {state.cities.map((item, index) => (
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
