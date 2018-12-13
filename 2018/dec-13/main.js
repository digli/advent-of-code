'use strict';

const input = document.body.textContent
    .split('\n')
    .map(line => line.split(''));

const DIRECTIONS = [
    'up',
    'right',
    'down',
    'left'
];

const modulo = (a, b) => ((a % b) + b) % b;

class Cart {
    constructor (x, y, char) {
        this.x = x;
        this.y = y;
        this.intersection = 0;
        this.direction = {
            '^': 'up',
            '>': 'right',
            'v': 'down',
            '<': 'left',
        }[char] || console.error('Invalid char', char);
    }

    turn () {
        this.direction = {
            0: DIRECTIONS.indexOf(this.direction) - 1, // left
            2: DIRECTIONS.indexOf(this.direction) + 1 // right
        }[this.direction] || this.direction;

        this.intersection = (this.intersection + 1) % 3;
    }

    move (grid) {
        switch (this.direction) {
            case 'up': {
                this.y -= 1;
                switch (grid[this.y][this.x]) {
                    case '/': this.direction = 'right'; return;
                    case '\\': this.direction = 'left'; return;
                    case '+': this.turn();
                    default: return;
                }
            }
            case 'right': {
                this.x += 1;
                switch (grid[this.y][this.x]) {
                    case '/': this.direction = 'up'; return;
                    case '\\': this.direction = 'down'; return;
                    case '+': this.turn();
                    default: return;
                }
            }
            case 'down': {
                this.y += 1;
                switch (grid[this.y][this.x]) {
                    case '/': this.direction = 'left'; return;
                    case '\\': this.direction = 'right'; return;
                    case '+': this.turn();
                    default: return;
                }
            }
            case 'left': {
                this.x -= 1;
                switch (grid[this.y][this.x]) {
                    case '/': this.direction = 'down'; return;
                    case '\\': this.direction = 'up'; return;
                    case '+': this.turn();
                    default: return;
                }
            }
        }
    }

    compareTo (other) {
        return (this.y - other.y) * 10000 + this.x - other.x
    }
}

const puzzleOne = (input) => {
    const carts = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const char = input[y][x];
            if (char.match(/\^|>|v|</)) {
                carts.push(new Cart(x, y, char));
            }
        }
    }


    for (;;) {
        carts.sort((a, b) => a.compareTo(b));

        for (const cart of carts) {
            cart.move(input);

            if (carts.some(c => c !== cart && c.compareTo(cart) === 0)) {
                return `collision at ${cart.x},${cart.y}`;
            }
        }
    }
}

// "collision at -209929,69" what
puzzleOne(input);
