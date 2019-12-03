'use strict';

const SIZE = 10000;
const fs = require('fs');

const clay = '#';
const stillWater = '~';
const flowingWater = '|';

let minX = 101001010;
let maxX = 0;
let minY = 111110;

const parseInput = (filename) => {
  const lines = String(fs.readFileSync(filename)).trim().split('\n');
  const grid = Array(SIZE).fill().map(() => 
    Array(SIZE).fill()
  );

  let maxY = 0;

  for (const line of lines) {
    const [ single, range ] = line.split(', ')
      .map(part => part.split('='));

    if (single[0] === 'x') {
      const x = single[1];
      const [ y1, y2 ] = range[1].split('..').map(Number);
      for (let y = y1; y <= y2; y++) {
        grid[y][x] = clay;
      }

      minY = Math.min(minY, y1, y2);
      maxY = Math.max(maxY, y2);
      maxX = Math.max(maxX, x);
      minX = Math.min(minX, x);
    } else {
      const y = single[1];
      const [ x1, x2 ] = range[1].split('..').map(Number);
      for (let x = x1; x <= x2; x++) {
        grid[y][x] = clay;
      }

      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      maxX = Math.max(maxX, x2);
      minX = Math.min(minX, x1);
    }
  }

  return grid.slice(0, maxY + 1);
};

const isEnclosed = (grid, x, y, direction) => {
  if ([stillWater, clay].includes(grid[y][x])) {
    return true;
  }

  if (!direction) {
    return isEnclosed(grid, x, y, 1) && isEnclosed(grid, x, y, -1);
  }

  return (
    [stillWater, clay].includes(grid[y + 1][x]) &&
    isEnclosed(grid, x + direction, y, direction)
  );
}

const flow = (grid, x, y, char) => {
  if (y >= grid.length) { return; }
  if (grid[y][x] === flowingWater && char !== stillWater) return;
  if (grid[y][x] === clay) { return; }
  if (grid[y][x] === stillWater) { return; }

  grid[y][x] = char;
  flow(grid, x, y + 1, char);

  if (y === grid.length - 1) { return; }

  switch (grid[y + 1][x]) {
    case stillWater:
    case clay: {
      if (isEnclosed(grid, x, y)) {
        grid[y][x] = stillWater;
        flow(grid, x + 1, y, stillWater);
        flow(grid, x - 1, y, stillWater);
      } else {
        flow(grid, x - 1, y, flowingWater);
        flow(grid, x + 1, y, flowingWater);
      }
    }
  }
}

const sleepMs = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

const puzzle = async (filename, waterTypes) => {
  const grid = parseInput(filename);

  flow(grid, 500, 1, flowingWater);

  const prettyGrid = grid.map(
    line => line
      .filter((_, i) => i >=  minX - 1 && i <= maxX + 1)
      .map(x => x || ' ').join('')
  );

  for (const line of prettyGrid) {
    // console.log(line);
    //  await sleepMs(10);
  }

  return grid
    .slice(minY)
    .map(row => row
      .filter(x => waterTypes.includes(x))
      .length
    )
    .reduce((a, b) => a + b);
}

console.log(puzzle('input.txt', [flowingWater, stillWater]));
console.log(puzzle('input.txt', [stillWater]));
