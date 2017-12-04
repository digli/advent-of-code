const input = document.body.textContent.trim().split('\n');

const sortLetterMap = (a, b) => {
  if (a.count < b.count) return 1;
  if (a.count > b.count) return -1;

  return a.letter > b.letter ? 1 : -1;
}

const isRealRoom = (letters, checksum) => {
  const letterMap = [];

  letters.forEach(letter => {
    const entry = letterMap.find(x => x.letter === letter);

    if (entry) {
      entry.count++;
    } else {
      letterMap.push({ letter, count: 1 });
    }
  });

  letterMap.sort(sortLetterMap);
  return letterMap.slice(0, 5).map(x => x.letter).join('') === checksum;
}

const decryptLetter = (letter, shift) => {
  const min = 'a'.charCodeAt(0);
  const max = 'z'.charCodeAt(0) + 1;

  let value = letter.charCodeAt(0) + shift;
  value = ((value - min) % (max - min)) + min;
  return String.fromCharCode(value);
}

const decrypt = (word, shift) => {
  return word.split('').map(x => decryptLetter(x, shift)).join('');
}

const decipherRow = (row) => {
  const parts = row.split('-');
  const lastEntry = parts.pop();
  const checksum = lastEntry.match(/[a-z]{5}/)[0];
  const sectorId = Number(lastEntry.match(/[0-9]+/)[0]);
  const letters = parts.join('').split('');

  if (isRealRoom(letters, checksum)) {
    const decryptedSentence = parts.map(word => decrypt(word, sectorId)).join(' ');
    if (decryptedSentence.match(/north/))
      console.log(decryptedSentence, sectorId);

    return sectorId;
  }

  return 0;
}

console.log(input.map(decipherRow).reduce((a, b) => a + b));
