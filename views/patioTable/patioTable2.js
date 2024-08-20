import {scene, Group, compute} from "setup";
import Board from "Board";
import * as three from "three";

const boards = [];

console.time("something");
const board = new Board(scene, 2, 4, 50, boards, ["height", 45, true]);
const boardTwo = new Board(scene, 2, 4, 50, boards, ["height", 45, true]);
boardTwo.translate(0, 23, 23);
boardTwo.rotate(90, 0, 180);
const boardThree = new Board(scene, 2, 4, 50, boards, ["height", 45, true]);
boardThree.translate(0, 23, -23);
boardThree.rotate(90, 0, 0);
const boardFour = new Board(scene, 2, 4, 50, boards, ["height", 45, true]);
boardFour.translate(0, 46, 0);
boardFour.rotate(0, 0, 180);
console.timeEnd("something");
