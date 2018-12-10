'use strict';

const input = document.body.textContent.trim()
    .split('\n')
    .map(line =>
        line.match(/position=<(.*)> velocity=<(.*)>/)
            .slice(1,3)
            .map(x => x.split(',').map(x => Number(x.trim())))
            .map(([x, y]) => ({ x, y }))
        )
    .map(([ pos, vel ]) => ({ pos, vel }));

for (let i = 0; i < 1e6; i++) {
    for (const star of input) {
        star.pos.x += star.vel.x;
        star.pos.y += star.vel.y;
    }

    const maxY = Math.max(...input.map(({ pos: { y } }) => y));
    const minY = Math.min(...input.map(({ pos: { y } }) => y));
    
    const allStarsCloseTogether = maxY - minY < 20;

    if (allStarsCloseTogether) {
        const maxX = Math.max(...input.map(({ pos: { x } }) => x));
        const minX = Math.min(...input.map(({ pos: { x } }) => x));
        for (let y = minY; y <= maxY; y++) {
            const line = [];
            for (let x = minX; x <= maxX; x++) {
                if (input.some(({ pos }) => pos.x === x && pos.y === y)) {
                    line.push('#');
                } else {
                    line.push('.')
                }
            }
            console.log(line.join(''));
        }
        console.log(i + 1);
    }
}
