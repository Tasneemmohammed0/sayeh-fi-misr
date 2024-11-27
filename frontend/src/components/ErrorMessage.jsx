import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error, fontSize = "14px", variant = "default" }) => {
  if (!error) return null;

  // Variant-based styles
  const variants = {
    default: {
      backgroundColor: "#EF4444", // Red color
      color: "#FFFFFF", // White text
    },
    subtle: {
      backgroundColor: "#FEE2E2", // Light red background
      border: "1px solid #FCA5A5", // Soft red border
      color: "#B91C1C", // Dark red text
    },
    outlined: {
      backgroundColor: "#FEF2F2", // Very light red
      border: "2px solid #EF4444", // Bright red border
      color: "#B91C1C", // Dark red text
    },
  };

  // Animation keyframes
  const animationStyles = {
    animation: "fadeIn 0.2s ease-in-out",
  };

  // Inline styles for the wrapper
  const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "6px",
    padding: "8px",
    marginTop: "4px",
    marginBottom: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    ...variants[variant], // Apply variant-specific styles
    ...animationStyles, // Add animation styles
  };

  // Add animation keyframes dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  return (
    <div style={wrapperStyle}>
      <AlertCircle style={{ width: "16px", height: "16px" }} />
      <p style={{ fontSize, margin: 0, color:"white" }}>{error}</p>
    </div>
  );
};

export default ErrorMessage;
