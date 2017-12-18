const input = document.body.textContent.trim().split('\n');
const registers = new Map();

const commands = {
  snd: (x) => { x.snd() }, // snd X plays a sound with a frequency equal to the value of X.
  rcv: (x) => { x.rcv() }, // rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
  set: (x, y) => { x.value = y.value }, // set X Y sets register X to the value of Y.
  add: (x, y) => { x.value += y.value }, // add X Y increases register X by the value of Y.
  mul: (x, y) => { x.value *= y.value }, // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
  mod: (x, y) => { x.value %= y.value }, // mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
}

function SoundRegister(value) {
  this.value = value || 0;
  this.lastSound = 0;

  this.rcv = function() {
    if (this.value !== 0 && this.lastSound !== 0) {
      this.value = this.lastSound;
      // why bother with additional checks when you can just throw it all
      throw this.value;
    }
  }

  this.snd = function() {
    this.lastSound = this.value;
  }
}

function Register(value) {
  this.value = value || 0;

  // recieve
  this.rcv = function() {
  }

  // send
  this.snd = function() {
  }
}

const getRegister = (name) => {
  if (!isNaN(Number(name))) {
    // constant value
    return new Register(Number(name));
  }

  let reg = registers.get(name);

  if (!reg) {
    reg = new Register();
    registers.set(name, reg);
  }

  return reg;
}

const run = (input) => {
  let pc = 0;

  while (pc >= 0 && pc < input.length) {
    let parts = input[pc].split(' ');
    const params = parts.slice(1).map(getRegister);

    if (parts[0] === 'jgz') {
      if (params[0].value > 0) {
        pc += params[1].value;
        continue;
      }
    } else {
      const command = commands[parts[0]];
      command(...params);
    }

    pc++;
  }
}

run(input);
