const input = document.body.textContent.trim().split('\n');

const escapeMaze = (input) => {
  const steps = input.map(Number);
  let currentPosition = 0;
  let numJumps = 0;

  while (steps[currentPosition] !== undefined) {
    let jump = steps[currentPosition];
    if (steps[currentPosition] >= 3) {
      steps[currentPosition] -= 1;
    } else {
      steps[currentPosition] += 1;
    }

    currentPosition += jump;
    numJumps++;
  }

  return numJumps;
}

console.log(escapeMaze(input));
