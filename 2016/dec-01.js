const input = document.body.textContent.trim().split(', ');

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
