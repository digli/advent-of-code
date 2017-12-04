const input = 'cqjxjnds';

const max = 'z'.charCodeAt(0) + 1;
const alphabetSize = max - 'a'.charCodeAt(0);

const incrementLetter = (letter) => {
  let c = letter.charCodeAt(0) + 1;
  if (c >= max) {
    c -= alphabetSize;
  }

  return String.fromCharCode(c);
}

const incrementPassword = (password) => {
  const letters = password.split('');
  let overflow = true;
  let index = letters.length - 1;

  while (overflow && index >= 0) {
    letters[index] = incrementLetter(letters[index]);
    if (letters[index] === 'a') {
      index--;
    } else {
      overflow = false;
    }
  }

  return letters.join('');
}

const containsTwoPairs = (password) => {
  let numPairs = 0;
  let firstPair = '';

  for (let i = 0; i < password.length; i++) {
    if (password[i] === password[i + 1] && password[i] !== firstPair) {
      firstPair = password[i];
      numPairs++;
      i++;
    }
  }

  return numPairs >= 2;
}

const containsSequence = (password) => {
  let charCodes = password.split('').map(x => x.charCodeAt(0));
  return charCodes.some((x, i) => x + 1 === charCodes[i + 1] && x + 2 === charCodes[i + 2]);
}

const noIllegals = (password) => {
  return !password.match(/i|l|o/);
}

const isValidPassword = (password) => {
  return noIllegals(password)
    && containsSequence(password)
    && containsTwoPairs(password);
}

const nextPassword = (password) => {
  do {
    password = incrementPassword(password)
  } while (!isValidPassword(password));

  return password;
}

console.log(nextPassword(input));
console.log(nextPassword(nextPassword(input)));
