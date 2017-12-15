const startA = 512;
const startB = 191;

function Generator(start, factor, multiple=1) {
  this.value = start;
  const dividend = 2147483647; // = 2 ** 31 - 1

  this.next = function() {
    do {
      this.value = (this.value * factor) % dividend;
    } while (this.value % multiple !== 0);

    return this.value;
  }
}

const numPairs = (genA, genB, iterations) => {
  const mask = 2 ** 16 - 1;
  let numPairs = 0;

  for (let i = 0; i < iterations; i++) {
    if ((genA.next() & mask) === (genB.next() & mask)) {
      numPairs++;
    }
  }

  return numPairs;
}

const part1 = (startA, startB) => {
  const genA = new Generator(startA, 16807);
  const genB = new Generator(startB, 48271);
  return numPairs(genA, genB, 4e7);
}

const part2 = (startA, startB) => {
  const genA = new Generator(startA, 16807, 4);
  const genB = new Generator(startB, 48271, 8);
  return numPairs(genA, genB, 5e6);
}

console.log(part1(startA, startB));
console.log(part2(startA, startB));
