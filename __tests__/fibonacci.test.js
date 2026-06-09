/**
 * Fibonacci Tests
 * Tests for Fibonacci-related calculator functions
 */

const {
    generateFibonacci,
    getNthFibonacci,
    isFibonacciNumber,
    resetState
} = require('../assets/js/calculator.js');

describe('Fibonacci - Generate Sequence', () => {
    
    beforeEach(() => {
        resetState();
    });

    test('should return empty array for n <= 0', () => {
        expect(generateFibonacci(0)).toEqual([]);
        expect(generateFibonacci(-5)).toEqual([]);
    });

    test('should return [0] for n === 1', () => {
        expect(generateFibonacci(1)).toEqual([0]);
    });

    test('should generate first 2 Fibonacci numbers', () => {
        expect(generateFibonacci(2)).toEqual([0, 1]);
    });

    test('should generate first 5 Fibonacci numbers', () => {
        expect(generateFibonacci(5)).toEqual([0, 1, 1, 2, 3]);
    });

    test('should generate first 10 Fibonacci numbers', () => {
        expect(generateFibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    test('should generate correct sequence for n=15', () => {
        const result = generateFibonacci(15);
        expect(result.length).toBe(15);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[14]).toBe(377);
    });

    test('should handle large n values', () => {
        const result = generateFibonacci(50);
        expect(result.length).toBe(50);
        expect(result[49]).toBe(7778742049);
    });

    test('should verify sum of first n Fibonacci numbers', () => {
        const fib = generateFibonacci(10);
        const sum = fib.reduce((a, b) => a + b, 0);
        expect(sum).toBe(88);
    });
});

describe('Fibonacci - Get Nth Term', () => {
    
    beforeEach(() => {
        resetState();
    });

    test('should return 0 for n=0', () => {
        expect(getNthFibonacci(0)).toBe(0);
    });

    test('should return 1 for n=1', () => {
        expect(getNthFibonacci(1)).toBe(1);
    });

    test('should return correct values for small n', () => {
        expect(getNthFibonacci(2)).toBe(1);
        expect(getNthFibonacci(3)).toBe(2);
        expect(getNthFibonacci(4)).toBe(3);
        expect(getNthFibonacci(5)).toBe(5);
        expect(getNthFibonacci(6)).toBe(8);
    });

    test('should handle n=10', () => {
        expect(getNthFibonacci(10)).toBe(55);
    });

    test('should handle n=20', () => {
        expect(getNthFibonacci(20)).toBe(6765);
    });

    test('should handle large n values', () => {
        expect(getNthFibonacci(30)).toBe(832040);
    });

    test('should match sequence from generateFibonacci', () => {
        const sequence = generateFibonacci(15);
        for (let i = 0; i < 15; i++) {
            expect(getNthFibonacci(i)).toBe(sequence[i]);
        }
    });
});

describe('Fibonacci - Check if Number is Fibonacci', () => {
    
    beforeEach(() => {
        resetState();
    });

    test('should return true for 0', () => {
        expect(isFibonacciNumber(0)).toBe(true);
    });

    test('should return true for 1', () => {
        expect(isFibonacciNumber(1)).toBe(true);
    });

    test('should return true for known Fibonacci numbers', () => {
        const fibNumbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
        fibNumbers.forEach(num => {
            expect(isFibonacciNumber(num)).toBe(true);
        });
    });

    test('should return false for non-Fibonacci numbers', () => {
        const nonFibNumbers = [4, 6, 7, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20];
        nonFibNumbers.forEach(num => {
            expect(isFibonacciNumber(num)).toBe(false);
        });
    });

    test('should handle negative numbers', () => {
        expect(isFibonacciNumber(-1)).toBe(false);
        expect(isFibonacciNumber(-5)).toBe(false);
        expect(isFibonacciNumber(-100)).toBe(false);
    });

    test('should handle large Fibonacci numbers', () => {
        expect(isFibonacciNumber(6765)).toBe(true);
        expect(isFibonacciNumber(17711)).toBe(true);
        expect(isFibonacciNumber(46368)).toBe(true);
    });

    test('should return false for large non-Fibonacci numbers', () => {
        expect(isFibonacciNumber(6764)).toBe(false);
        expect(isFibonacciNumber(6766)).toBe(false);
        expect(isFibonacciNumber(46367)).toBe(false);
    });

    test('should handle edge case numbers', () => {
        expect(isFibonacciNumber(2)).toBe(true);
        expect(isFibonacciNumber(3)).toBe(true);
        expect(isFibonacciNumber(4)).toBe(false);
        expect(isFibonacciNumber(5)).toBe(true);
    });
});

describe('Fibonacci - Properties and Patterns', () => {
    
    beforeEach(() => {
        resetState();
    });

    test('should verify F(n) = F(n-1) + F(n-2)', () => {
        for (let i = 2; i <= 20; i++) {
            const fn = getNthFibonacci(i);
            const fn_1 = getNthFibonacci(i - 1);
            const fn_2 = getNthFibonacci(i - 2);
            expect(fn).toBe(fn_1 + fn_2);
        }
    });

    test('should verify Fibonacci sequence is strictly increasing', () => {
        const sequence = generateFibonacci(20);
        for (let i = 1; i < sequence.length; i++) {
            expect(sequence[i]).toBeGreaterThanOrEqual(sequence[i - 1]);
        }
    });

    test('should generate different sequences for different n', () => {
        const fib5 = generateFibonacci(5);
        const fib10 = generateFibonacci(10);
        expect(fib5).not.toEqual(fib10);
        expect(fib5.length).toBeLessThan(fib10.length);
    });
});
