const input = '1113122113';

let next = input;

for (let i = 0; i < 50; i++) {
  let current = next;
  next = '';

  for (let j = 0; j < current.length; j++) {
    let numOccurances = 1;
    while (current[j] === current[j + 1]) {
      numOccurances++;
      j++;
    }

    next += numOccurances + current[j];
  }
}

console.log(next.length);
