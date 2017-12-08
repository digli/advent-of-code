const input = document.body.textContent.trim().split('\n');

function Register(name) {
  this.name = name;
  this.value = 0;
}

const registers = new Map();

const getRegister = (name) => {
  let register = registers.get(name);

  if (!register) {
    register = new Register(name);
    registers.set(name, register);
  }

  return register;
}

let highest = 0;

const runCommand = (row) => {
  const parts = row.split(' ');
  const register = getRegister(parts[0]);
  const multiplier = parts[1] === 'inc' ? 1 : -1;
  const value = Number(parts[2]) * multiplier;

  const expression = [getRegister(parts[4]).value, parts[5], parts[6]].join(' ');
  // hehehehehehehehe
  if (eval(expression)) {
    register.value += value;
  }

  highest = Math.max(highest, register.value);
}

input.forEach(runCommand);

const registerList = Array.from(registers.values());
console.log(Math.max(...registerList.map(x => x.value)));
console.log(highest);
