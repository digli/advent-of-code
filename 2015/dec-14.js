const input = document.body.textContent.trim().split('\n');

function Horse(name, velocity, uptime, rest) {
  let distance = 0;
  let points = 0;
  let fullCycle = uptime + rest;

  const update = (iteration) => {
    if (iteration % fullCycle < uptime) {
      distance += velocity;
    }
  }

  const score = () => {
    points++;
  }

  const getPoints = () => {
    return points;
  }

  const distanceTraveled = () => {
    return distance;
  }

  return {
    name,
    update,
    score,
    getPoints,
    distanceTraveled,
  }
}

const toHorse = (row) => {
  const parts = row.split(' ');
  const name = parts[0];
  const velocity = Number(parts[3]);
  const uptime = Number(parts[6]);
  const rest = Number(parts[parts.length - 2]);
  return new Horse(name, velocity, uptime, rest);
}

const race = (seconds) => {
  const horses = input.map(toHorse);

  for (let i = 0; i < seconds; i++) {
    horses.forEach(h => h.update(i));
  }

  return horses.reduce((a, b) => Math.max(a, b.distanceTraveled()), 0);
}

const race2 = (seconds) => {
  const horses = input.map(toHorse);

  for (let i = 0; i < seconds; i++) {
    horses.forEach(h => h.update(i));
    let currentMax = horses.reduce((a, b) => Math.max(a, b.distanceTraveled()), 0);
    horses.filter(h => h.distanceTraveled() === currentMax).forEach(h => h.score());
  }

  return horses.reduce((a, b) => Math.max(a, b.getPoints()), 0);
}

console.log(race(2503));
console.log(race2(2503));
