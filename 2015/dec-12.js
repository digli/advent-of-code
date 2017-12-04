const input = document.body.textContent.trim();

const sum = (a, b) => a + b;

const sumAllNumbers = (input) => {
  return input.match(/-?\d+/g)
    .map(Number)
    .reduce(sum);
}

const ignoreRedObjects = (obj) => {
  if (typeof obj === 'number')
    return obj

  if (typeof obj === 'string')
    return 0;

  if (Array.isArray(obj))
    return obj
      .map(ignoreRedObjects)
      .reduce(sum, 0);

  if (Object.values(obj).some(x => x === 'red'))
    return 0;

  return Object.values(obj)
    .map(ignoreRedObjects)
    .reduce(sum, 0);
}

console.log(sumAllNumbers(input));
console.log(ignoreRedObjects(JSON.parse(input)));
