// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Screen from "./Screen";
import Body from "./Body";

let stack = ["0"];

function App() {
  const [displayValue, setDisplayValue] = useState("0");

  const actionBtns = ["C", "Del", "="];
  const operators = ["%", "÷", "×", "+", "-"];

  function computer(arr) {
    const a = Number(arr[0]);
    const b = Number(arr[2]);
    const operator = arr[1];
    console.log(a, b, operator);
    if (operator === "+") {
      return a + b;
    } else if (operator === "-") {
      return a - b;
    } else if (operator === "%") {
      return b === 0 ? 0 : a % b;
    } else if (operator === "÷") {
      return b === 0 ? 0 : a / b;
    } else if (operator === "×") {
      return a * b;
    }
  }

  const handleButtonClick = (value) => {
    console.log(value);

    if (actionBtns.includes(value)) {
      if (value === "C") {
        stack = ["0"];
      } else if (value === "Del") {
        //delete the last character
        let lastElem = stack.pop();
        if (operators.includes(lastElem) || lastElem === "0") {
          //do nothing
        } else if (lastElem.length > 1) {
          //delete the last char and set the rest
          lastElem = lastElem.slice(0, lastElem.length - 1);
          stack.push(lastElem);
        } else {
          stack.push("0");
        }
      } else {
        //compute the stuffs
        if (stack.length === 3) {
          const res = computer(stack);
          stack = [res];
        }
      }
    } else if (operators.includes(value)) {
      if (stack.length === 1) {
        stack.push(value);
      } else if (stack.length === 2) {
        stack.pop();
        stack.push(value);
      } else {
        const res = computer(stack);
        stack = [res, value];
      }
    } else {
      //add the number to the last figure or replace if 0
      let lastElem = stack.pop();
      if (operators.includes(lastElem)) {
        stack.push(lastElem);
        stack.push(value);
      } else {
        if (lastElem === "0") {
          stack.push(value);
        } else {
          stack.push(lastElem + value);
        }
      }
    }
    console.log(stack);
    if (stack.length === 0) {
      stack = ["0"];
    }
    setDisplayValue(stack.join(""));
  };
  return (
    <div className="vh-100 mx-auto main mt-5">
      <div className="d-flex align-items-center justify-content-center ">
        <div className="calculator-container">
          <h1 className="text-center">Calculator</h1>
          <div className="screen-container">
            <Screen displayValue={displayValue} />
          </div>
          <div className="button-container">
            <Body onButtonClick={handleButtonClick} />
          </div>
        </div>
      </div>
      <div className="text-center">
        <a
          href="https://twitter.com/koredeycode"
          target="_blank"
          rel="noreferrer"
        >
          koredeycode
        </a>
      </div>
    </div>
  );

  // return (
  //   <div className="container gray">
  //     <div className="row">
  //       <div className="col">
  //         <Screen displayValue={displayValue} />
  //       </div>
  //     </div>
  //     <div className="row">
  //       <div className="col">
  //         <Body onButtonClick={handleButtonClick} />
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
