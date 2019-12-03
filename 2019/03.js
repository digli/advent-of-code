const manhattan = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const execute = instructions => {
    const visitedCoordinates = new Map();
    let x = 0, y = 0, distanceTravelled = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const length = Number(instruction.slice(1));

        for (let i = 0; i < length; i++) {
            switch (direction) {
                case 'U': y -= 1; break;
                case 'R': x += 1; break;
                case 'D': y += 1; break;
                case 'L': x -= 1; break;
            }

            distanceTravelled += 1;
            const key = `${x}:${y}`;

            if (!visitedCoordinates.has(key)) {
                const point = { x, y, distanceTravelled };
                visitedCoordinates.set(key, point);
            }
        }
    }

    return visitedCoordinates;
}

const run = input => {
    const [path1, path2] = input.map(execute);
    const collisions = [];

    for (const [key, point] of path1) {
        if (path2.has(key)) {
            collisions.push(point);
        }
    }

    const origo = { x: 0, y: 0 };
    const minManhattan = collisions
        .map(point => manhattan(point, origo))
        .reduce((a, b) => Math.min(a, b), Infinity);

    const minDistanceTravelled = collisions
        .map(({ x, y }) => {
            const key = `${x}:${y}`;
            const d1 = path1.get(key).distanceTravelled;
            const d2 = path2.get(key).distanceTravelled;

            return d1 + d2;
        })
        .reduce((a, b) => Math.min(a, b), Infinity);

    return { minManhattan, minDistanceTravelled };
}

const input = document.body.textContent.split('\n').map(row => row.split(','));
// const testInput1 = ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'].map(x => x.split(','));
// const testInput2 = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'].map(x => x.split(','));

console.log(run(input));
// console.log(run(testInput1));
// console.log(run(testInput2));
