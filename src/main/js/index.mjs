import calculator from "./calculator.mjs";

const display = document.querySelector(".calculator__display");
display.textContent = calculator.getFirstNum();
const calInputs = document.querySelector(".calculator__inputs");
const equal = document.getElementById("equal");

const btns = document.querySelectorAll(".calculaltor__inputs--btns");

let inputNum = ""; //Number inputed when user clicks on num buttons

const themeSelector = document.getElementById("theme-selector");

themeSelector.onclick = (e) => {
  const themeVal = e.target.value;
  const classTemplate = `${themeVal}-theme`;
  const body = document.body;
  body.className = classTemplate;
};

/**
 * Handling the number btns and operator onclick event
 * Will update firstNum and secondNum inside calculator
 */
calInputs.addEventListener("click", (e) => {
  const btn = e.target;
  const regex = /[0-9\.]/;
  if (btn === calInputs) {
    console.log("clicked on parent");
    return;
  }
  if (regex.test(btn.value)) {
    handleNumInputs(btn);
  } else {
    handleOperators(btn);
  }
});

/**
 * Handles a button click by getting the value and appending that value into inputNum variable
 * Afterwards, proceed to update calculator firstNum or secondNum
 * @param {HTMLButtonElement} btn
 */
function handleNumInputs(btn) {
  inputNum += btn.value;
  display.textContent = inputNum;
  const num = Number(display.textContent);

  if (
    calculator.getOperator() === undefined ||
    calculator.getOperator() === "equal"
  ) {
    //using old value of input result
    calculator.setFirstNum(num);
  } else {
    calculator.setSecondNum(num);
  }

  console.log("index 1st num ", calculator.getFirstNum());
  console.log("index 2nd num ", calculator.getSecondNum());
}

/**
 * Handles btn elements that has operators values & non-numbers
 * @param {HTMLButtonElement} btn
 */
function handleOperators(btn) {
  const value = btn.value;
  switch (value) {
    case "equal":
      if (
        calculator.getFirstNum() !== undefined ||
        calculator.getSecondNum() !== undefined
      ) {
        console.log("operationsss", calculator.getOperator());

        //Now that we have both firstNum and secondNum defined with values, we call the calculator operation
        calculator.operate(calculator.getOperator());
        const result = calculator.getTotal();
        console.log("total - " + result);
        display.textContent = result;
        //delete?
        calculator.setOperator("equal"); //we set our operator of calculator to equal now because, a user can proceed to start a brand new calculation or continue from their previous result
        console.log("inputNum" + inputNum);
        inputNum = "";
        //inputNum is being added to and stil lholds the other value
      }
      break;
    case "delete":
      inputNum = inputNum.substring(0, inputNum.length - 1);
      display.textContent = inputNum;
      const num = Number(display.textContent);

      if (
        calculator.getOperator() === undefined ||
        calculator.getOperator() == "equal"
      ) {
        //using old value of input result
        calculator.setFirstNum(num);
      } else {
        calculator.setSecondNum(num);
      }
      break;
    case "reset":
      inputNum = "";
      display.textContent = "0";
      calculator.setFirstNum(0);
      calculator.setSecondNum(undefined);
      calculator.setOperator(undefined);
      break;

    default:
      inputNum = "";
      const operator = value;
      calculator.operate(operator);
      if (calculator.getOperator() != undefined) {
        const currentTotal = calculator.getFirstNum(); //why firstNum instead of total? Because inside calculator, the firstNum will equal to the newly operation total. Total variable may still ho
        display.textContent = currentTotal;
      }

      break;
  }
}

function handleDecimal() {}
