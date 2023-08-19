import React from "react";
import "./Tile.css"; // You can create this CSS file for styling

const valueToWordAndColor = {
  0: { word: "Empty", color: "rgb(68, 155, 248)" },
  2: { word: "Quasar", color: "rgb(48, 144, 247)" },
  4: { word: "Nebula", color: "rgb(29, 134, 247)" },
  8: { word: "Galaxy", color: "rgb(9, 123, 246)" },
  16: { word: "Star", color: "rgb(8, 113, 226)" },
  32: { word: "Planet", color: "rgb(8, 103, 207)" },
  64: { word: "Solar", color: "rgb(7, 93, 187)" },
  128: { word: "Comet", color: "rgb(6, 84, 167)" },
  256: { word: "Asteroid", color: "rgb(5, 74, 148)" },
  512: { word: "Meteor", color: "rgb(5, 64, 128)" },
  1024: { word: "Orbit", color: "rgb(4, 54, 108)" },
  2048: { word: "Black Hole", color: "rgb(3, 44, 89)" },
  4096: { word: "Supernova", color: "rgb(3, 34, 69)" },
  8192: { word: "Cosmic", color: "rgb(2, 25, 49)" },
  16384: { word: "Eternity", color: "rgb(1, 15, 30)" },
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
