'use strict';

// Game of pots

const input = document.body.textContent.trim().split('\n');
// const input = `initial state: #..#.#..##......###...###

// ...## => #
// ..#.. => #
// .#... => #
// .#.#. => #
// .#.## => #
// .##.. => #
// .#### => #
// #.#.# => #
// #.### => #
// ##.#. => #
// ##.## => #
// ###.. => #
// ###.# => #
// ####. => #`.trim().split('\n');

const initialState = input[0].slice('initial state: '.length);
const patterns = new Map();
input.slice(2)
    .map(line => line.split(' => '))
    .forEach(([ pattern, result ]) => patterns.set(pattern, result))

const countState = (state, zeroIndex) =>
    state.split('')
        .map((x, i) => x === '#' ? i - zeroIndex : 0)
        .reduce((a, b) => a + b, 0);

const game = (initialState, patterns, numIterations) => {
    const extraDots = Array(4).fill('.').join('');
    let prevState = initialState;
    let prevCount = 0;
    let prevDiff = 0;

    for (let i = 0; i < numIterations; i++) {
        prevState = extraDots + prevState + extraDots;
        let state = '';

        for (let x = 2; x < prevState.length - 2; x++) {
            const slice = prevState.substr(x - 2, 5);
            const match = patterns.get(slice);
            if (match) {
                state += match;
            } else {
                // console.log('Missing pattern', slice);
                state += '.';
            }
        }

        const stateCount = countState(state, extraDots.length / 2 * i);
        const diff = stateCount - prevCount;

        if (diff === prevDiff) {
            // We have stabilized!
            console.log({ stateCount, diff, numIterations, i });
            return stateCount + diff * (numIterations - i);
        }

        prevState = state;
        prevCount = stateCount;
        prevDiff = diff;
    }

    return countState(prevState, extraDots.length / 2 * numIterations);
}

console.log('The answer to puzzle 1 is', game(initialState, patterns, 20));
// Something is off and i cant tell what it is
console.log('The answer to puzzle 2 is not', game(initialState, patterns, 50000000000));
