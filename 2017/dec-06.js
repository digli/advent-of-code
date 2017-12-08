const input = document.body.trim();

const toIntArray = (input) => input.split(/\s+/).map(Number);

const maxIndex = (memory) => memory.indexOf(Math.max(...memory));

const distribute = (memory) => {
  const index = maxIndex(memory);
  let val = memory[index];
  memory[index] = 0;

  for (let i = 1; i <= val; i++) {
    memory[(index + i) % memory.length]++;
  }
}

const loop = (input) => {
  const memory = toIntArray(input);
  const prevConfigs = new Map();
  let numIterations = 0;

  while (true) {
    distribute(memory);
    numIterations++;

    const config = memory.join('.');
    if (prevConfigs.has(config)) {
      const numCycles = numIterations - prevConfigs.get(config);
      return [numIterations, numCycles];
    }

    prevConfigs.set(config, numIterations);
  }
}

console.log(...loop(input));
