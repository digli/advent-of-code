const input = document.body.textContent.trim().split(',');

const numSteps = (pos) => {
  const [x, y] = [Math.abs(pos.x), Math.abs(pos.y)];
  return x + Math.max((y - x) / 2, 0);
}

let furthestAway = 0;

const move = (pos, command) => {
  const yDirection = command[0] === 'n' ? 1 : -1;

  if (command.length === 2) {
    const xDirection = command[1] === 'e' ? 1 : -1;
    pos.x += xDirection;
    pos.y += yDirection;
  } else {
    pos.y += yDirection * 2;
  }

  furthestAway = Math.max(furthestAway, numSteps(pos));
}

const leastNumSteps = (input) => {
  const pos = { x: 0, y: 0 };
  input.forEach(command => move(pos, command));

  return numSteps(pos);
}

console.log(leastNumSteps(input));
console.log(furthestAway);
