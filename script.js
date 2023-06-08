const add = function (num1, num2) {
    if (num1 + num2 === Infinity) {
        error = true;
    }
    return num1 + num2;
};
const subtract = function (num1, num2) {
    return num1 - num2;
};
const divide = function (num1, num2) {
    if (num2) {
        return num1 / num2;
    }
    error = true;
    return "ERROR"

};
const multiply = function (num1, num2) {
    if (num1 * num2 === Infinity) {
        error = true;
    }
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
const operatorButtons = document.querySelectorAll('.operator');
const deleteButton = document.getElementById('delete-btn')
let opClicked = false;
let opClearDisplay = false;
let operandValue = 0;
let operatorUsed = undefined;
let error = false;
buttons.forEach((button) => button.addEventListener('click', () => {
    const buttonContent = button.innerText;
    let displayContent = display.innerText;

    if (buttonContent === 'CLEAR' || error) {
        opClicked = false;
        opClearDisplay = false;
        operandValue = 0;
        operatorUsed = undefined;
    }

    if (buttonContent === 'CLEAR') {
        displayContent = 0
        error = false;
    }

    if (isOperator(buttonContent) && !error) {
        if (opClicked && !opClearDisplay) {
            displayContent = (operate(operandValue, parseFloat(displayContent), operatorUsed))
            opClicked = false;
        }
        else if (opClicked && buttonContent === '=') {
            displayContent = (operate(operandValue, operandValue, operatorUsed))
            opClicked = false;
        }
        if (buttonContent !== '=') {
            opClicked = true;
            opClearDisplay = true;
            operandValue = parseFloat(displayContent)
            operatorUsed = buttonContent;
        }

    }
    else if (displayContent === "0" || opClearDisplay || error) {
        if (isNumber(buttonContent)) {
            displayContent = buttonContent;
            opClearDisplay = false;
            error = false;
        }
        else if (buttonContent == ".") {
            displayContent = "0."
            opClearDisplay = false;
            error = false;
        }

    }
    else {
        if (isNumber(buttonContent)) {
            displayContent += buttonContent;
        }
        else if (buttonContent === ".") {
            displayContent.includes('.') ? displayContent : displayContent += buttonContent
        }
        else if (buttonContent === 'DELETE') {
            displayContent = displayContent.slice(0, -1);
            if (displayContent === '') {
                displayContent = 0;
            }
        }
    }
    operatorButtons.forEach((btn) => {
        btn.disabled = error;
    })
    deleteButton.disabled = error;
    display.innerText = displayContent
}))
