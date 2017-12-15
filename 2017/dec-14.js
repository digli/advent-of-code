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

const knot = (lengths, iterations=64) => {
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
  const suffix = [17, 31, 73, 47, 23];
  const lengths = [...key].map(x => x.charCodeAt(0)).concat(suffix);
  const sequence = knot(lengths);
  const dense = denseHash(sequence);
  return toHex(dense);
}

const hexToBinary = (x) => {
  return [...x].map(y => parseInt(y, 16).toString(2).padStart(4, '0')).join('');
}

const binaryHashGrid = (input) => {
  return [...Array(128).keys()]
    .map(i => knotHash(`${input}-${i}`))
    .map(hexToBinary)
    .map(x => [...x]);
}

const buildRegion = (grid, x, y, n) => {
  if (!grid[y] || grid[y][x] !== '1')
    return;

  grid[y][x] = n;

  buildRegion(grid, x + 1, y, n);
  buildRegion(grid, x - 1, y, n);
  buildRegion(grid, x, y + 1, n);
  buildRegion(grid, x, y - 1, n);
}

const countRegions = (grid) => {
  let numRegions = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        buildRegion(grid, j, i, numRegions++);
      }
    }
  }

  return numRegions;
}

const part1 = (input) => {
  return binaryHashGrid(input)
    .map(x => x.filter(y => y === '1').length)
    .reduce((a, b) => a + b);
}

const part2 = (input) => {
  return countRegions(binaryHashGrid(input));
}

console.log(part1(input));
console.log(part2(input));
