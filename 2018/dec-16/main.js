'use strict';

const input = document.body.textContent.trim().split('\n');

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

const validInstructions = (before, params, after, ignore = []) => {
    return Object.entries(instructions)
        .filter(([instruction]) => !ignore.includes(instruction))
        .map(([instruction, func])=> {
            const reg = [...before];
            func(reg, ...params.slice(1));
            if (String(reg) === String(after)) {
                return { instruction, value: params[0] };
            } else {
                return null;
            }
        })
        .filter(result => !!result);
}

const parseInput = (input) => {
    const tests = [];
    let pc = 0;

    while (input[pc]) {
        const before = JSON.parse(input[pc].substring('Before: '.length));
        const params = input[pc + 1].split(' ').map(Number);
        const after = JSON.parse(input[pc + 2].substring('After:  '.length));
        tests.push({ before, params, after });
        pc += 4;
    }

    const program = input.slice(pc)
        .filter(line => !!line)
        .map(line => line.split(' ').map(Number));

    return { tests, program };
}

const puzzleOne = (input) => {
    const { tests } = parseInput(input);

    return tests
        .map(({ before, params, after }) => validInstructions(before, params, after))
        .filter(x => x.length >= 3)
        .length;
}

const findInstructionMap = (tests) => {
    const imap = new Map();
    const found = [];

    while (imap.size !== Object.keys(instructions).length) {
        for (const { before, params, after } of tests) {
            if (imap.has(params[0])) {
                continue;
            }
            const valid = validInstructions(before, params, after, found);
            if (valid.length == 1) {
                const [{ instruction, value }] = valid;
                imap.set(value, instructions[instruction]);
                found.push(instruction);
            }
        }
    }

    return imap;
}

const puzzleTwo = (input) => {
    const { tests, program } = parseInput(input);
    const instructionMap = findInstructionMap(tests);

    const reg = [0, 0, 0, 0];
    for (const [instructionKey, a, b, c] of program) {
        const instr = instructionMap.get(instructionKey);
        instr(reg, a, b, c);
    }

    return reg[0];
}

console.log('The answer to puzzle 1 is', puzzleOne(input));
console.log('The answer to puzzle 1 is', puzzleTwo(input));
