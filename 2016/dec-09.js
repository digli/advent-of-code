const input = document.body.textContent.trim();

const decompress = (input) => {
  let decompressed = '';
  let prevIndex = 0;
  let currentMarker = 0;

  while (currentMarker < input.length) {
    while (input[currentMarker] !== '(') {
      currentMarker += 1;

      if (currentMarker >= input.length) {
        // Add last part of message
        decompressed += input.substring(prevIndex);
        return decompressed;
      }
    } 

    // add previous to decompressed
    decompressed += input.substring(prevIndex, currentMarker);
    // skip '('
    currentMarker += 1;

    let params = '';
    while (input[currentMarker] !== ')') {
      params += input[currentMarker];
      currentMarker += 1;
    }

    // skip ')'
    currentMarker += 1;

    const [numCharacters, numRepeats] = params.split('x').map(Number);
    const decryptSequence = input.substr(currentMarker, numCharacters);

    for (let i = 0; i < numRepeats; i++) {
      decompressed += decryptSequence;
    }

    currentMarker += numCharacters;
    prevIndex = currentMarker;
  }

  return decompressed;
}

console.log(decompress(input).length); // 123908

const decompressionSize = (input) => {
  let decompressed = 0;
  let prevIndex = 0;
  let currentMarker = 0;

  while (currentMarker < input.length) {
    while (input[currentMarker] !== '(') {
      currentMarker += 1;

      if (currentMarker >= input.length) {
        // Add last part of message
        decompressed += currentMarker - prevIndex;
        return decompressed;
      }
    }

    decompressed += currentMarker - prevIndex;
    // skip '('
    currentMarker += 1;

    let params = '';
    while (input[currentMarker] !== ')') {
      params += input[currentMarker];
      currentMarker += 1;
    }

    // skip ')'
    currentMarker += 1;

    const [numCharacters, numRepeats] = params.split('x').map(Number);
    const decryptSequence = input.substr(currentMarker, numCharacters);

    decompressed += decompressionSize(decryptSequence) * numRepeats;

    currentMarker += numCharacters;
    prevIndex = currentMarker;
  }

  return decompressed;
}

console.log(decompressionSize(input)); // 10755693147
