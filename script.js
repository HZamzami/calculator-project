const add = function (num1, num2) {
    return num1 + num2;
};
const subtract = function (num1, num2) {
    return num1 - num2;
};
const divide = function (num1, num2) {
    if (num2) {
        return num1 / num2;
    }
    return "ERROR"
};
const multiply = function (num1, num2) {
    return num1 * num2;
};

const operate = function (num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2)
        default:
            return "WHOT"
    }
}

const isNumber = function (value) {
    return /\d/.test(value)
}

const isOperator = function (value) {
    return /[-*+\/=]/.test(value)
}

const buttons = document.querySelectorAll('.row button');
const display = document.getElementById('display')
const operatorButtons = document.getElementsByClassName('operator');
let opClicked = false;
let opClearDisplay = false;
let operandValue = 0;
let operatorUsed = undefined;
let error = false;
buttons.forEach((button) => button.addEventListener('click', () => {
    const buttonContent = button.innerText;
    let displayContent = display.innerText;

    if (buttonContent === 'CLEAR' || displayContent === 'ERROR') {
        opClicked = false;
        opClearDisplay = false;
        operandValue = 0;
        operatorUsed = undefined;
    }
    if (displayContent === 'ERROR') {
        error = true;
    }
    if (buttonContent === 'CLEAR') {
        displayContent = 0
        error = false;
    }

    if (isOperator(buttonContent)) {
        if (opClicked && !opClearDisplay) {
            displayContent = (operate(operandValue, parseFloat(displayContent), operatorUsed))
        }
        else if (opClicked) {
            displayContent = (operate(operandValue, operandValue, operatorUsed))
        }
        opClicked = true;
        opClearDisplay = true;
        operandValue = parseFloat(displayContent)
        operatorUsed = buttonContent;
    }
    else if (displayContent === "0" || opClearDisplay || error) {
        if (isNumber(buttonContent)) {
            displayContent = buttonContent;
        }
        else if (buttonContent == ".") {
            displayContent = "0."
        }
        opClearDisplay = false;
        error = false;
    }
    else {
        if (isNumber(buttonContent)) {
            displayContent += buttonContent;
        }
        else if (buttonContent === ".") {
            displayContent.includes('.') ? displayContent : displayContent += buttonContent
        }
    }
    // operatorButtons.forEach((btn) => {
    //     btn.disabled = true;
    // })
    display.innerText = displayContent
}))

let num1 = 5;
let num2 = 10;
let operator = "/";

console.log(operate(num1, num2, operator))
