const input = document.body.textContent.trim().split('\n');

const sum = (a, b) => a + b;

function Display(size=1000) {
  const decipher = (s) => s.split(',').map(Number);
  const grid = Array(size).fill().map(x => Array(size).fill(0));
  
  function turnOn(start, end) {
    const [x1, y1] = decipher(start);
    const [x2, y2] = decipher(end);

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        grid[i][j] = 1;
      }
    }
  }

  function turnOff(start, end) {
    const [x1, y1] = decipher(start);
    const [x2, y2] = decipher(end);

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        grid[i][j] = 0;
      }
    }
  }

  function toggle(start, end) {
    const [x1, y1] = decipher(start);
    const [x2, y2] = decipher(end);

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        grid[i][j] ^= 1;
      }
    }
  }

  function numLightsOn() {
    return grid.map(row => row.reduce(sum)).reduce(sum);
  }

  return {
    turnOn,
    turnOff,
    toggle,
    numLightsOn,
  }
}


function Display2(size=1000) {
  const decipher = (s) => s.split(',').map(Number);
  const grid = Array(size).fill().map(x => Array(size).fill(0));
  
  function turnOn(start, end) {
    const [x1, y1] = decipher(start);
    const [x2, y2] = decipher(end);

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        grid[i][j] += 1;
      }
    }
  }

  function turnOff(start, end) {
    const [x1, y1] = decipher(start);
    const [x2, y2] = decipher(end);

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        grid[i][j] = Math.max(grid[i][j] - 1, 0);
      }
    }
  }

  function toggle(start, end) {
    const [x1, y1] = decipher(start);
    const [x2, y2] = decipher(end);

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        grid[i][j] += 2;
      }
    }
  }

  function brightness() {
    return grid.map(row => row.reduce(sum)).reduce(sum);
  }

  return {
    turnOn,
    turnOff,
    toggle,
    brightness,
  }
}

const readCommand = (row, display) => {
  const parts = row.split(' ');
  if (parts[0] === 'toggle') {
    display.toggle(parts[1], parts[3])
  } else {
    if (parts[1] === 'on') {
      display.turnOn(parts[2], parts[4])
    } else {
      display.turnOff(parts[2], parts[4]);
    }
  }
}

const numLightsOn = (input) => {
  const display = Display();
  input.forEach(row => readCommand(row, display));
  return display.numLightsOn();
}

const brightness = (input) => {
  const display = Display2();
  input.forEach(row => readCommand(row, display));
  return display.brightness();
}

console.log(numLightsOn(input)); // 377891
console.log(brightness(input)); // 14110788
