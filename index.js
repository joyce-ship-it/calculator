const display = document.querySelector('.display');
display.textContent = "0";
const clear = document.querySelector('.clear');
let fullStr = "";

function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2
}
function divide(num1, num2) {
    if (num2 === 0) {
        alert("ZERO ERROR !!!!");
        allClear();
        return;
    }
    let res = num1 / num2;
    return Math.round(res * 100) / 100;
}
function modulo(num1, num2) {
    return num1 % num2;
}

let num1;
let num2;
let operator = [];

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        case 'x':
            return multiply(num1, num2);
            break;
        case '%':
            return modulo(num1, num2);
            break;
    }
}

let displayValue;


function isOperator(str) {
    if (str === '+' || str === '-' || str === 'x' || str === '/' || str === '%') {
        return true;
    }
}

function allClear() {
    display.textContent = "0";
    num1 = undefined;
    num2 = undefined;
    fullStr = "";
    console.log("All clear pressed", num1, num2, fullStr, display.textContent)
}

function deleteLastNum(str) {
    return str.slice(0, -1);
}

const keyContainer = document.querySelector('.key-container');
keyContainer.addEventListener('click', (e) => {
    let target = e.target;

    if (target.classList.contains('clear')) {
        allClear();
    }
    if (target.classList.contains('delete')) {
        display.textContent = deleteLastNum(display.textContent);
    }

    if (target.classList.contains('num')) {
        if (display.textContent === '0' && target.textContent === '0') {
            display.textContent = '0';
        }
        else {
            if (display.textContent !== '0' && (!isOperator(fullStr.slice(-1)))) {
                fullStr += target.textContent;
                display.textContent += target.textContent;
                displayValue = display.textContent;
            }
            else if (display.textContent === '0' || (isOperator(fullStr.slice(-1)))) {
                fullStr += target.textContent;
                display.textContent = "";
                display.textContent += target.textContent;
                displayValue = display.textContent;

            }
        }
    }

    if (target.classList.contains('dot')) {
        fullStr += target.textContent;
        if (display.textContent.split('').includes('.')) {
            target.disabled = true;
        }
        else {
            display.textContent += target.textContent;
        }
    }

    if (target.classList.contains('operator')) {
        fullStr += target.textContent;
        operator.push(target.textContent);
        if (num1 === undefined) {
            num1 = +(display.textContent);
            console.log(num1)
        }
        else if (num2 === undefined) {
            num2 = +(display.textContent);
            console.log(num2);
        }
        if (num1 && num2) {
            console.log(operator[0])
            num1 = operate(num1, num2, operator[0]);
            num2 = undefined;
            display.textContent = num1;
            displayValue = display.textContent;
            operator.shift();
            console.log(num1, num2, operator[0]);
        }
    }

    if (target.classList.contains('result')) {
        if (num1 !== undefined && (operator.length !== 0)) {
            num2 = +(display.textContent);
            num1 = operate(num1, num2, operator[0]);
            display.textContent = num1;
            num1 = undefined;
            num2 = undefined;
            displayValue = display.textContent;
            operator.shift();
            console.log(num1, num2, operator[0])
        }
    }

})