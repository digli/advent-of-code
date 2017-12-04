const input = document.body.textContent.trim().split('\n');

const sum = (a, b) => a + b;

function escapedLength(row) {
  return row
    .substring(1, row.length - 1)
    .replace(/\\\\/g, '.')
    .replace(/\\x([\da-f]{2})/g, '.')
    .replace(/\\\"/g, '.')
    .length;
}

function encodedLength(row) {
  return row
    .replace(/\\\"/g, '....')
    .replace(/\"/g, '..')
    .replace(/\\/g, '..')
    .length + 2;
}

const escapedDiff = (row) => row.length - escapedLength(row);
const encodedDiff = (row) => encodedLength(row) - row.length;

console.log(input.map(escapedDiff).reduce(sum)); // 1350
console.log(input.map(encodedDiff).reduce(sum)); // 2085
