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

const operate = function(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2)
        default:
            return "ERROR"
    }
}

let num1 = 5;
let num2 = 10;
let operator = "/";

console.log(operate(num1, num2, operator))
