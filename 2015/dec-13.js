const input = document.body.textContent.trim().split('\n');

const mod = (a, b) => ((a % b) + b) % b;
const sum = (a, b) => a + b;

const happinessList = [];
const persons = [];

function Person(name) {
  this.name = name;
  this.points = [];

  this.happinessTowards = function(other) {
    return this.points[other.name] || 0;
  }
}

function getPerson(name) {
  let p = persons.find(x => x.name === name);

  if (!p) {
    p = new Person(name);
    persons.push(p);
  }

  return p;
}

const addData = (row) => {
  const parts = row.substring(0, row.length - 1).split(' ');
  const p1 = getPerson(parts[0]);
  const p2 = getPerson(parts[parts.length - 1]);
  const gain = parts[2] === 'gain' ? 1 : -1;
  p1.points[p2.name] = gain * Number(parts[3]);
}

const personHappiness = (person, i, seatings) => {
  const left = seatings[mod(i - 1, seatings.length)];
  const right = seatings[mod(i + 1, seatings.length)];

  return person.happinessTowards(left) + person.happinessTowards(right);
}

const totalHappiness = (person, seatings) => {
  seatings.push(person);

  if (seatings.length === persons.length) {
    happinessList.push(seatings.map(personHappiness).reduce(sum));
  }

  persons.forEach(p => {
    if (!seatings.some(x => x.name === p.name)) {
      totalHappiness(p, seatings.slice());
    }
  });
}

input.forEach(addData);
// for part 2:
persons.push(new Person('Ellan'));
persons.forEach(p => totalHappiness(p, []));

// Math.max(...hapinessList) causes `Uncaught RangeError: Maximum call stack size exceeded`
// What's wrong chrome, can't you handle 362880 arguments in a function call? :^)
console.log(happinessList.reduce((a, b) => Math.max(a, b)));
