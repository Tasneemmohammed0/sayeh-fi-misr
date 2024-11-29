import React from "react";
import { FaStar } from "react-icons/fa";

function Stars({ count = 5, fontSize = "18px", color = "gold" }) {
  count = parseInt(count);

  const rate = [];
  for (let i = 1; i <= count; i++) {
    if (i <= count) {
      rate.push(i);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "rows", gap: "3px" }}>
      {rate.map((item) => (
        <div key={item} style={{ color: `${color}`, fontSize: `${fontSize}` }}>
          <FaStar />
        </div>
      ))}
    </div>
  );
}

export default Stars;
