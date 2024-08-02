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
    return a / b;
}
function operate(operator, a, b) {
    return operator(a, b);
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const mainDisplay = document.querySelector('[data-display-main]');
const opDisplay = document.querySelector('[data-display-op]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');


class Calculator {
    constructor(opDisplayElement, mainDisplayElement) {
        this.opDisplay = opDisplayElement;
        this.mainDisplay = mainDisplayElement;
        this.opDisplayText = opDisplayElement.textContent;
        this.mainDisplayText = mainDisplay.textContent;
    }

    clear() {
        this.mainDisplayText = '0';
        this.opDisplayText = '';
        this.chosenOperation = null;
        this.operatorClicked = false;
    }


    delete() {
        this.mainDisplayText = this.mainDisplayText.slice(0, -1);
        if (this.mainDisplayText == "") {
            this.mainDisplayText = "0"
        }
        this.updateDisplay()
    }

    appendNumber(number) {
        if (this.mainDisplayText.includes(".") && number == ".") {
            return;
        }
        if (this.mainDisplayText == '0' || this.chosenOperation != null) {
            this.mainDisplayText = number;
            operatorClicked = false;
            if (numButton.textContent == ".") {
                mainDisplay.textContent = "0."
            }
        }
        else {
            mainDisplay.textContent = `${displayText}${numText}`
        }
    }

    chooseOperation(opText) {
        this.opDisplayText = `${this.mainDisplayText} ${opText}`
        this.chosenOperation = opText;
        this.operatorClicked = true;
        this.updateDisplay;
    }

    compute() {
        if (this.chosenOperation != null) {
            const firstOperand = Number(this.opDisplayText.slice(0, -1));
            const secondOperand = Number(this.mainDisplayText);
            const result = operate(operatorMap[this.chosenOperation], firstOperand, secondOperand)
            this.opDisplayText = `${this.opDisplayText} ${secondOperand} =`;
            this.mainDisplayText = result;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.opDisplay.textContent = this.opDisplayText;
        this.mainDisplay.textContent = this.opDisplayText;
    }

    
}
let chosenOperator = null;
let operatorClicked = false;
const operatorMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
}

const calculator = new Calculator(opDisplay, mainDisplay);

numberButtons.forEach((numButton) => {
    numButton.addEventListener('click', () => {
        displayText = mainDisplay.textContent;
        numText = numButton.textContent;
        if (displayText.includes(".") && numButton.textContent == ".") {
            return;
        }
        if (displayText == '0' || operatorClicked) {
            mainDisplay.textContent = numText;
            operatorClicked = false;
            if (numButton.textContent == ".") {
                mainDisplay.textContent = "0."
            }
        }
        else {
            mainDisplay.textContent = `${displayText}${numText}`
        }

    })
})

operationButtons.forEach((opButton) => {
    opButton.addEventListener('click', () => {
        opText = opButton.textContent;
        opDisplay.textContent = `${mainDisplay.textContent} ${opText}`
        chosenOperator = opText;
        operatorClicked = true;
    })
})

clearButton.addEventListener('click', () => {
    mainDisplay.textContent = '0'
    opDisplay.textContent = ''
})

equalsButton.addEventListener('click', () => {
    if (chosenOperator != null) {
        const firstOperand = Number(opDisplay.textContent.slice(0, -1));
        const secondOperand = Number(mainDisplay.textContent);
        console.log(operate(operatorMap[chosenOperator], firstOperand, secondOperand))
    }
})

deleteButton.addEventListener('click', () => {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    if (mainDisplay.textContent == "") {
        mainDisplay.textContent = "0"
    }
})