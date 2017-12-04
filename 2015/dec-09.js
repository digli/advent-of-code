const input = document.body.textContent.trim().split('\n');

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
const routes = [];

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
  const distance = Number(parts[parts.length - 1]);
  c1.setDistance(c2, distance);
  c2.setDistance(c1, distance);
}

// travelling salesman :-))
const findPaths = (node, path, distance) => {
  if (path.length)
    distance += path[path.length - 1].distanceTo(node);

  path.push(node);

  if (cities.length === path.length) {
    routes.push(distance);
    return;
  }

  cities.forEach(city => {
    // Avoid re-visiting city twice
    if (!path.some(x => x.name === city.name)) {
      findPaths(city, path.slice(), distance);
    }
  });
}

input.map(addData);
findPaths(cities[0], [], 0);
console.log(Math.min(...routes)); // 117
console.log(Math.max(...routes)); // ?
