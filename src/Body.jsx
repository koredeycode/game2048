//import { useState } from "react";
import "./Body.css";

function Body(props) {
  const buttons = [
    "C",
    "Del",
    "%",
    "÷",
    7,
    8,
    9,
    "×",
    4,
    5,
    6,
    "+",
    1,
    2,
    3,
    "-",
    0,
    ".",
    "=",
  ];
  const colors = {};
  buttons.forEach((button) => {
    colors[button] = "primary";
  });
  colors["C"] = "danger";
  colors["Del"] = "warning";
  colors["="] = "success";

  return (
    <div className="bg-dark p-2">
      <div className="row">
        {buttons.map((button) => {
          return (
            <div key={button} className={button === 0 ? "col-6" : "col-3"}>
              <button
                className={`btn btn-${colors[button]} w-100 mt-1`}
                onClick={() => props.onButtonClick(String(button))}
              >
                {button}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Body;
