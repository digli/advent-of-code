const input = document.body.textContent.trim().split('\n');

const forbidden = ['ab', 'cd', 'pq', 'xy'];
const vowels = ['a', 'e', 'i', 'o', 'u'];

const noForbidden = (row) => {
  return !forbidden.some(x => row.match(x));
}

const isVowel = (letter) =>  {
  return vowels.some(x => x === letter);
}

const containsThreeVowels = (row) => {
  return row.split('').filter(isVowel).length >= 3;
}

const containsDouble = (row) => {
  return row.split('').some((x, i, arr) => x === arr[i + 1]);
}

const containsABA = (row) => {
  return row.split('').some((x, i, arr) => x === arr[i + 2]);
}

const containsPair = (row) => {
  const pairs = [];
  for (let i = 0; i < row.length - 1; i++) {
    const pair = row[i] + row[i + 1];

    if (pairs.filter(x => x.index < i - 1).some(x => x.pair === pair)) {
      return true;
    } else {
      pairs.push({pair, index: i});
    }
  }

  return false;
}

const numNiceStrings = (input) => {
  return input
    .filter(noForbidden)
    .filter(containsDouble)
    .filter(containsThreeVowels)
    .length;
}

const numNiceStrings2 = (input) => {
  return input
    .filter(containsABA)
    .filter(containsPair)
    .length;
}

console.log(numNiceStrings(input)); // 238
console.log(numNiceStrings2(input)); // 69
