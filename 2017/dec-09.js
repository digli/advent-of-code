const input = document.body.textContent.trim();

function Group(parent) {
	this.parent = parent;
	this.children = [];

	this.getScore = function(level) {
		return level + this.children
			.map(c => c.getScore(level + 1))
			.reduce((a, b) => a + b, 0);
	}
}

const rootGroup = new Group(null);
let currentGroup = rootGroup;
let garbage = false;
let numGarbage = 0;

for (let i = 0; i < input.length; i++) {
	let c = input[i];

	if (garbage) {
		if (c === '!') {
			i++;
		} else if (c === '>') {
			garbage = false;
		} else {
			numGarbage++;
		}

		continue;
	}

	if (c === '<') {
		garbage = true;
		continue;
	}

	if (c === '{') {
		// nest one level
		const parent = currentGroup;
		currentGroup = new Group(parent);
		parent.children.push(currentGroup);
	}

	if (c === '}') {
		// un-nest one level
		currentGroup = currentGroup.parent;
	}
}

console.log(rootGroup.getScore(0));
console.log(numGarbage);
