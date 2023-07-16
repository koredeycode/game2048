//import { useState } from "react";

function Screen(props) {
  return (
    <div className="bg-light p-2">
      <h2 className="text-right" style={{ textAlign: "right" }}>
        {props.displayValue}
      </h2>
    </div>
  );
}

export default Screen;
