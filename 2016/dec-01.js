const input = ['R1', 'L4', 'L5', 'L5', 'R2', 'R2', 'L1', 'L1', 'R2', 'L3', 'R4', 'R3', 'R2', 'L4', 'L2', 'R5', 'L1', 'R5', 'L5', 'L2', 'L3', 'L1', 'R1', 'R4', 'R5', 'L3', 'R2', 'L4', 'L5', 'R1', 'R2', 'L3', 'R3', 'L3', 'L1', 'L2', 'R5', 'R4', 'R5', 'L5', 'R1', 'L190', 'L3', 'L3', 'R3', 'R4', 'R47', 'L3', 'R5', 'R79', 'R5', 'R3', 'R1', 'L4', 'L3', 'L2', 'R194', 'L2', 'R1', 'L2', 'L2', 'R4', 'L5', 'L5', 'R1', 'R1', 'L1', 'L3', 'L2', 'R5', 'L3', 'L3', 'R4', 'R1', 'R5', 'L4', 'R3', 'R1', 'L1', 'L2', 'R4', 'R1', 'L2', 'R4', 'R4', 'L5', 'R3', 'L5', 'L3', 'R1', 'R1', 'L3', 'L1', 'L1', 'L3', 'L4', 'L1', 'L2', 'R1', 'L5', 'L3', 'R2', 'L5', 'L3', 'R5', 'R3', 'L4', 'L2', 'R2', 'R4', 'R4', 'L4', 'R5', 'L1', 'L3', 'R3', 'R4', 'R4', 'L5', 'R4', 'R2', 'L3', 'R4', 'R2', 'R1', 'R2', 'L4', 'L2', 'R2', 'L5', 'L5', 'L3', 'R5', 'L5', 'L1', 'R4', 'L1', 'R1', 'L1', 'R4', 'L5', 'L3', 'R4', 'R1', 'L3', 'R4', 'R1', 'L3', 'L1', 'R1', 'R2', 'L4', 'L2', 'R1', 'L5', 'L4', 'L5']
const visitedPositions = [];
const position = {
  x: 0,
  y: 0,
  direction: 0,
  manhattan: function() { return Math.abs(this.x) + Math.abs(this.y) }
};

const modulo = (x, y) => ((x % y) + y) % y;
const steps = {
  '0': () => position.y += 1,
  '1': () => position.x += 1,
  '2': () => position.y -= 1,
  '3': () => position.x -= 1,
};

const checkVisited = () => {
  if (visitedPositions.find(p => p.x === position.x && p.y === position.y))
    console.log('Visited twice: ' + position.manhattan());

  visitedPositions.push({ x: position.x, y: position.y });
};

function decipherInput(input) {
  const distance = Number(input.substring(1));
  position.direction += input[0] === 'R' ? 1 : -1;

  const stepInDirection = steps[modulo(position.direction, 4)];

  for (let i = 0; i < distance; i++) {
    stepInDirection();
    checkVisited();
  }
}

input.forEach(decipherInput);
console.log(position.manhattan());
