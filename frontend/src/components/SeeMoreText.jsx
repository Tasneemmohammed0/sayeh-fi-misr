import { useState } from "react";

function SeeMoreText({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <p
        style={{
          maxHeight: isExpanded ? "none" : "50px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          marginBottom: "0px",
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
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "See Less" : "See More"}
      </p>
    </div>
  );
}

export default SeeMoreText;
