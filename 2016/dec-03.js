const input = document.body.textContent.trim().split('\n');

const toIntArray = (row) => row.trim().split(/\s+/).map(Number);

const isValidTriangle = (a, b, c) => {
  return (a + b > c) && (a + c > b) && (b + c > a);
}

const numValidTriangles = (input) => {
  return input
    .map(toIntArray)
    .filter(tri => isValidTriangle(...tri))
    .length;
}

const numTransposedTriangles = (input) => {
  const matrix = input.map(toIntArray);
  let numValid = 0;

  for (let i = 0; i < matrix.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      numValid += isValidTriangle(matrix[i][j], matrix[i + 1][j], matrix[i + 2][j]);
    }
  }

  return numValid;
}

console.log(numValidTriangles(input)); // 1032
console.log(numTransposedTriangles(input)); // 1838
