const input = document.body.textContent.trim().split('\n');

function Layer(depth, range) {
  this.depth = depth;
  this.penalty = depth * range;

  let scanner = 0;
  let direction = 1;

  this.move = function() {
    scanner += direction;
    if (scanner >= range - 1) {
      direction = -1;
    } else if (scanner <= 0) {
      direction = 1;
    }
  }

  this.isBottom = function() {
    return scanner === 0;
  }
}

const setup = (firewall) => {
  // move each layer's scanner equal to its' depth to make linear search easier
  firewall.forEach(layer => {
    for (let i = 0; i < layer.depth; i++) {
      layer.move();
    }
  });
}

const buildGrid = (input) => {
  return input.map(row => new Layer(...row.split(': ').map(Number)));
}

const penalty = (firewall) => {
  return firewall
    .filter(x => x.isBottom())
    .map(x => x.penalty)
    .reduce((a, b) => a + b, 0);
}

const watitingTime = (firewall) => {
  let offset = 0;

  while (firewall.some(x => x.isBottom())) {
    firewall.forEach(layer => layer.move());
    offset++;
  }

  return offset;
}

const firewall = buildGrid(input);
setup(firewall);

console.log(penalty(firewall));
console.log(watitingTime(firewall));
