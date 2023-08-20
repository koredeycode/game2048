import React from "react";
import "./Tile.css"; // You can create this CSS file for styling

const valueToWordAndColor = {
  0: { word: "Empty", color: "#f87666" },
  2: { word: "Quasar", color: "#8c7051" },
  4: { word: "Nebula", color: "#7b3e19" },
  8: { word: "Galaxy", color: "#1d1e2c" },
  16: { word: "Star", color: "#582b11" },
  32: { word: "Planet", color: "#03012c" },
  64: { word: "Solar", color: "#222e50" },
  128: { word: "Comet", color: "#995d81" },
  256: { word: "Asteroid", color: "#8c5383" },
  512: { word: "Meteor", color: "#590004" },
  1024: { word: "Orbit", color: "#6689a1" },
  2048: { word: "Black Hole", color: "#51a3a3" },
  4096: { word: "Supernova", color: "#5b9279" },
  8192: { word: "Cosmic", color: "#23ce6b" },
  16384: { word: "Eternity", color: "#177e89" },
};

const Tile = ({ value }) => {
  const { word, color } = valueToWordAndColor[value];
  return (
    <div className={`tile`} style={{ backgroundColor: color }}>
      <span>{value ? value : ""}</span>
      <span className="tile-word">{value ? word : ""}</span>
    </div>
  );
};

export default Tile;
