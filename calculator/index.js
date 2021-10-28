let button = document.querySelectorAll("button");
let onSwitch = true;
let numA = "0";
let numB = "0";
let oldNum = "0";
let workingOperator = "";
let oldWorkingOperator = "";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    return "Sorry, we don't do that here.";
  } else {
    return a / b;
  }
}

function multiDigit(workingNum, newNum) {
  if (workingNum == "0") {
    return newNum;
  } else {
    return workingNum + "" + newNum;
  }
}

function display(number) {
  let display = document.querySelector("#display");
  let num = number;
  display.firstChild.nodeValue = num;
}

function numbers(newNum) {
  if (onSwitch == true) {
    // Here we are working on the first part of the calculation. There is no operator yet.
    numA = multiDigit(numA, newNum);
    oldNum = "0";
    display(numA);
  } else {
    numB = multiDigit(numB, newNum);
    display(numB);
  }
}

function operate(firstNum, secondNum, operation) {
  return this[operation](Number(firstNum), Number(secondNum));
}

function mathOperation(operator) {
  if (onSwitch == true) {
    if (oldNum == "0") {
      onSwitch = false;
      workingOperator = operator;
      // Future Work: Highlight button
    } else {
      onSwitch = false;
      workingOperator = operator;
      numA = oldNum;
      // Future Work: Highlight button
    }
  } else {
    numA = operate(numA, numB, workingOperator).toString();
    oldNum = numA;
    numB = "0";
    workingOperator = operator;
    display(numA);
  }
}

function equals() {
  if (onSwitch == true) {
  } else {
    numA = operate(numA, numB, workingOperator).toString();
    oldNum = numA;
    display(numA);
    numA = "0";
    numB = "0";
    workingOperator = "";
    onSwitch = true;
  }
}

function decimal() {
  if (onSwitch == true) {
    // Working with numA
    if (numA.includes(".") == true) {
    } else {
      numA = numA + "" + ".";
      display(numA);
    }
  } else {
    if (numB.includes(".") == true) {
    } else {
      numB = numB + "" + ".";
      display(numB);
    }
  }
}

function isNeg() {
  // Future work, Fix this spaghetti code of doom!
  if (oldNum != "0") {
    numA = oldNum;
    if (onSwitch == true) {
      if (numA != 0) {
        if (numA.includes("-") == true) {
          numA.replace("-", "");
        } else {
          numA = "-" + numA;
        }
      }
      display(numA);
    } else {
      if (numB != 0) {
        if (numB.includes("-") == true) {
          numB.replace("-", "");
        } else {
          numB = "-" + numB;
        }
      }
      display(numB);
    }
  }
}

function operatorSwitchBoard(operator) {
  switch (operator) {
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      mathOperation(operator);
      break;
    case "equals":
      equals();
      break;
    case "clear":
      onSwitch = true;
      numA = "0";
      numB = "0";
      oldNum = "0";
      workingOperator = "";
      oldWorkingOperator = "";
      display(numA);
      break;
    case "decimal":
      decimal();
      break;
    case "positiveNegative":
      isNeg();
      break;
    default:
      console.log("not functional");
  }
}

// Using forEach is like putting a "onClick" function onto every number button.
button.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (event.target.className == "number") {
      // Using Number() to grab the value and make it into... A NUMBER!!!
      console.log(Number(event.target.value));
      numbers(event.target.value);
    } else if (event.target.className == "operation") {
      console.log(event.target.value);
      operatorSwitchBoard(event.target.value);
    }
  });
});

display(numA);
