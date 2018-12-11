const input = 9221;
const size = 300;

const hundredValue = x => Math.floor(x / 100 % 10);
const sum = (a, b) => a + b;

const buildGrid = (input) => {
    const grid = [];
    for (let y = 1; y <= size; y++) {
        const row = [];
        for (let x = 1; x <= size; x ++) {
            let rackId = x + 10;
            let value = hundredValue((rackId * y + input) * rackId) - 5;
            row.push(value);
        }
        grid.push(row);
    }

    return grid;
};

const maxPower = (grid, gridSize) => {
    let maxX = 0;
    let maxY = 0;
    let maxValue = 0;

    for (let y = 0; y < grid.length - (gridSize - 1); y++) {
        for (let x = 0; x < grid[y].length - (gridSize - 1); x++) {
            const value = grid.slice(y, y + gridSize)
                .map(row => row.slice(x, x + gridSize).reduce(sum, 0))
                .reduce(sum, 0);

            if (value > maxValue) {
                maxValue = value;
                maxX = x + 1;
                maxY = y + 1;
            }
        }
    }

    return {
        value: maxValue,
        position: `${maxX},${maxY}`
    };
}

const puzzleOne = (input) => {
    const grid = buildGrid(input);
    return maxPower(grid, 3).position;
};

const puzzleTwo = (input) => {
    const grid = buildGrid(input);

    let maxValue = 0;
    let maxPos;

    for (let i = 1; i < size; i++) {
        const { value, position } = maxPower(grid, i);
        if (value > maxValue) {
            maxValue = value;
            maxPos = position + ',' + i;
        }

        // This is not very efficient, but you can just
        // kill -9 the process when maxPos stabilizes :^)
        console.log('running at size', i);
        console.log('max so far is', maxPos);
    }

    return maxPos;
};

console.log('The answer to puzzle 1 is', puzzleOne(input));
console.log('The answer to puzzle 2 is', puzzleTwo(input));
