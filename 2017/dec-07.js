const input = document.body.textContent.trim().split('\n');

function Node(name) {
  this.name = name;
  this.weight = 0;
  this.children = [];
  this.parent = null;

  this.checkChildren = function() {
    const childNodes = this.children.map(getNode);

    let weights = childNodes.map(c => c.checkChildren());
    if (weights.some(x => x != weights[0]))
      console.log(childNodes);

    this.totalWeight = this.weight + weights.reduce((a, b) => a + b, 0);
    return this.totalWeight;
  }
}

const nodes = new Map();

const getNode = (name) => {
  let node = nodes.get(name);

  if (!node) {
    node = new Node(name);
    nodes.set(name, node);
  }

  return node;
}

const addData = (row) => {
  const parts = row.split(/,?\s/);
  const name = parts[0];
  const weight = Number(parts[1].substring(1, parts[1].length - 1));

  const n = getNode(name);
  n.weight = weight;

  const children = parts.slice(3);
  children.forEach(child => {
    n.children.push(child);
    getNode(child).parent = n;
  });
}

input.forEach(addData);

const rootNode = Array.from(nodes.values()).find(node => node.parent === null);
console.log(rootNode.name);

rootNode.checkChildren();

// Dig through the console to find the answer ^)
// first logged array is the first failing link
// 341 - 8 = 333
