import React, { useReducer, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../styles/personalform.module.css";

function NationalitySelect({ state, dispatch }) {
  // Handle change for multi-select
  const handleChange = (event) => {
    const { value } = event.target;

    // Update the selected nationalities
    const updatedNationalities =
      typeof value === "string" ? value.split(",") : value;

    dispatch({ type: "updateNationality", payload: value });
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>Nationality</label>
      <Select
        id="nationality-select"
        multiple
        value={state.nationality}
        onChange={handleChange}
        className={styles.select}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "#e4d7c5", // Background of the dropdown
            },
          },
        }}
      >
        <MenuItem disabled>Select your nationality</MenuItem>
        {state.nationalities.map((nationality, index) => (
          <MenuItem
            key={index}
            value={nationality}
            sx={{
              backgroundColor: "#e4d7c5", // Default background
              color: "black", // White text
              "&:hover": {
                backgroundColor: "#0056b3", // Hover background
                color: "white", // White text on hover
              },
              "&.Mui-selected": {
                backgroundColor: "#004085", // Selected background
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#003366", // Selected and hovered background
              },
            }}
          >
            {nationality}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default NationalitySelect;
