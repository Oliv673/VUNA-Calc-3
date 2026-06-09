# Calculator Tests

This directory contains automated tests for the VUNA Calculator application using Jest.

## Test Structure

- **`calculator.test.js`** - Tests for basic calculator operations (append, operators, backspace, clear, calculate)
- **`fibonacci.test.js`** - Tests for Fibonacci-related functions (generate sequence, get nth term, check if Fibonacci number)

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Coverage

The test suite includes:

### Calculator Operations
- ✓ Appending digits and decimals
- ✓ Adding operators (+, -, *, /)
- ✓ Backspace functionality
- ✓ Clearing expressions
- ✓ Calculating results with order of operations
- ✓ Handling parentheses
- ✓ Using 'ans' variable for previous results
- ✓ Error handling for invalid expressions
- ✓ Edge cases (division by zero, negative numbers, large numbers)

### Fibonacci Functions
- ✓ Generating Fibonacci sequences of various lengths
- ✓ Getting the nth Fibonacci number
- ✓ Checking if a number is in the Fibonacci sequence
- ✓ Verifying mathematical properties and formulas
- ✓ Handling edge cases and large numbers

## Test Framework Details

- **Framework**: Jest
- **Environment**: jsdom (for DOM testing)
- **Coverage Target**: 80% for functions, lines, and statements; 70% for branches

## CI/CD Integration

These tests run automatically via GitHub Actions on every push to the main branch:
- Tests must pass before the build/deploy stage proceeds
- Coverage reports are generated to track code quality

## Example Test Output

```
 PASS  __tests__/calculator.test.js
  Calculator - Basic Operations
    appendToResult
      ✓ should append a single digit (2 ms)
      ✓ should append multiple digits (1 ms)
      ✓ should handle decimal point (1 ms)
    ...

 PASS  __tests__/fibonacci.test.js
  Fibonacci - Generate Sequence
    ✓ should return empty array for n <= 0 (1 ms)
    ✓ should return [0] for n === 1 (1 ms)
    ...

Test Suites: 2 passed, 2 total
Tests:       85 passed, 85 total
Snapshots:   0 total
Time:        2.345 s
```
