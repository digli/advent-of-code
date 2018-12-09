'use strict';

const node = (value) => ({ value, prev: null, next: null });

function CircularLinkedList () {
    this.head = null;
    this.current = null;

    this.toString = () => {
        let n = this.head;
        const values = [];
        do {
            values.push(
                n === this.current
                    ? '(' + n.value + ')'
                    : n.value
            );
            n = n.next;
        } while (n != this.head);

        return values.join(', ')
    }

    this.insertAtPosition = (value) => {
        if (!this.current) {
            const n = node(value);
            n.next = n;
            n.prev = n;
            this.head = this.current = n;
        } else {
            const n = node(value);
            n.next = this.current.next;
            n.prev = this.current;
            n.next.prev = n;
            this.current.next = n;
            this.current = n;
        }
    }

    this.removeAtPosition = () => {
        if (this.current === this.head) {
            this.head = this.current.next;
        }
        const { value, next, prev } = this.current;
        next.prev = prev;
        prev.next = next;
        this.current = next;
        return value;
    }

    this.forwards = (steps) => {
        for (let i = 0; i < steps; i++) {
            this.current = this.current.next;
        }
    }

    this.backwards = (steps) => {
        for (let i = 0; i < steps; i++) {
            this.current = this.current.prev;
        }
    }
}

const highscore = (numPlayers, lastMarble) => {
    const playerScore = Array(numPlayers).fill(0);
    const circle = new CircularLinkedList();
    circle.insertAtPosition(0);

    for (let currentMarble = 1; currentMarble <= lastMarble; currentMarble++) {
        if (currentMarble > 0 && currentMarble % 23 === 0) {
            const currentPlayerIndex = currentMarble % numPlayers;
            circle.backwards(7);
            playerScore[currentPlayerIndex] += currentMarble + circle.removeAtPosition();
        } else {
            circle.forwards(1);
            circle.insertAtPosition(currentMarble);
        }
    }

    return Math.max(...playerScore);
}

console.log('The answer to puzzle 2 is', highscore(476, 71431 * 100));
