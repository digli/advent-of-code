const input = document.body.textContent.trim().split('\n');

const containsABBA = (s) => {
  for (let i = 0; i < s.length - 3; i++) {
    if (s[i + 1] + s[i] === s[i + 2] + s[i + 3] && s[i] !== s[i + 1])
      return true;
  }

  return false;
}

const findABAs = (s) => {
  const abas = [];
  for (let i = 0; i < s.length - 2; i++) {
    if (s[i] === s[i + 2] && s[i] !== s[i + 1])
      abas.push(s[i] + s[i + 1] + s[i]);
  }

  return abas;
}

const invertABA = (aba) => aba[1] + aba[0] + aba[1];
const hyperNetSequences = (row) => row.match(/\[[a-z]+\]/g);
const superNetSequences = (row) => row.split(/\[[a-z]+\]/);

const supportsTLS = (row) => {
  if (hyperNetSequences(row).find(containsABBA))
    return false;

  return superNetSequences(row).find(containsABBA);
}

const supportsSSL = (row) => {
  const babs = [];
  superNetSequences(row).forEach(sequence => {
    babs.push(...findABAs(sequence).map(invertABA));
  });

  return hyperNetSequences(row).some(sequence => {
    return babs.some(bab => ~ sequence.indexOf(bab));
  });
}

console.log(input.filter(supportsTLS).length); // 115
console.log(input.filter(supportsSSL).length); // 231
