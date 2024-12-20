import React from "react";
import { ThreeCircles } from "react-loader-spinner";

function Loading({ top = "50%", left = "50%" }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        innerCircleColor="#FF69B4"
        middleCircleColor="#4682B4"
        outerCircleColor="#FFD700"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;
