/**
 * Calculator Tests
 * Tests for basic calculator operations
 */

const {
    appendToResult,
    operatorToResult,
    backspace,
    clearResult,
    calculateResult,
    getCurrentExpression,
    setCurrentExpression,
    resetState,
    getLastResult
} = require('../assets/js/calculator.js');

// Mock DOM elements
document.body.innerHTML = '<input id="result" type="text" />';

describe('Calculator - Basic Operations', () => {
    
    beforeEach(() => {
        resetState();
    });

    describe('appendToResult', () => {
        test('should append a single digit', () => {
            appendToResult(5);
            expect(getCurrentExpression()).toBe('5');
        });

        test('should append multiple digits', () => {
            appendToResult(1);
            appendToResult(2);
            appendToResult(3);
            expect(getCurrentExpression()).toBe('123');
        });

        test('should handle decimal point', () => {
            appendToResult(3);
            appendToResult('.');
            appendToResult(14);
            expect(getCurrentExpression()).toBe('3.14');
        });
    });

    describe('operatorToResult', () => {
        test('should append addition operator', () => {
            appendToResult(5);
            operatorToResult('+');
            expect(getCurrentExpression()).toBe('5+');
        });

        test('should handle multiple operators in sequence', () => {
            appendToResult(10);
            operatorToResult('+');
            appendToResult(5);
            operatorToResult('-');
            expect(getCurrentExpression()).toBe('10+5-');
        });

        test('should support all operators', () => {
            const operators = ['+', '-', '*', '/'];
            operators.forEach(op => {
                resetState();
                appendToResult(1);
                operatorToResult(op);
                expect(getCurrentExpression()).toContain(op);
            });
        });
    });

    describe('backspace', () => {
        test('should remove the last character', () => {
            appendToResult(123);
            backspace();
            expect(getCurrentExpression()).toBe('12');
        });

        test('should remove operator', () => {
            appendToResult(5);
            operatorToResult('+');
            backspace();
            expect(getCurrentExpression()).toBe('5');
        });

        test('should handle empty expression', () => {
            backspace();
            expect(getCurrentExpression()).toBe('');
        });

        test('should remove multiple characters', () => {
            appendToResult(456);
            backspace();
            backspace();
            expect(getCurrentExpression()).toBe('4');
        });
    });

    describe('clearResult', () => {
        test('should clear the expression', () => {
            appendToResult(123);
            clearResult();
            expect(getCurrentExpression()).toBe('');
        });

        test('should clear complex expression', () => {
            appendToResult(10);
            operatorToResult('+');
            appendToResult(5);
            clearResult();
            expect(getCurrentExpression()).toBe('');
        });
    });

    describe('calculateResult', () => {
        test('should calculate addition', () => {
            setCurrentExpression('2+3');
            const result = calculateResult();
            expect(result).toBe(5);
        });

        test('should calculate subtraction', () => {
            setCurrentExpression('10-4');
            const result = calculateResult();
            expect(result).toBe(6);
        });

        test('should calculate multiplication', () => {
            setCurrentExpression('6*7');
            const result = calculateResult();
            expect(result).toBe(42);
        });

        test('should calculate division', () => {
            setCurrentExpression('20/4');
            const result = calculateResult();
            expect(result).toBe(5);
        });

        test('should handle order of operations', () => {
            setCurrentExpression('2+3*4');
            const result = calculateResult();
            expect(result).toBe(14);
        });

        test('should handle parentheses', () => {
            setCurrentExpression('(2+3)*4');
            const result = calculateResult();
            expect(result).toBe(20);
        });

        test('should handle decimals', () => {
            setCurrentExpression('3.5+2.5');
            const result = calculateResult();
            expect(result).toBe(6);
        });

        test('should return null for invalid expression', () => {
            setCurrentExpression('10++5');
            const result = calculateResult();
            expect(result).toBeNull();
        });

        test('should handle empty expression', () => {
            setCurrentExpression('');
            const result = calculateResult();
            expect(result).toBeUndefined();
        });

        test('should store result in LAST_RESULT', () => {
            setCurrentExpression('5+5');
            calculateResult();
            expect(getLastResult()).toBe(10);
        });

        test('should support ans variable', () => {
            setCurrentExpression('5+5');
            calculateResult();
            setCurrentExpression('ans*2');
            const result = calculateResult();
            expect(result).toBe(20);
        });
    });

    describe('Calculator State Management', () => {
        test('should update result field in DOM', () => {
            appendToResult(42);
            const resultField = document.getElementById('result');
            expect(resultField.value).toBe('42');
        });

        test('should display 0 for empty expression', () => {
            clearResult();
            const resultField = document.getElementById('result');
            expect(resultField.value).toBe('0');
        });
    });
});

describe('Calculator - Edge Cases', () => {
    
    beforeEach(() => {
        resetState();
    });

    test('should handle zero division gracefully', () => {
        setCurrentExpression('5/0');
        const result = calculateResult();
        expect(result).toBe(null);
    });

    test('should handle negative numbers', () => {
        setCurrentExpression('-5+-3');
        const result = calculateResult();
        expect(result).toBe(-8);
    });

    test('should handle large numbers', () => {
        setCurrentExpression('999999+1');
        const result = calculateResult();
        expect(result).toBe(1000000);
    });

    test('should handle very small decimals', () => {
        setCurrentExpression('0.1+0.2');
        const result = calculateResult();
        expect(Math.abs(result - 0.3) < 0.0001).toBe(true);
    });

    test('should handle consecutive operations', () => {
        appendToResult(5);
        operatorToResult('+');
        appendToResult(3);
        let result = calculateResult();
        expect(result).toBe(8);
        
        operatorToResult('+');
        appendToResult(2);
        result = calculateResult();
        expect(result).toBe(10);
    });
});
