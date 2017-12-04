const input = document.body.textContent.trim().split('\n');

const sum = (a, b) => a + b;
const modulo = (a, b) => ((a % b) + b) % b;

function DisplayController(width, height) {
  const display = Array(height).fill().map(x => Array(width).fill(0));

  const drawRect = (command) => {
    const [x, y] = command.split('x').map(Number);

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        display[i][j] = 1;
      }
    }
  }

  const rotateRow = (row, shift) => {
    const copy = display[row].map(x => x);
    for (let i = 0; i < width; i++) {
      display[row] = display[row].map((x, i) => copy[modulo(i - shift, width)]);
    }
  }

  const rotateColumn = (col, shift) => {
    const copy = display.map(row => row[col]);
    for (let i = 0; i < height; i++) {
      display[i][col] = copy[modulo(i - shift, height)];
    }
  }

  const rotate = (command, shift) => {
    let [direction, value] = command.split('=');
    value = Number(value);
    shift = Number(shift);

    if (direction === 'y') {
      rotateRow(value, shift);
    } else {
      rotateColumn(value, shift);
    }
  }
  
  const toString = () => {
    return display.map(row => {
      return row.map(x => x ? '#' : '.').join(' ');
    }).join('\n');
  }

  const countPixels = () => {
    return display
      .map(row => row.reduce(sum))
      .reduce(sum);
  }

  return {
    drawRect,
    rotate,
    countPixels,
    toString,
  }
}

const width = 50;
const height = 6;
const displayController = DisplayController(width, height);

const executeCommand = (row) => {
  const parts = row.split(' ');

  switch (parts[0]) {
    case 'rect':
      displayController.drawRect(parts[1]);
      break;
    case 'rotate':
      displayController.rotate(parts[2], parts[4]);
      break;
  }
}

input.forEach(executeCommand);

console.log(displayController.countPixels()); // 110
console.log(displayController.toString());
// # # # # . . . # # . # . . # . # # # . . # . . # . . # # . . # # # . . # . . . . # . . . # . . # # .
// . . . # . . . . # . # . . # . # . . # . # . # . . # . . # . # . . # . # . . . . # . . . # . . . # .
// . . # . . . . . # . # # # # . # . . # . # # . . . # . . . . # . . # . # . . . . . # . # . . . . # .
// . # . . . . . . # . # . . # . # # # . . # . # . . # . . . . # # # . . # . . . . . . # . . . . . # .
// # . . . . # . . # . # . . # . # . # . . # . # . . # . . # . # . . . . # . . . . . . # . . # . . # .
// # # # # . . # # . . # . . # . # . . # . # . . # . . # # . . # . . . . # # # # . . . # . . . # # . .
