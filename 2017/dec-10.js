const input = document.body.textContent.trim();

const reverse = (list, index, num) => {
  const len = list.length;
  const copy = list.slice(index, Math.min(index + num, len))
    .concat(list.slice(0, Math.max(0, index + num - len)))
    .reverse();

  for (let i = 0; i < num; i++) {
    list[(index + i) % len] = copy[i];
  }
}

const knot = (lengths, iterations) => {
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

const part1 = (input) => {
  const lengths = input.split(',').map(Number);
  const sequence = knot(lengths, 1);

  return sequence[0] * sequence[1];
}

const part2 = (input) => {
  const suffix = [17, 31, 73, 47, 23];

  const lengths = [...input].map(x => x.charCodeAt(0))
    .concat(suffix);

  const sequence = knot(lengths, 64);
  const dense = denseHash(sequence);

  return toHex(dense);
}

console.log(part1(input));
console.log(part2(input));
