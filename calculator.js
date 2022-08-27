let value1;
let operator;
let value2;

const isNumber = (num) => typeof num === 'number' && !Number.isNaN(num);
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);      
        default:
            break;

    }
}

function initEventListeners() {
    const numbers = document.querySelectorAll('button[data-btn="number"]');
    const operators = document.querySelectorAll('button[data-btn="operator"]');
    const specials = {
        equals: document.querySelector('button[data-btn="equals"]'),    
        del: document.querySelector('button[data-btn="del"]'),    
        clear: document.querySelector('button[data-btn="clear"]'),    
    };
    const displayMain = document.querySelector('#display-main');
    const displayPrev = document.querySelector('#display-prev');

    
    // Numbers
    for(let num of numbers) {
        num.addEventListener('click', e => {
            console.log(displayMain.textContent);
            // Prevent . or e from occurring twice by supressing event changes
            if(num['value'] === '.' && (!displayMain.textContent || displayMain.textContent.includes('.') || displayMain.textContent.includes('e'))
            || num['value'] === 'e' && (!displayMain.textContent || displayMain.textContent.includes('e') || displayMain.textContent[displayMain.textContent.length-1] === '.')
            ) return;
            // Else
            displayMain.textContent += num.value;
        })
    }

    // Normal operators
    for(let op of operators) {
        op.addEventListener('click', e => {
            // Passes if/else cascade if display is empty, exits out of function entirely if operator stays the same
            if(!displayMain.textContent) {
                if(op.value === operator) return;
            } else if(!isNumber(value1)) {
                value1 = Number(displayMain.textContent);
            } else {
                value2 = Number(displayMain.textContent);
                value1 = operate(operator, value1, value2);
            }

            operator = op.value;
            displayPrev.textContent = `${value1} ${operator}`;
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
    specials.del.addEventListener('click', e => {
        displayMain.textContent = displayMain.textContent.slice(0, displayMain.textContent.length-1)
    })
    specials.clear.addEventListener('click', e => {
        value1 = undefined;
        operator = undefined;
        value2 = undefined;
        displayMain.textContent = displayPrev.textContent = '';
    })
} 

addEventListener('DOMContentLoaded', (e) => {
    initEventListeners();
})