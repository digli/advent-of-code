const input = document.body.textContent.trim();

const moves = {
  '^': cursor => { cursor.y++ },
  '>': cursor => { cursor.x++ },
  'v': cursor => { cursor.y-- },
  '<': cursor => { cursor.x-- },
};

const putPresent = (x, y, list) => {
  if (!list.some(pos => pos.x === x && pos.y === y))
    list.push({x, y});
}

const distinctPositions = (input, numSantas) => {
  const visitedPositions = [];

  const cursors = [];
  for (let i = 0; i < numSantas; i++) {
    cursors.push({x: 0, y: 0});
  }

  putPresent(0, 0, visitedPositions);
  for (let i = 0; i < input.length; i++) {
    const cursor = cursors[i % cursors.length];
    moves[input[i]](cursor);
    putPresent(cursor.x, cursor.y, visitedPositions);
  }

  return visitedPositions.length;
}

console.log(distinctPositions(input, 1)); // 2081
console.log(distinctPositions(input, 2)); // 2341
