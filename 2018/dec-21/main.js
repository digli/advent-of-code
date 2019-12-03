
'use strict';

const fs = require('fs');

const instructions = {
  'addr': (reg, a, b, c) => reg[c] = reg[a] + reg[b],
  'addi': (reg, a, b, c) => reg[c] = reg[a] + b,
  'mulr': (reg, a, b, c) => reg[c] = reg[a] * reg[b],
  'muli': (reg, a, b, c) => reg[c] = reg[a] * b,
  'banr': (reg, a, b, c) => reg[c] = reg[a] & reg[b],
  'bani': (reg, a, b, c) => reg[c] = reg[a] & b,
  'borr': (reg, a, b, c) => reg[c] = reg[a] | reg[b],
  'bori': (reg, a, b, c) => reg[c] = reg[a] | b,
  'setr': (reg, a, b, c) => reg[c] = reg[a],
  'seti': (reg, a, b, c) => reg[c] = a,
  'gtir': (reg, a, b, c) => reg[c] = a > reg[b] ? 1 : 0,
  'gtri': (reg, a, b, c) => reg[c] = reg[a] > b ? 1 : 0,
  'gtrr': (reg, a, b, c) => reg[c] = reg[a] > reg[b] ? 1 : 0,
  'eqir': (reg, a, b, c) => reg[c] = a === reg[b] ? 1 : 0,
  'eqri': (reg, a, b, c) => reg[c] = reg[a] === b ? 1 : 0,
  'eqrr': (reg, a, b, c) => reg[c] = reg[a] === reg[b] ? 1 : 0,
};

const parseInstructions = (input) => {
  const [ first, ...rest ] = input;

  const ip = Number(first.substring('#ip '.length));
  const program = rest
    .map(line => line.split(' '))
    .map(([ op, ...params ]) => ({
      op: instructions[op],
      params: params.map(Number)
    }));

  return { ip, program };
};

const runProgram = (input, initialState, maxIterations) => {
  const { ip, program } = parseInstructions(input);
  const reg = [...initialState];
  let iteration = 0;

  while (0 <= reg[ip] && reg[ip] < program.length) {
    const { op, params } = program[reg[ip]];
    op(reg, ...params);

    reg[ip] += 1;

    if (++iteration > maxIterations) {
      throw new Error('Nope');
    }
  }

  return reg;
};

const puzzle = (filename) => {
  const input = String(fs.readFileSync(filename)).trim().split('\n');

  for (let startValue = 0; ; startValue++) {
    try {
      const result = runProgram(input, [startValue, 0, 0, 0, 0, 0], 1e3);
      console.log(result);
    } catch (err) {
    }
  }
}

console.log(puzzle('input.txt'));
