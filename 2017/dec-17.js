const input = 380;

const part1 = (stepSize) => {
  const buffer = [0]
  const len = 2017;
  let pos = 0;

  for (let i = 1; i <= len; i++) {
    pos = (pos + stepSize + 1) % i;
    // SPLICE IS SO SLOW PLS
    buffer.splice(pos, 0, i);
  }

  return buffer[buffer.indexOf(len) + 1];
}

const part2 = (stepSize) => {
  let pos = 0;
  let posZero = 0;
  let next = 0;

  for (let i = 1; i <= 5e7; i++) {
    pos = (pos + stepSize + 1) % i;
    if (pos === posZero) {
      next = i;
    } else if (pos < posZero) {
      posZero++;
    }
  }

  return next;
}

console.log(part1(input));
console.log(part2(input));
