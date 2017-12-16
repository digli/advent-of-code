const input = document.body.textContent.trim().split(',');

const exchange = (list, a, b) => {
  [list[a], list[b]] = [list[b], list[a]];
}

const partner = (list, a, b) => {
  exchange(list, ...[a, b].map(x => list.indexOf(x)));
}

const spin = (list, n) => {
  list.unshift(...list.splice(-n));
}

const getDancers = () => {
  return [...Array(16).keys()]
    .map(x => String.fromCharCode(x + 'a'.charCodeAt(0)));
}

const moves = {
  s: (list, params) => spin(list, Number(params)),
  x: (list, params) => exchange(list, ...params.split('/').map(Number)),
  p: (list, params) => partner(list, ...params.split('/')),
}

const dance = (dancers, input) => {
  input.forEach(command => {
    const params = command.substring(1);
    moves[command[0]](dancers, params);
  });

  return dancers;
}

const part1 = (input) => {
  return dance(getDancers(), input).join('');
}

const part2 = (input) => {
  const dancers = getDancers();
  const permutations = [dancers.join('')];
  const numDances = 1e9;

  for (let i = 0; i < numDances; i++) {
    const pos = dance(dancers, input).join('');

    if (~ permutations.indexOf(pos)) {
      // black magic off-by-one fix
      const loopSize = i + 1;
      return permutations[numDances % loopSize];
    }

    permutations.push(pos);
  }

  return dancers.join('');
}

console.log(part1(input));
console.log(part2(input));
