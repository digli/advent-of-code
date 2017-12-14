const input = 'uugsqrei';

const reverse = (list, index, num) => {
  const len = list.length;
  const copy = list.slice(index, Math.min(index + num, len))
    .concat(list.slice(0, Math.max(0, index + num - len)))
    .reverse();

  for (let i = 0; i < num; i++) {
    list[(index + i) % len] = copy[i];
  }
}

const knot = (lengths, iterations=1) => {
  const sequence = [...Array(256).keys()];
  let index = 0;
  let skipSize = 0;

  for (let i = 0; i < iterations; i++) {
    lengths.forEach(x => {
      reverse(sequence, index, x);
      index += x + skipSize++;
      index %= sequence.length;
    });
  }

  return sequence;
}

const denseHash = (sequence) => {
  const blockSize = 16;

  return Array(blockSize).fill()
    .map((x, i) => sequence
      .slice(i * blockSize, (i + 1) * blockSize)
      .reduce((a, b) => a ^ b)
    );
}

const toHex = (sequence) => {
  return sequence.map(x => x.toString(16).padStart(2, '0')).join('');
}

const knotHash = (key) => {
  // sorry all eye users
  return toHex(denseHash(knot([...key].map(x => x.charCodeAt(0)))));
}

const hexToBinary = (x) => {
  return [...x].map(y => parseInt(y, 16).toString(2).padStart(4, '0')).join('');
}

const part1 = (input) => {
  const grid = [];

  for (let i = 0; i < 128; i++) {
    const hash = knotHash(`${input}-${i}`);
    grid[i] = hexToBinary(hash);
  }

  console.log(grid);
  console.log(grid.map(x => [...x].filter(y => y === '1').length));

  return grid.map(x => [...x].filter(y => y === '1').length)
    .reduce((a, b) => a + b);
}


console.log(part1(input));
console.log(part1('flqrgnkx'));
