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
    const expression = this.result.value;
    const result = this.evaluateExpression(expression);
    this.result.value = result !== null ? result : "Error";
  }

  // updates display when value changes or is typed
  updateDisplay(num) {
    this.result.value += num;
  }

  // helps format the numbers with commas
  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Helper function to check if a character is an operator
  isOperator(char) {
    return char === "+" || char === "-" || char === "*" || char === "/";
  }

  // Helper function to perform arithmetic operations
  operate(operator, num1, num2) {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return null; // Invalid operator
    }
  }

  // Function to evaluate a mathematical expression
  evaluateExpression(expression) {
    const numbers = [];
    const operators = [];

    let num = "";
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === ".") {
        // Character is a number
        num += char;
      } else if (this.isOperator(char)) {
        // Character is an operator
        const number = parseFloat(num);
        if (!isNaN(number)) {
          numbers.push(number);
          num = "";
        }

        while (
          operators.length > 0 &&
          this.isOperator(operators[operators.length - 1])
        ) {
          const prevOperator = operators.pop();
          const num2 = numbers.pop();
          const num1 = numbers.pop();
          const result = this.operate(prevOperator, num1, num2);
          if (result === null) return null; // Invalid operator
          numbers.push(result);
        }
        operators.push(char);
      }
    }

    const number = parseFloat(num);
    if (!isNaN(number)) {
      numbers.push(number);
    }

    while (operators.length > 0) {
      const operator = operators.pop();
      const num2 = numbers.pop();
      const num1 = numbers.pop();
      const result = this.operate(operator, num1, num2);
      if (result === null) return null; // Invalid operator
      numbers.push(result);
    }

    if (numbers.length === 1) {
      return numbers[0];
    } else {
      return null; // Invalid expression
    }
  }
}

// Creating a new Calculator Class
const calculator = new Calc(result, btn);

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
