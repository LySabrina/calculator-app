// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"i6fW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Module Pattern Object - Basically Singleton
 * There is always one instance of calculator within the app.
 */
var calculator = function () {
  var total = 0;
  var firstNum = 0;
  var secondNum;
  var currOperator;
  var add = function add(num1, num2) {
    return num1 + num2;
  };
  var sub = function sub(num1, num2) {
    return num1 - num2;
  };
  var multiply = function multiply(num1, num2) {
    return num1 * num2;
  };
  var divide = function divide(num1, num2) {
    if (num2 == 0) {
      throw new Error("Cannot divide by 0");
    }
    return num1 / num2;
  };
  //all operator return result after two numebrs

  var operate = function operate(operator) {
    currOperator = operator;
    console.log("Current operator " + currOperator);
    console.log("1st num " + firstNum);
    console.log("2nd nUm " + secondNum);
    if (checkNumInit()) {
      return;
    }
    switch (operator) {
      case "add":
        var result = add(firstNum, secondNum);
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
  var setCurrOperator = function setCurrOperator(operator) {
    return currOperator = operator;
  };
  var setFirstNum = function setFirstNum(val) {
    return firstNum = val;
  };
  var setSecondNum = function setSecondNum(val) {
    return secondNum = val;
  };
  var getFirstNum = function getFirstNum() {
    return firstNum;
  };
  var getSecondNum = function getSecondNum() {
    return secondNum;
  };
  var getOperator = function getOperator() {
    return currOperator;
  };
  var setOperator = function setOperator(operator) {
    return currOperator = operator;
  };
  var getPrevOperator = function getPrevOperator() {
    return prevOperator;
  };
  var checkNumInit = function checkNumInit() {
    if (firstNum === undefined || secondNum === undefined) {
      return true;
    }
    return false;
  };
  var getTotal = function getTotal() {
    return total;
  };
  var reset = function reset() {
    total = 0;
    firstNum = 0;
    secondNum = undefined;
  };
  var countDecimal = function countDecimal() {
    var numAsStr = String(total);
    if (numAsStr.indexOf(".") != -1) {
      var substr = numAsStr.substring(numAsStr + 1);
      return substr.length;
    } else {
      return 0;
    }
  };
  var cleanUpDeciaml = function cleanUpDeciaml() {
    if (countDecimal() > 0) {
      total = total.toFixed(2);
    }
  };
  return {
    operate: operate,
    getTotal: getTotal,
    reset: reset,
    setFirstNum: setFirstNum,
    setSecondNum: setSecondNum,
    getFirstNum: getFirstNum,
    getSecondNum: getSecondNum,
    getOperator: getOperator,
    getPrevOperator: getPrevOperator,
    setOperator: setOperator
  };
}();
var _default = exports.default = calculator;
},{}],"TDlx":[function(require,module,exports) {
module.exports = "button-click.1b2c26dd.wav";
},{}],"fRP6":[function(require,module,exports) {
"use strict";

var _calculator = _interopRequireDefault(require("./calculator.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var display = document.querySelector(".calculator__display");
display.textContent = _calculator.default.getFirstNum();
var calInputs = document.querySelector(".calculator__inputs");
var equal = document.getElementById("equal");
var themeSwitches = document.querySelectorAll(".theme-switcher__btns > input");
var sound = require("../../assets/audio/button-click.wav");
var soundEffect = new Audio(sound);
var inputNum = ""; //Number inputed when user clicks on num buttons

var themeSelector = document.querySelector(".theme-switcher__btns");
themeSelector.onclick = function (e) {
  if (e.target.tagName === "INPUT") {
    var themeVal = e.target.value;
    var classTemplate = "".concat(themeVal, "-theme");
    var body = document.body;
    body.className = classTemplate;
  }
};
calInputs.addEventListener("click", function (e) {
  if (e.target.tagName == "BUTTON") {
    soundEffect.play();
  }
});

/**
 * Handling the number btns and operator onclick event
 * Will update firstNum and secondNum inside calculator
 */
calInputs.addEventListener("click", function (e) {
  var btn = e.target;
  var regex = /[0-9\.]/;
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
  var value = btn.value;
  if (value === ".") {
    if (inputNum.indexOf(".") === -1) {
      inputNum += btn.value;
    }
  } else {
    inputNum += btn.value;
  }
  display.textContent = inputNum;
  var num = Number(display.textContent);
  if (_calculator.default.getOperator() === undefined || _calculator.default.getOperator() === "equal") {
    //using old value of input result
    _calculator.default.setFirstNum(num);
  } else {
    _calculator.default.setSecondNum(num);
  }
  console.log("index 1st num ", _calculator.default.getFirstNum());
  console.log("index 2nd num ", _calculator.default.getSecondNum());
}

/**
 * Handles btn elements that has operators values & non-numbers
 * @param {HTMLButtonElement} btn
 */
function handleOperators(btn) {
  var value = btn.value;
  switch (value) {
    case "equal":
      if (_calculator.default.getFirstNum() !== undefined || _calculator.default.getSecondNum() !== undefined) {
        console.log("operationsss", _calculator.default.getOperator());

        //Now that we have both firstNum and secondNum defined with values, we call the calculator operation
        _calculator.default.operate(_calculator.default.getOperator());
        var result = _calculator.default.getTotal();
        console.log("total - " + result);
        display.textContent = result;
        //delete?
        _calculator.default.setOperator("equal"); //we set our operator of calculator to equal now because, a user can proceed to start a brand new calculation or continue from their previous result
        console.log("inputNum" + inputNum);
        inputNum = "";
        //inputNum is being added to and stil lholds the other value
      }
      break;
    case "delete":
      inputNum = inputNum.substring(0, inputNum.length - 1);
      if (inputNum === "") {
        inputNum = "0";
      }
      display.textContent = inputNum;
      var num = Number(display.textContent);
      if (_calculator.default.getOperator() === undefined || _calculator.default.getOperator() == "equal") {
        //using old value of input result
        _calculator.default.setFirstNum(num);
      } else {
        _calculator.default.setSecondNum(num);
      }
      break;
    case "reset":
      inputNum = "";
      display.textContent = "0";
      _calculator.default.setFirstNum(0);
      _calculator.default.setSecondNum(undefined);
      _calculator.default.setOperator(undefined);
      break;
    default:
      inputNum = "";
      if (_calculator.default.getOperator() != undefined) {
        _calculator.default.operate(_calculator.default.getOperator());
        var currentTotal = _calculator.default.getFirstNum(); //why firstNum instead of total? Because inside calculator, the firstNum will equal to the newly operation total. Total variable may still ho
        display.textContent = currentTotal;
      }
      var operator = value;
      _calculator.default.setOperator(operator);
      // const operator = value;
      // calculator.operate(operator);

      // if (calculator.getOperator() != undefined) {
      //   const currentTotal = calculator.getFirstNum(); //why firstNum instead of total? Because inside calculator, the firstNum will equal to the newly operation total. Total variable may still ho
      //   display.textContent = currentTotal;
      // }

      break;
  }
}
var _iterator = _createForOfIteratorHelper(themeSwitches),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var switchBtn = _step.value;
    switchBtn.onclick = function (e) {
      var activeTheme = document.querySelector(".theme-switcher__btns > input:checked");
      console.log('prev checked', activeTheme);
      activeTheme.checked = false;
      var target = e.target;
      console.log(target);
      target.checked = true;
    };
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
},{"./calculator.js":"i6fW","../../assets/audio/button-click.wav":"TDlx"}]},{},["fRP6"], null)
//# sourceMappingURL=js.af1bb349.js.map