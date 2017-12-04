const input = document.body.textContent.trim().split('\n');

const toWordArray = (row) => {
  return row.split(/\s+/);
}

const hasNoDuplicate = (words) => {
  return new Set(words).size == words.length;
}

const sortByAlphabet = (words) => {
  return words.map(x => x.split('').sort().join(''));
}

const numDistinct = (input) => {
  return input
    .map(toWordArray)
    .filter(hasNoDuplicate)
    .length;
}

const numIsograms = (input) => {
  return input
    .map(toWordArray)
    .map(sortByAlphabet)
    .filter(hasNoDuplicate)
    .length;
}

console.log(numDistinct(input)); // 455
console.log(numIsograms(input)); // 186
