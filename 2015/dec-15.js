const input = document.body.textContent.trim().split('\n');

const values = (row) => {
  return row.match(/-?\d/g).map(Number);
}

const stripCalories = (ingredients) => {
  return ingredients.slice(0, 4);
}

const score = (recipe) => {
  let sums = [0, 0, 0, 0];

  for (let i = 0; i < recipe.length; i++) {
    for (let j = 0; j < sums.length; j++) {
      sums[j] += recipe[i][j];
    }
  }

  return sums.reduce((a, b) => a * b);
}

const maxScore = (input) => {
  const ingredients = input.map(values).map(stripCalories);
  // start with one of each
  const recipe = ingredients.slice();

  for (let i = recipe.length; i < 100; i++) {
    let max = -Infinity;
    let maxIndex = 0;

    for (let j = 0; j < ingredients.length; j++) {
      let s = score(recipe.concat([ingredients[j]]));
      if (s > max) {
        max = s;
        maxIndex = j;
      }
    }

    recipe.push(ingredients[maxIndex]);
  }

  return score(recipe);
}


console.log(maxScore(input));

// Up next: limit to exactly 500 calories
// http://adventofcode.com/2015/day/15
