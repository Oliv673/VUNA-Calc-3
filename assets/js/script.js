// ===============================
// CALCULATOR STATE
// ===============================
let currentExpression = "";
let LAST_RESULT = 0;

// ===============================
// BASIC CALCULATOR FUNCTIONS
// ===============================

function appendToResult(value) {
    currentExpression += value.toString();
    updateResult();
    console.log("Appended:", value, "Current:", currentExpression);
}

function operatorToResult(value) {
    currentExpression += value;
    updateResult();
    console.log("Operator:", value, "Current:", currentExpression);
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    updateResult();
    console.log("Backspace, Current:", currentExpression);
}

function clearResult() {
    currentExpression = "";
    updateResult();
    console.log("Cleared all");
}

function calculateResult() {
    if (!currentExpression) return;

    try {
        let expression = currentExpression;
        expression = expression.replace(/\bans\b/gi, LAST_RESULT);
        let result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            throw new Error();
        }
        
        LAST_RESULT = result;
        currentExpression = result.toString();
        updateResult();
        console.log("Calculated:", result);
        
    } catch (e) {
        currentExpression = "Error";
        updateResult();
        console.log("Error:", e);
    }
}

function updateResult() {
    const resultField = document.getElementById("result");
    if (resultField) {
        resultField.value = currentExpression || "0";
    }
}

function copyResult() {
    const resultField = document.getElementById("result");
    if (!resultField || !resultField.value) return;
    
    navigator.clipboard.writeText(resultField.value)
        .then(() => alert("Result copied!"))
        .catch(() => alert("Failed to copy"));
}

// ===============================
// FIBONACCI FUNCTIONS
// ===============================

function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib.slice(0, n);
}

function calculateFibonacci() {
    const nInput = document.getElementById('fib-terms');
    const resultDiv = document.getElementById('fib-result');
    
    if (!nInput || !nInput.value) {
        alert('Please enter the number of terms');
        return;
    }
    
    const n = parseInt(nInput.value);
    
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid positive integer');
        return;
    }
    
    if (n > 50) {
        alert('Maximum 50 terms allowed');
        return;
    }
    
    const fibSequence = generateFibonacci(n);
    const sequenceStr = fibSequence.join(', ');
    const sum = fibSequence.reduce((a, b) => a + b, 0);
    
    const sequenceSpan = document.getElementById('fib-sequence');
    const sumSpan = document.getElementById('fib-sum');
    const lastSpan = document.getElementById('fib-last');
    
    if (sequenceSpan) sequenceSpan.textContent = sequenceStr;
    if (sumSpan) sumSpan.textContent = sum;
    if (lastSpan) lastSpan.textContent = fibSequence[fibSequence.length - 1];
    
    if (resultDiv) resultDiv.style.display = 'block';
}

function findNthFibonacci() {
    const nInput = document.getElementById('fib-nth-input');
    const resultDiv = document.getElementById('fib-nth-result');
    
    if (!nInput || !nInput.value) {
        alert('Please enter the term number (n)');
        return;
    }
    
    const n = parseInt(nInput.value);
    
    if (isNaN(n) || n < 0) {
        alert('Please enter a valid non-negative integer');
        return;
    }
    
    if (n > 80) {
        alert('Maximum 80th term allowed');
        return;
    }
    
    let fib;
    if (n === 0) {
        fib = 0;
    } else if (n === 1) {
        fib = 1;
    } else {
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        fib = b;
    }
    
    const nthValueSpan = document.getElementById('fib-nth-value');
    if (nthValueSpan) nthValueSpan.textContent = fib;
    
    if (resultDiv) resultDiv.style.display = 'block';
}

function checkFibonacciNumber() {
    // Get the input element
    const numInput = document.getElementById('fib-check-input');
    const resultDiv = document.getElementById('fib-check-result');
    const answerSpan = document.getElementById('fib-check-answer');
    const valueSpan = document.getElementById('fib-check-value');
    
    // Check if input exists and has a value
    if (!numInput) {
        console.error("Element 'fib-check-input' not found");
        alert('Error: Input field not found');
        return;
    }
    
    if (!numInput.value) {
        alert('Please enter a number to check');
        return;
    }
    
    // Get the number value
    const num = parseInt(numInput.value);
    
    // Validate the number
    if (isNaN(num)) {
        alert('Please enter a valid number');
        return;
    }
    
    if (num < 0) {
        alert('Please enter a non-negative number');
        return;
    }
    
    // Function to check if a number is a perfect square
    function isPerfectSquare(x) {
        const sqrt = Math.sqrt(x);
        return sqrt === Math.floor(sqrt);
    }
    
    // Check if the number is Fibonacci using the mathematical property
    const isFib = isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
    
    // Display the result
    if (valueSpan) valueSpan.textContent = num;
    
    if (answerSpan) {
        answerSpan.textContent = isFib ? 'YES ✓' : 'NO ✗';
        answerSpan.style.color = isFib ? '#198754' : '#dc3545';
        answerSpan.style.fontWeight = 'bold';
        answerSpan.style.fontSize = '1.1rem';
    }
    
    if (resultDiv) resultDiv.style.display = 'block';
    
    // Also show result in console for debugging
    console.log(`Number ${num} is ${isFib ? '' : 'NOT '}a Fibonacci number`);
}

function clearFibonacci() {
    const termsInput = document.getElementById('fib-terms');
    const nthInput = document.getElementById('fib-nth-input');
    const checkInput = document.getElementById('fib-check-input');
    const resultDiv = document.getElementById('fib-result');
    const nthResultDiv = document.getElementById('fib-nth-result');
    const checkResultDiv = document.getElementById('fib-check-result');
    const answerSpan = document.getElementById('fib-check-answer');
    const valueSpan = document.getElementById('fib-check-value');
    const sequenceSpan = document.getElementById('fib-sequence');
    const sumSpan = document.getElementById('fib-sum');
    const lastSpan = document.getElementById('fib-last');
    const nthValueSpan = document.getElementById('fib-nth-value');
    
    if (termsInput) termsInput.value = '';
    if (nthInput) nthInput.value = '';
    if (checkInput) checkInput.value = '';
    if (resultDiv) resultDiv.style.display = 'none';
    if (nthResultDiv) nthResultDiv.style.display = 'none';
    if (checkResultDiv) checkResultDiv.style.display = 'none';
    if (answerSpan) answerSpan.textContent = '';
    if (valueSpan) valueSpan.textContent = '';
    if (sequenceSpan) sequenceSpan.textContent = '';
    if (sumSpan) sumSpan.textContent = '';
    if (lastSpan) lastSpan.textContent = '';
    if (nthValueSpan) nthValueSpan.textContent = '';
}

// ===============================
// KEYBOARD SUPPORT
// ===============================
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (!isNaN(key)) {
        appendToResult(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operatorToResult(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearResult();
    }
});

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener("DOMContentLoaded", function() {
    console.log("Calculator loaded successfully!");
    
    const scrollBtn = document.getElementById("scroll-to-calculator");
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            const calculatorTop = document.querySelector(".calculator-card");
            if (calculatorTop) {
                calculatorTop.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }
});