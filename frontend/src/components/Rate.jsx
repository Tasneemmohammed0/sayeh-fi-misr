import { useState } from "react";
import { FaStar } from "react-icons/fa";

function Rate({ rate, setRate }) {
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const givenRating = index + 1;
        return (
          <label key={index} style={{ margin: "10px" }}>
            <input
              key={index}
              type="radio"
              style={{ display: "none" }}
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <FaStar
              size={22}
              color={
                givenRating < rate || givenRating === rate
                  ? "yellow"
                  : "var(--our-white)"
              }
            />
          </label>
        );
      })}
    </div>
  );
}

export default Rate;
