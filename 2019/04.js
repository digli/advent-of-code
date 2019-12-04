const input = '108457-562041'.split('-').map(Number);
const tests = [
    { password: 111111, isValid: true },
    { password: 223450, isValid: false },
    { password: 123789, isValid: false },
];

const isValidPassword = (pw, exactDouble = false) => {
    const digits = String(pw).split('');
   
    const isSorted = digits.every((digit, i) =>
        digit >= (digits[i - 1] || 0)
    );

    if (!isSorted) {
        return false;
    }

    const digitGroups = new Map();
    for (const digit of digits) {
        const digitCount = digitGroups.get(digit) || 0;
        digitGroups.set(digit, digitCount + 1);
    }

    return [...digitGroups.values()].some(group =>
        exactDouble
            ? group === 2
            : group >= 2
        );
};

tests.every(test => isValidPassword(test.password) === test.isValid);

const run = (input, exactDouble = false) => {
    const [start, end] = input;

    let totalValid = 0;

    for (let i = start; i < end; i++) {
        if (isValidPassword(i, exactDouble)) {
            totalValid += 1;
        }
    }

    return totalValid;
}

console.log(run(input));
console.log(run(input, true));
