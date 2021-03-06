'use strict';

const input = 320851;
const testInput = 9;
const initialState = [3, 7];

// :^)
const splitSum = (value) => String(value).split('').map(Number);

const getScore = (initialState, numRecipies) => {
    const state = [...initialState];
    const elfPos = [...Array(initialState.length).keys()];

    while (state.length < numRecipies + 10) {
        const sum = elfPos.map(pos => state[pos])
            .reduce((a, b) => a + b);

        state.push(...splitSum(sum));
        for (let i = 0; i < elfPos.length; i++) {
            elfPos[i] += state[elfPos[i]] + 1;
            elfPos[i] %= state.length;
        }
    }

    return state.slice(numRecipies, numRecipies + 10).join('');
}

const getIterations = (initialState, recipe) => {
    const state = [...initialState];
    const elfPos = [...Array(initialState.length).keys()];

    for (;;) {
        const sum = elfPos.map(pos => state[pos])
            .reduce((a, b) => a + b);

        state.push(...splitSum(sum));
        for (let i = 0; i < elfPos.length; i++) {
            elfPos[i] += state[elfPos[i]] + 1;
            elfPos[i] %= state.length;
        }

        const foundRecipe = state.slice(state.length - (recipe.length + 2)).join('')
            .includes(recipe);
        if (foundRecipe) {
            return (
                state.slice(state.length - (recipe.length + 1)).join('') === recipe
                    ? state.length - recipe.length
                    : state.length - recipe.length - 1
            )
        }

    }
}

console.log('The answer to puzzle 1 is', getScore(initialState, input));
console.log('The answer to puzzle 2 is', getIterations(initialState, String(input)));
