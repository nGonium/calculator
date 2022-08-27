let value1;
let operator;
let value2;

const isNumber = (num) => typeof num === 'number' && !Number.isNaN(num);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
function operate(operator, a, b) {
    console.log(operator, a, b);
    switch (operator) {
        case '+':
            return add(a, b)
            break;
        case '-':
            return subtract(a, b)
            break;    
        case '*':
            return multiply(a, b)
            break;
        case '/':
            return divide(a, b)
            break;          
        default:
            break;

    }
}

function initEventListeners() {
    const numbers = document.querySelectorAll('button[data-btn="number"]');
    const operators = document.querySelectorAll('button[data-btn="operator"]');
    const specials = {
        equals: document.querySelector('button[data-btn="equals"]'),    
        clear: document.querySelector('button[data-btn="clear"]'),    
    };
    const displayMain = document.querySelector('#display-main');
    const displayPrev = document.querySelector('#display-prev');

    
    // Numbers
    for(let num of numbers) {
        num.addEventListener('click', e => {
            // TODO: add protection against . and e
            displayMain.textContent += num.value;
        })
    }

    // Normal operators
    for(let op of operators) {
        op.addEventListener('click', e => {
            if(!isNumber(value1)) {
                value1 = Number(displayMain.textContent);
                operator = op.value;
                displayPrev.textContent = `${value1} ${operator}`;
            } else {
                value2 = Number(displayMain.textContent);
                value1 = operate(operator, value1, value2);
                operator = op.value;
                displayPrev.textContent = `${value1} ${operator}`
            }
            displayMain.textContent = '';
        })
    }

    // Special buttons
    specials.equals.addEventListener('click', e => {
        if(isNumber(value1) && operator) {
            value2 = Number(displayMain.textContent);
            displayPrev.textContent += ` ${value2} =`
            displayMain.textContent = operate(operator, value1, value2);
            value1 = undefined;
        }
    })
} 

addEventListener('DOMContentLoaded', (e) => {
    initEventListeners();
})