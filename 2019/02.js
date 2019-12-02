const input = document.body.textContent.trim().split(',').map(Number);

const run = (input, noun, verb) => {
    const mem = [...input];
    mem[1] = noun;
    mem[2] = verb;

    for (let pc = 0; pc < mem.length; pc += 4) {
        const [instruction, a, b, c] = mem.slice(pc, pc + 4);

        switch (instruction) {
            case 99: return mem[0];
            case 1: {
                mem[c] = mem[a] + mem[b];
                break;
            }
            case 2: {
                mem[c] = mem[a] * mem[b];
                break;
            }
        }
    }

    throw 'finished without halting';
}

const findParams = (input, target) => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const result = run(input, noun, verb);
            if (result === target) {
                return noun * 100 + verb;
            }
        }
    }

    throw 'could not find params';
}

console.log(run(input, 12, 2));
console.log(findParams(input, 19690720));
