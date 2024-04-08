import calculator from "./calculator.mjs";

const CalculatorView = (function () {
  const displayTotal = () => {
    calculator.getTotal();
  };

  const updateDisplay = (val)=>{
    
  }


  return {displayTotal}
})();

export default CalculatorView;