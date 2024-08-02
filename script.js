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
        this.updateDisplay()
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
        if (this.mainDisplayText == '0' || this.operatorClicked) {
            this.mainDisplayText = number;
            if (number == ".") {
                this.mainDisplayText = "0."
            }
        }
        else {
            this.mainDisplayText = `${this.mainDisplayText}${number}`
        }
        this.operatorClicked = false;
        this.updateDisplay();
    }

    chooseOperation(opText) {
        if (this.chosenOperation != null) {
            this.compute();
        }
        this.opDisplayText = `${this.mainDisplayText} ${opText}`
        this.chosenOperation = opText;
        this.operatorClicked = true;
        this.updateDisplay();
    }

    compute() {
        if (this.chosenOperation != null) {
            const firstOperand = Number(this.opDisplayText.slice(0, -1));
            const secondOperand = Number(this.mainDisplayText);
            const result = operate(operatorMap[this.chosenOperation], firstOperand, secondOperand)
            this.opDisplayText = `${this.opDisplayText} ${secondOperand} =`;
            this.mainDisplayText = `${result}`;
            this.operatorClicked = true;
            this.chosenOperation = null;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.opDisplay.textContent = this.opDisplayText;
        this.mainDisplay.textContent = this.mainDisplayText;
    }

    
}

const operatorMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
}

const calculator = new Calculator(opDisplay, mainDisplay);

numberButtons.forEach((numButton) => {
    numButton.addEventListener('click', () => {

        numText = numButton.textContent;
        calculator.appendNumber(numText);
    })
})

operationButtons.forEach((opButton) => {
    opButton.addEventListener('click', () => {
        opText = opButton.textContent;
        calculator.chooseOperation(opText);
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear()
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
})