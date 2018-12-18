'use strict';

const open = '.';
const tree = '|';
const lumberyard = '#';

const fs = require('fs');
const parseInput = (filename) => {
  return String(fs.readFileSync(filename)).trim().split('\n');
}

const countNeighbors = (grid, x, y) => {
  const neighbors = {
    [open]: 0,
    [tree]: 0,
    [lumberyard]: 0
  };

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) continue;
      if (grid[j] && grid[j][i]) {
        neighbors[grid[j][i]] += 1;
      }
    }
  }

  return neighbors;
}

const game = (inputFile, numIterations) => {
  let grid = parseInput(inputFile);

  const countChar = (char) => grid
    .map(line => line.filter(x => x === char).length)
    .reduce((a, b) => a + b);

  const prevScores = new Map();
  let hasCycled = false;

  for (let i = 0; i < numIterations; i++) {
    let nextGrid = [];
    for (let y = 0; y < grid.length; y++) {
      nextGrid[y] = [];
      for (let x = 0; x < grid[y].length; x++) {
        const neighbors = countNeighbors(grid, x, y);
        let result;
        switch (grid[y][x]) {
          case open: {
            result = neighbors[tree] >= 3 ? tree : open;
            break;
          }
          case tree: {
            result = neighbors[lumberyard] >= 3 ? lumberyard : tree;
            break;
          }
          case lumberyard: {
            result = (
              neighbors[lumberyard] >= 1 && neighbors[tree] >= 1
                ? lumberyard
                : open
            );
            break;
          }
          default: {
            throw new Error('This is off: ' + grid[y][x]);
          }
        }
        nextGrid[y][x] = result;
      }
    }

    grid = nextGrid;
    if (i > 1000 && !hasCycled) {
      const score = countChar(lumberyard) * countChar(tree);
      if (prevScores.get(score)) {
        const cycleLength = i - prevScores.get(score);

        while (i + cycleLength < numIterations) {
          i += cycleLength;
        }

        hasCycled = true;
      }
  
      prevScores.set(score, i);
    }
  }

  return countChar(lumberyard) * countChar(tree);
}

console.log('The answer to puzzle 1 is ', game('input.txt', 10));
console.log('The answer to puzzle 2 is ', game('input.txt', 1e9));
