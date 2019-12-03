'use strict';

const fs = require('fs');
const input = String(fs.readFileSync('input.txt')).trim();

const tests = [
    { input: '^WNE$', answer: 3 },
    { input: '^ENWWW(NEEE|SSE(EE|N))$', answer: 10 },
    { input: '^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$', answer: 18 },
    { input: '^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$', answer: 23 },
    { input: '^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$', answer: 31 }
];

class Room {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.id = x + ',' + y;
    }

    addNeighbor (other) {
        switch ([other.x - this.x, other.y - this.y].join(',')) {
            case '-1,0': {
                this.west = other;
                other.east = this;
                break;
            }
            case '1,0': {
                this.east = other;
                other.west = this;
                break;
            }
            case '0,1': {
                this.south = other;
                other.north = this;
                break;
            }
            case '0,-1': {
                this.north = other;
                other.south = this;
                break;
            }
            default: {
                throw new Error('pls');
            }
        }
    }
}

const getOrCreateRoom = (rooms, currentRoom, x, y) => {
    let room = rooms.get(x + ',' + y) || new Room(x, y);

    room.addNeighbor(currentRoom);
    return room;
}

const branch = (directions, offset, rooms, origin) => {
    let currentRoom = origin;

    for (let i = offset; i < directions.length; i++) {
        switch (directions[i]) {
            case 'N': {
                currentRoom = getOrCreateRoom(rooms, currentRoom, currentRoom.x, currentRoom.y - 1);
                break;
            }
            case 'E': {
                currentRoom = getOrCreateRoom(rooms, currentRoom, currentRoom.x + 1, currentRoom.y);
                break;
            }
            case 'S': {
                currentRoom = getOrCreateRoom(rooms, currentRoom, currentRoom.x, currentRoom.y + 1);
                break;
            }
            case 'W': {
                currentRoom = getOrCreateRoom(rooms, currentRoom, currentRoom.x - 1, currentRoom.y);
                break;
            }
            case '(': {
                const offset = branch(directions, i + 1, rooms, currentRoom);

                i = offset;
                break;
            }
            case ')': {
                return i;
            }
            case '|': {
                currentRoom = origin;
            }
        }
    }

    return directions.length;
}

const buildMap = (input) => {
    const directions = input.trim().substring(1, input.length - 1);
    const rooms = new Map();
    const start = new Room(0, 0);

    rooms.set(start.id, start);
    branch(directions, 0, rooms, start);
    return start;
}

/*
const drawMap = (start, offset) => {
    const grid = [];
    const rooms = new Set();

    const addRoom = (room) => {
        if (rooms.has(room.id)) { return; }
        rooms.add(room.id);
        const x = room.x * 2 + offset;
        const y = room.y * 2 + offset;

        for (let i = -1; i < 2; i++) {
            if (!grid[y + i]) grid[y + i] = [];

            for (let j = -1; j < 2; j++) {
                grid[y + i][x + j] = grid[y + i][x + j] || '#';
            }
        }

        grid[y][x] = '.';
        if (room.north) { grid[y - 1][x] = ' '; addRoom(room.north); }
        if (room.east) { grid[y][x + 1] = ' '; addRoom(room.east); }
        if (room.south) { grid[y + 1][x] = ' '; addRoom(room.south); }
        if (room.west) { grid[y][x - 1] = ' '; addRoom(room.west); }
    }

    addRoom(start);

    return grid.map(line => line.join('')).join('\n');
}
*/

const visitAllRooms = (start) => {
    const visited = new Set();
    const queue = [{ room: start, score: 0 }];
    let maxScore = 0;
    let farOff = 0;

    do {
        const { room, score } = queue.shift();
        if (visited.has(room.id)) { continue; }

        if (score >= 1000) {
            farOff += 1;
        }

        maxScore = Math.max(score, maxScore);

        visited.add(room.id);
        for (const dir of ['north', 'east', 'south', 'west']) {
            if (room[dir]) {
                queue.push({
                    room: room[dir],
                    score: score + 1
                });
            }
        }
    } while (queue.length > 0);

    return { maxScore, farOff };
}

const startingRoom = buildMap(input);
const { maxScore, farOff } = visitAllRooms(startingRoom);

console.log('The answer to puzzle 1 is', maxScore);
console.log('The answer to puzzle 2 is', farOff);
