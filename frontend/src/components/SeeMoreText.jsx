import { useState } from "react";

function SeeMoreText({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <p
        style={{
          maxHeight: isExpanded ? "none" : "40px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          marginBottom: "0px",
          fontSize: "1.1rem",
          color: "black",
        }}
      >
        {text}
      </p>
      <p
        style={{
          color: "var(--our-blue)",
          cursor: "pointer",
          display: "inline-block",
          marginTop: "0px",
          fontSize: "1.1rem",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "See Less" : "See More"}
      </p>
    </div>
  );
}

export default SeeMoreText;
