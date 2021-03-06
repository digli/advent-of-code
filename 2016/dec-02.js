const input = document.body.textContent.trim().split('\n');

const easyKeys = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ],
];

const hardKeys = [
  [ 0 ,  0 , '1',  0 ,  0 ],
  [ 0 , '2', '3', '4',  0 ],
  ['5', '6', '7', '8', '9'],
  [ 0 , 'A', 'B', 'C',  0 ],
  [ 0 ,  0 , 'D',  0 ,  0 ],
];

function keyPadController(keyPad, startCol, startRow) {
  let col = startCol;
  let row = startRow;

  function value() {
    return keyPad[row][col];
  }

  function up() {
    if (!keyPad[row - 1] || !keyPad[row-1][col]) return;
    row--;
  }

  function down() {
    if (!keyPad[row + 1] || !keyPad[row + 1][col]) return;
    row++;
  }

  function right() {
    if (!keyPad[row][col + 1]) return;
    col++;
  }

  function left() {
    if (!keyPad[row][col - 1]) return;
    col--;
  }

  return {
    value,
    up,
    down,
    right,
    left,
  }
}

// const controller = keyPadController(easyKeys, 1, 1);
const controller = keyPadController(hardKeys, 2, 0);

function decipherRow(row) {
  const moves = {
    'U': () => controller.up(),
    'D': () => controller.down(),
    'R': () => controller.right(),
    'L': () => controller.left(),
  };

  row.split('').forEach(command => {
    moves[command]();
  });

  return controller.value();
}

console.log(input.map(decipherRow).join(''));
