const input = [
  'Faerun to Tristram = 65',
  'Faerun to Tambi = 129',
  'Faerun to Norrath = 144',
  'Faerun to Snowdin = 71',
  'Faerun to Straylight = 137',
  'Faerun to AlphaCentauri = 3',
  'Faerun to Arbre = 149',
  'Tristram to Tambi = 63',
  'Tristram to Norrath = 4',
  'Tristram to Snowdin = 105',
  'Tristram to Straylight = 125',
  'Tristram to AlphaCentauri = 55',
  'Tristram to Arbre = 14',
  'Tambi to Norrath = 68',
  'Tambi to Snowdin = 52',
  'Tambi to Straylight = 65',
  'Tambi to AlphaCentauri = 22',
  'Tambi to Arbre = 143',
  'Norrath to Snowdin = 8',
  'Norrath to Straylight = 23',
  'Norrath to AlphaCentauri = 136',
  'Norrath to Arbre = 115',
  'Snowdin to Straylight = 101',
  'Snowdin to AlphaCentauri = 84',
  'Snowdin to Arbre = 96',
  'Straylight to AlphaCentauri = 107',
  'Straylight to Arbre = 14',
  'AlphaCentauri to Arbre = 46',
];

// travelling salesman :-))

function City(name) {
  this.name = name;
  this.distances = [];

  this.distanceTo = function(other) {
    return this.distances[other.name];
  }

  this.setDistance = function(other, distance) {
    this.distances[other.name] = distance;
  }
}

const cities = [];

const addCity = (name) => {
  let city = cities.find(x => x.name === name);
  if (!city) {
    city = new City(name);
    cities.push(city);
  }

  return city;
}

const addData = (row) => {
  const parts = row.split(' ');
  const c1 = addCity(parts[0]);
  const c2 = addCity(parts[2]);
  const distance = Number(parts.pop());
  c1.setDistance(c2, distance);
  c2.setDistance(c1, distance);
}

input.map(addData);

let minDistance = Infinity;
const routes = [];

const findPaths = (node, path, distance) => {
  if (path.length)
    distance += path[path.length - 1].distanceTo(node);

  path.push(node);

  if (cities.length === path.length) {
    routes.push(distance);
    return;
  }

  cities.forEach(city => {
    if (!path.some(x => x.name == city.name))
      findPaths(city, path.slice(), distance);
  });
}

findPaths(cities[0], [], 0);
console.log(Math.min(...routes)); // 117
console.log(Math.max(...routes)); // Why do i only get 7! results, not 8! ??
