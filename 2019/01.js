
const input = document.body.textContent.trim().split('\n').map(Number);

const fuelRequired = mass => {
    let fuel = mass / 3
    fuel = Math.floor(fuel)
    fuel = fuel - 2
    return fuel;
}

const recursiveFuelRequired = mass => {
    let fuel = 0;
    let current = fuelRequired(mass);
    while (current > 0) {
        fuel += current;
        current = fuelRequired(current);
    }

    return fuel;
}

const sum = input.map(fuelRequired).reduce((a, b) => a + b);
console.log(sum);

const recSum = input.map(recursiveFuelRequired).reduce((a, b) => a + b);
console.log(recSum);
