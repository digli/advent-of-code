const input = [
  'rect 1x1',
  'rotate row y=0 by 2',
  'rect 1x1',
  'rotate row y=0 by 5',
  'rect 1x1',
  'rotate row y=0 by 3',
  'rect 1x1',
  'rotate row y=0 by 3',
  'rect 2x1',
  'rotate row y=0 by 5',
  'rect 1x1',
  'rotate row y=0 by 5',
  'rect 4x1',
  'rotate row y=0 by 2',
  'rect 1x1',
  'rotate row y=0 by 2',
  'rect 1x1',
  'rotate row y=0 by 5',
  'rect 4x1',
  'rotate row y=0 by 3',
  'rect 2x1',
  'rotate row y=0 by 5',
  'rect 4x1',
  'rotate row y=0 by 2',
  'rect 1x2',
  'rotate row y=1 by 6',
  'rotate row y=0 by 2',
  'rect 1x2',
  'rotate column x=32 by 1',
  'rotate column x=23 by 1',
  'rotate column x=13 by 1',
  'rotate row y=0 by 6',
  'rotate column x=0 by 1',
  'rect 5x1',
  'rotate row y=0 by 2',
  'rotate column x=30 by 1',
  'rotate row y=1 by 20',
  'rotate row y=0 by 18',
  'rotate column x=13 by 1',
  'rotate column x=10 by 1',
  'rotate column x=7 by 1',
  'rotate column x=2 by 1',
  'rotate column x=0 by 1',
  'rect 17x1',
  'rotate column x=16 by 3',
  'rotate row y=3 by 7',
  'rotate row y=0 by 5',
  'rotate column x=2 by 1',
  'rotate column x=0 by 1',
  'rect 4x1',
  'rotate column x=28 by 1',
  'rotate row y=1 by 24',
  'rotate row y=0 by 21',
  'rotate column x=19 by 1',
  'rotate column x=17 by 1',
  'rotate column x=16 by 1',
  'rotate column x=14 by 1',
  'rotate column x=12 by 2',
  'rotate column x=11 by 1',
  'rotate column x=9 by 1',
  'rotate column x=8 by 1',
  'rotate column x=7 by 1',
  'rotate column x=6 by 1',
  'rotate column x=4 by 1',
  'rotate column x=2 by 1',
  'rotate column x=0 by 1',
  'rect 20x1',
  'rotate column x=47 by 1',
  'rotate column x=40 by 2',
  'rotate column x=35 by 2',
  'rotate column x=30 by 2',
  'rotate column x=10 by 3',
  'rotate column x=5 by 3',
  'rotate row y=4 by 20',
  'rotate row y=3 by 10',
  'rotate row y=2 by 20',
  'rotate row y=1 by 16',
  'rotate row y=0 by 9',
  'rotate column x=7 by 2',
  'rotate column x=5 by 2',
  'rotate column x=3 by 2',
  'rotate column x=0 by 2',
  'rect 9x2',
  'rotate column x=22 by 2',
  'rotate row y=3 by 40',
  'rotate row y=1 by 20',
  'rotate row y=0 by 20',
  'rotate column x=18 by 1',
  'rotate column x=17 by 2',
  'rotate column x=16 by 1',
  'rotate column x=15 by 2',
  'rotate column x=13 by 1',
  'rotate column x=12 by 1',
  'rotate column x=11 by 1',
  'rotate column x=10 by 1',
  'rotate column x=8 by 3',
  'rotate column x=7 by 1',
  'rotate column x=6 by 1',
  'rotate column x=5 by 1',
  'rotate column x=3 by 1',
  'rotate column x=2 by 1',
  'rotate column x=1 by 1',
  'rotate column x=0 by 1',
  'rect 19x1',
  'rotate column x=44 by 2',
  'rotate column x=40 by 3',
  'rotate column x=29 by 1',
  'rotate column x=27 by 2',
  'rotate column x=25 by 5',
  'rotate column x=24 by 2',
  'rotate column x=22 by 2',
  'rotate column x=20 by 5',
  'rotate column x=14 by 3',
  'rotate column x=12 by 2',
  'rotate column x=10 by 4',
  'rotate column x=9 by 3',
  'rotate column x=7 by 3',
  'rotate column x=3 by 5',
  'rotate column x=2 by 2',
  'rotate row y=5 by 10',
  'rotate row y=4 by 8',
  'rotate row y=3 by 8',
  'rotate row y=2 by 48',
  'rotate row y=1 by 47',
  'rotate row y=0 by 40',
  'rotate column x=47 by 5',
  'rotate column x=46 by 5',
  'rotate column x=45 by 4',
  'rotate column x=43 by 2',
  'rotate column x=42 by 3',
  'rotate column x=41 by 2',
  'rotate column x=38 by 5',
  'rotate column x=37 by 5',
  'rotate column x=36 by 5',
  'rotate column x=33 by 1',
  'rotate column x=28 by 1',
  'rotate column x=27 by 5',
  'rotate column x=26 by 5',
  'rotate column x=25 by 1',
  'rotate column x=23 by 5',
  'rotate column x=22 by 1',
  'rotate column x=21 by 2',
  'rotate column x=18 by 1',
  'rotate column x=17 by 3',
  'rotate column x=12 by 2',
  'rotate column x=11 by 2',
  'rotate column x=7 by 5',
  'rotate column x=6 by 5',
  'rotate column x=5 by 4',
  'rotate column x=3 by 5',
  'rotate column x=2 by 5',
  'rotate column x=1 by 3',
  'rotate column x=0 by 4',
];

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

  const modulo = (a, b) => ((a % b) + b) % b;

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
    return display.map(row => row.reduce((a, b) => a + b)).reduce((a, b) => a + b);
  }

  return {
    display,
    drawRect,
    rotate,
    toString,
  }
}

const width = 50;
const height = 6;
const displayController = DisplayController(width, height);

const readCommand = (row) => {
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

console.log(displayController.countPixels()); // 110
console.log(displayController.toString());
// # # # # . . . # # . # . . # . # # # . . # . . # . . # # . . # # # . . # . . . . # . . . # . . # # .
// . . . # . . . . # . # . . # . # . . # . # . # . . # . . # . # . . # . # . . . . # . . . # . . . # .
// . . # . . . . . # . # # # # . # . . # . # # . . . # . . . . # . . # . # . . . . . # . # . . . . # .
// . # . . . . . . # . # . . # . # # # . . # . # . . # . . . . # # # . . # . . . . . . # . . . . . # .
// # . . . . # . . # . # . . # . # . # . . # . # . . # . . # . # . . . . # . . . . . . # . . # . . # .
// # # # # . . # # . . # . . # . # . . # . # . . # . . # # . . # . . . . # # # # . . . # . . . # # . .
