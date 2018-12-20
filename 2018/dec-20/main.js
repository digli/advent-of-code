'use strict';

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

// TODO: Figure out what return value to use
const branch = (directions, rooms, origin) => {
    const currentBranches = [];

    for (let i = 0; i < directions.length; i++) {
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
                const { offset, branches } = branch(directions, i);
                for (const r of branches) {
                    currentRoom.addNeighbor(r);
                }

                i += offset;
                break;
            }
            case ')': {
                return {
                    currentBranches,
                    offset: i
                };
            }
            case '|': {
                // currentBranches.push(origin);
                // currentRoom = origin;
            }
        }
    }
}

const buildMap = (input) => {
    const directions = input.trim().substring(1, input.length - 2);
    const rooms = new Map();
    const start = new Room(0, 0);

    rooms.set(start.id, start);
    branch(directions, rooms, start);
}
