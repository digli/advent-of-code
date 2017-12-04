const input = document.body.textContent.trim().split('\n');

const sum = (a, b) => a + b;
const diff = (a, b) => a - b;
const product = (a, b) => a * b;
const extractDimensions = (row) => row.split('x').map(Number);

const getAreas = (dimensions) => {
  return [
    dimensions[0] * dimensions[1],
    dimensions[0] * dimensions[2],
    dimensions[1] * dimensions[2]
  ];
}

const paperNeeded = (areas) => {
  return areas.map(x => x * 2).reduce(sum) + Math.min(...areas);
}

const totalPaperNeeded = (input) => {
  return input
    .map(extractDimensions)
    .map(getAreas)
    .map(paperNeeded)
    .reduce(sum);
}

const smallestSides = (dimensions) => {
  return dimensions.sort(diff).slice(0, 2);
}

const ribbonNeeded = (dimensions) => {
  return smallestSides(dimensions).map(x => x * 2).reduce(sum) + dimensions.reduce(product);
}

const totalRibbonNeeded = (input) => {
  return input
    .map(extractDimensions)
    .map(ribbonNeeded)
    .reduce(sum);
}

console.log(totalPaperNeeded(input)); // 1588178
console.log(totalRibbonNeeded(input)); // 3783758
