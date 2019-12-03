const input = document.body.textContent.split('\n').map(row => row.split(','));

const manhattan = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const run = (input) => {
    const visitedCoordinates = new Map();
    const collisions = [];

    for (const row of input) {
        let x = 0, y = 0;

        for (const instruction of row) {
            const direction = instruction[0];
            const length = Number(instruction.slice(1));

            for (let i = 0; i < length; i++) {
                switch (direction) {
                    case 'U': y -= 1; break;
                    case 'R': x += 1; break;
                    case 'D': y += 1; break;
                    case 'L': x -= 1; break;
                }

                const key = `${x}:${y}`;
                const point = { x, y };

                if (visitedCoordinates.has(key)) {
                    collisions.push(point);
                } else {
                    visitedCoordinates.set(key, point);
                }
            }
        }
    }

    const origo = { x: 0, y: 0 };
    const min = collisions.map(point => manhattan(point, origo)).reduce(Math.min, Infinity);

    return min;
}

console.log(run(input));
