/**
 * Module Pattern Object - Basically Singleton
 * There is always one instance of calculator within the app.
 */
const calculator = (function () {
  let total = 0;
  let firstNum = 0;
  let secondNum;
  let currOperator;

  const add = (num1, num2) => num1 + num2;
  const sub = (num1, num2) => num1 - num2;
  const multiply = (num1, num2) => num1 * num2;
  const divide = (num1, num2) => {
    if (num2 == 0) {
      throw new Error("Cannot divide by 0");
    }
    return num1 / num2;
  };
  //all operator return result after two numebrs

  const operate = (operator) => {
    currOperator = operator;
    console.log("Current operator " + currOperator);
    console.log("1st num " + firstNum);
    console.log("2nd nUm " + secondNum);

    if (checkNumInit()) {
      return;
    }

    switch (operator) {
      case "add":
        const result = add(firstNum, secondNum);
        total = result;
        firstNum = total;
        secondNum = undefined;
        break;

      case "sub":
        total = sub(firstNum, secondNum);
        firstNum = total;
        console.log("sub rsutl " + total);
        secondNum = undefined;
        break;

      case "multiply":
        total = multiply(firstNum, secondNum);
        firstNum = total;
        console.log("multiply result - " + total);
        secondNum = undefined;
        break;

      case "divide":
        try {
          total = divide(firstNum, secondNum);
          firstNum = total;
          secondNum = undefined;
        } catch (error) {
          console.log("error caught");
          firstNum = 0;
          total = "Cannot divide by zero";
        }
        break;

      default:
        return;
    }
  };

  const setCurrOperator = (operator) => (currOperator = operator);
  const setFirstNum = (val) => (firstNum = val);
  const setSecondNum = (val) => (secondNum = val);
  const getFirstNum = () => firstNum;
  const getSecondNum = () => secondNum;
  const getOperator = () => currOperator;
  const setOperator = (operator) => (currOperator = operator);
  const getPrevOperator = () => prevOperator;
  const checkNumInit = () => {
    if (firstNum === undefined || secondNum === undefined) {
      return true;
    }
    return false;
  };

  const getTotal = () => total;
  const reset = () => {
    total = 0;
    firstNum = 0;
    secondNum = undefined;
  };

  const countDecimal = () => {
    const numAsStr = String(total);
    if (numAsStr.indexOf(".") != -1) {
      const substr = numAsStr.substring(numAsStr + 1);
      return substr.length;
    } else {
      return 0;
    }
  };

  const cleanUpDeciaml = () => {
    if (countDecimal() > 0) {
      total = total.toFixed(2);
    }
  };
  return {
    operate,
    getTotal,
    reset,
    setFirstNum,
    setSecondNum,
    getFirstNum,
    getSecondNum,
    getOperator,
    getPrevOperator,
    setOperator,
  };
})();

export default calculator;
