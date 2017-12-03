const input = 368078;

const manhattan = (point) => Math.abs(point.x) + Math.abs(point.y);

const sumAdjacent = (point, spiral) => {
	let sum = 0;
	for (let x = -1; x < 2; x++) {
		for (let y = -1; y < 2; y++) {
			if (spiral[point.y + y]) {
				sum += spiral[point.y + y][point.x + x] || 0;
			}
		}
	}

	return sum;
}

let firstLargerValue;

const getPosition = (input) => {
	let cursor = { x: 0, y: 0 };
	let currentSize = 1;
	let direction = 0;
	let index = 0;
	let everyOther = false;
	let spiral = [[1]];

	while (true) {
		for (let j = 1; j <= currentSize; j++) {
			switch (direction) {
				case 0: cursor.x++; break;
				case 1: cursor.y++; break;
				case 2: cursor.x--; break;
				case 3: cursor.y--; break;
			}

			if (index + j === input) {
				return manhattan(cursor);
			}

			if (!firstLargerValue) {
				if (!spiral[cursor.y]) {
					spiral[cursor.y] = [];
				}

				spiral[cursor.y][cursor.x] = sumAdjacent(cursor, spiral);

				if (spiral[cursor.y][cursor.x] > input) {
					firstLargerValue = spiral[cursor.y][cursor.x]
				}
			}
		}

		direction = (direction + 1) % 4;
		index += currentSize;
		if (everyOther) {
			currentSize++;
		}

		everyOther = !everyOther;
	}
}

console.log(getPosition(input)); // 371
console.log(firstLargerValue); // 369601
