const input = document.body.textContent.trim();

const getFloor = (input) => {
  let currentFloor = 0;
  let basementFound = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      currentFloor += 1;
    } else {
      currentFloor -= 1;
    }

    if (!basementFound && currentFloor < 0) {
      basementFound = true;
      console.log('basement found at step ' + (i + 1));
    }
  }

  return currentFloor;
}

console.log(getFloor(input));
