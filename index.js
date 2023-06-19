const btn = document.querySelectorAll("button");
const result = document.getElementById("result");
const resultContainer = document.getElementById("result-container");

class Calc {
  constructor(result, btn) {
    this.result = result;
    this.btn = btn;
    this.clearResult();
  }

  clearResult() {
    this.result.value = "";
  }

  // to delete figures from display
  delete() {
    let currentResult = this.result.value;
    currentResult = currentResult.replace(/\D/g, "");
    currentResult = currentResult.slice(0, -1);
    currentResult = this.formatNumber(currentResult);
    this.result.value = currentResult;
  }

  // append the numbers to the result
  appendNumber(num) {
    if (num === "." && this.result.value.includes(".")) return;

    let currentResult = this.result.value;
    currentResult = currentResult.replace(/,/g, ""); // Remove existing commas
    currentResult += num;
    const formattedResult = this.formatNumber(currentResult);

    this.result.value = formattedResult;
  }

  // handles calculations
  compute() {
    result.value = eval(this.result.value);
  }

  // updates display when value changes or is typed
  updateDisplay(num) {
    result.value += num;
  }

  // helps format the numbers with commas
  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// Creating a new Calculator Class
const calculator = new Calc(result, btn);

// iterate through the buttons to give functions
// iterate through the buttons to give functions
btn.forEach((num) => {
  num.addEventListener("click", () => {
    let numValue = num.textContent;
    if (numValue === "C") {
      calculator.clearResult();
    } else if (numValue === "=") {
      calculator.compute();
    } else if (numValue === "DEL") {
      calculator.delete();
    } else if (numValue === "÷") {
      numValue = "/";
      calculator.updateDisplay(numValue);
    } else {
      if (numValue === "*" || numValue === "%") {
        calculator.updateDisplay(numValue);
      } else {
        calculator.appendNumber(numValue);
      }
    }
  });
});

//Adjust the Font Size to Avoid Overflow
function adjustFontSize() {
  const maxWidth = resultContainer.clientWidth;
  const textWidth = result.scrollWidth;
  const fontSize = Math.floor(
    (maxWidth / textWidth) * parseFloat(getComputedStyle(result).fontSize)
  );

  result.style.fontSize = fontSize + "px";
}

window.addEventListener("resize", adjustFontSize);
result.addEventListener("input", adjustFontSize);

// for (let i = 0; i < buttonsEl.length; i++) {
//   buttonsEl[i].addEventListener("click", () => {
//     const buttonValue = buttonsEl[i].textContent;
//     if (buttonValue === "C") {
//       clearResult();
//     } else if (buttonValue === "=") {
//       calculateResult();
//     } else {
//       appendValue(buttonValue);
//     }
//   });
// }

// function clearResult() {
//   inputFieldEl.value = "";
// }

// function calculateResult() {
//   inputFieldEl.value = eval(inputFieldEl.value);
// }

// function appendValue(buttonValue) {
//   inputFieldEl.value += buttonValue;
//   //   inputFieldEl.value = inputFieldEl.value + buttonValue;
// }
