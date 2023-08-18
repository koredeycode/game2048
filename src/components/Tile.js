import React from "react";
import "./Tile.css"; // You can create this CSS file for styling

const valueToWordAndColor = {
  0: { word: "Empty", color: "#ffffff" },
  2: { word: "Quasar", color: "#003366" },
  4: { word: "Nebula", color: "#663399" },
  8: { word: "Galaxy", color: "#006400" },
  16: { word: "Star", color: "#008080" },
  32: { word: "Planet", color: "#800000" },
  64: { word: "Solar", color: "#2F4F4F" },
  128: { word: "Comet", color: "#556B2F" },
  256: { word: "Asteroid", color: "#9932CC" },
  512: { word: "Meteor", color: "#191970" },
  1024: { word: "Orbit", color: "#A0522D" },
  2048: { word: "Black Hole", color: "#800080" },
  4096: { word: "Supernova", color: "#C71585" },
  8192: { word: "Cosmic", color: "#282c34" }, // Dark cosmic background
  16384: { word: "Eternity", color: "#1d1f21" }, // Even darker cosmic background
};

const Tile = ({ value }) => {
  const { word, color } = valueToWordAndColor[value];
  return (
    <div className={`tile`} style={{ backgroundColor: color }}>
      <span>{value}</span>
      <span className="tile-word">{word}</span>
    </div>
  );
};

export default Tile;
