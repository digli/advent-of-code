const input = document.body.textContent.trim().split('\n');

const program = (id, pipes) => ({ id, pipes });

const buildGraph = (input) => {
  const graph = input.map(row => {
    const parts = row.split(/,?\s/);
    const id = Number(parts[0]);
    const pipes = parts.slice(2).map(Number);
    return program(id, pipes);
  });

  return graph;
}

const findConnected = (id, graph, checked) => {
  if (checked.has(id))
    return;

  checked.add(id);
  graph.find(x => x.id === id)
    .pipes
    .forEach(x => findConnected(x, graph, checked));
}

const numConnected = (input, id) => {
  const graph = buildGraph(input);
  const checked = new Set();
  findConnected(id, graph, checked);
  return checked.size;
}

const totalNumGroups = (input) => {
  const graph = buildGraph(input);
  const checked = new Set();
  let numGroups = 0;

  for (let i = 0; i < graph.length; i++) {
    if (!checked.has(i)) {
      findConnected(i, graph, checked);
      numGroups++;
    }
  }

  return numGroups;
}

console.log(numConnected(input, 0));
console.log(totalNumGroups(input));
