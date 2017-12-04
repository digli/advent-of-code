const input = document.body.textContent.trim().split('\n');

const mostCommonLetter = (input, column) => {
  const numRows = input.length;
  const letterCount = [];
  for (let i = 0; i < numRows; i++) {
    const letter = input[i][column];
    if (!letterCount[letter]) {
      letterCount[letter] = 1;
    } else {
      letterCount[letter]++;
    }
  }

  return Object.keys(letterCount).reduce((acc, x) => {
    return (letterCount[acc] > letterCount[x]) ? acc : x;
  });
}

const findMostCommonWord = (input) => {
  let result = '';

  for (let i = 0; i < input[0].length; i++) {
    result += mostCommonLetter(input, i);
  }

  return result;
} 

const leastCommonLetter = (input, column) => {
  const numRows = input.length;
  const letterCount = [];
  for (let i = 0; i < numRows; i++) {
    const letter = input[i][column];
    if (!letterCount[letter]) {
      letterCount[letter] = 1;
    } else {
      letterCount[letter]++;
    }
  }

  return Object.keys(letterCount).reduce((acc, x) => {
    return (letterCount[acc] < letterCount[x]) ? acc : x;
  });
}

const findLeastCommonWord = (input) => {
  let result = '';

  for (let i = 0; i < input[0].length; i++) {
    result += leastCommonLetter(input, i);
  }

  return result;
} 

console.log(findMostCommonWord(input)); // cyxeoccr
console.log(findLeastCommonWord(input)); // batwpask
