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
        return result;
        
    } catch (e) {
        currentExpression = "Error";
        updateResult();
        console.log("Error:", e);
        return null;
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

function getLastResult() {
    return LAST_RESULT;
}

function getCurrentExpression() {
    return currentExpression;
}

function setCurrentExpression(expr) {
    currentExpression = expr;
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

function getNthFibonacci(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    }
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    
    function isPerfectSquare(x) {
        const sqrt = Math.sqrt(x);
        return sqrt === Math.floor(sqrt);
    }
    
    return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

// Export functions for testing (Node.js/Jest)
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        appendToResult,
        operatorToResult,
        backspace,
        clearResult,
        calculateResult,
        updateResult,
        copyResult,
        getLastResult,
        getCurrentExpression,
        setCurrentExpression,
        generateFibonacci,
        getNthFibonacci,
        isFibonacciNumber,
        resetState: () => {
            currentExpression = "";
            LAST_RESULT = 0;
        }
    };
}
