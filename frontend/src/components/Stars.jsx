import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function Stars({ count = 5, fontSize = "18px", color = "gold" }) {
  if (!count) count = 0;

  const rate = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= count) {
      rate.push(<FaStar />);
    } else if (!Number.isInteger(count) && i === Math.ceil(count)) {
      rate.push(<FaStarHalfAlt />);
    } else {
      rate.push(<FaRegStar />);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "rows", gap: "3px" }}>
      {rate.map((item, index) => (
        <div key={index} style={{ color: `${color}`, fontSize: `${fontSize}` }}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default Stars;
