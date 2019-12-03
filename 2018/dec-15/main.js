'use strict';

const fs = require('fs');

class Node {
  constructor(x, y, prev, cost) {
    this.x = x;
    this.y = y;
    this.id = x + ',' + y;
    this.prev = prev;
    this.cost = cost;
  }
}

class Entity {
  constructor (x, y, faction, hp = 200) {
    this.x = x;
    this.y = y;
    this.faction = faction;
    this.hp = hp;
  }

  compareTo({ x, y }) {
    return y - this.y * 1000 + x - this.x;
  }

  isValidMove (grid, x, y, friends) {
    return grid[y][x] !== '#' && friends.every(f => f.compareTo({ x, y }) !== 0);
  }

  isAdjacentTo ({ x, y }) {
    return (
      (Math.abs(this.x - x) === 1 && this.y === y) ||
      (this.x === x && Math.abs(this.y - y) === 1)
    );
  }

  update (grid, entities) {
    const enemies = entities.filter(e => e.faction !== this.faction)
      .sort(enemy => this.compareTo(enemy));

    const adjacentEnemy = enemies.find(enemy => this.adjacentTo(enemy));
    if (adjacentEnemy) {
      this.attack(adjacentEnemy);
    } else {
      this.pathFind(grid, entities);
    }
  }

  move (grid, entities) {
    const friends = entities.filter(e => e.faction === this.faction);
    const enemies = entities.filter(e => e.faction !== this.faction);
    const queue = [new Node(this.x, this.y, null, 0)];
    const visited = new Set();
  
    const addIfValid = (node) => {
      const { x, y, id } = node;
      if (this.isValidMove(grid, x, y, friends) && !visited.has(id)) {
        visited.add(id);
        queue.push(node);
      }
    }
  
    do {
      const current = queue.shift();
  
      if (enemies.some(enemy => enemy.compareTo(current) === 0)) {
        // found our direction
        let firstMove = current;
        while (firstMove.prev !== this) {
          firstMove = firstMove.prev;
        }

        this.x = firstMove.x;
        this.y = firstMove.y;
        return;
      }
  
      const { x, y, cost } = current;
  
      addIfValid(new Node(x,     y - 1, current, cost + 1));
      addIfValid(new Node(x - 1, y,     current, cost + 1));
      addIfValid(new Node(x + 1, y,     current, cost + 1));
      addIfValid(new Node(x,     y + 1, current, cost + 1));
    } while (queue.length > 0);
  
    throw new Error('Cant find path to target');
  };
}

const factionMap = {
  'E': 'elf',
  'G': 'goblin'
};

const parseInput = (filename) => {
  const entities = [];
  const grid = String(fs.readFileSync(filename))
    .split('\n')
    .map((line, y) =>
      line.split('')
        .map((char, x) => {
          switch (char) {
            case 'E':
            case 'G': {
              entities.push(new Entity(x, y, factionMap[char]));
              return '.';
            }
            default: {
              return char;
            }
          }
        })
    );

  return { grid, entities };
};

const puzzle = (filename) => {
  const { grid, entities } = parseInput(filename);

  for (const entity of entities) {
    entity.update(grid, entities);
  }
}
