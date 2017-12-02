const input = document.body.textContent.trim().split('\n');
const sum = (a, b) => a + b;
const toIntArray = (row) => row.split(/\s+/).map(Number);
const largestDiff = (arr) => Math.max(...arr) - Math.min(...arr);

const divideIfEvenlyDivisible = (x, i, arr) => {
  return arr
    .filter(y => x > y && x % y === 0)
    .map(y => x / y)
    .reduce(sum, 0);
}

const sumOfDivisions = (row) => {
  return row
    .map(divideIfEvenlyDivisible)
    .reduce(sum);
}

const checkSum = (input) => {
  return input
    .map(toIntArray)
    .map(largestDiff)
    .reduce(sum);
}

const quotinents = (input) => {
  return input
    .map(toIntArray)
    .map(sumOfDivisions)
    .reduce(sum);
}

console.log(checkSum(input)); // 32121
console.log(quotinents(input)); // 197
