import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 40, textAlign: "center", backgroundImage: 'url("background-image.jpg")', backgroundSize: "100%", marginTop: "20px",opacity: "0.8" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
