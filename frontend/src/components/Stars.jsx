import React from "react";
import { FaStar } from "react-icons/fa";
function Stars({ count = 5 }) {
  const rate = [];
  for (let i = 1; i <= count; i++) {
    if (i <= count) {
      rate.push(i);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "rows", gap: "3px" }}>
      {rate.map((item) => (
        <div key={item} style={{ color: "gold ", fontSize: "18px" }}>
          <FaStar />
        </div>
      ))}
    </div>
  );
}

export default Stars;
