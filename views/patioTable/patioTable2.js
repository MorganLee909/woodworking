import {scene, Group, compute} from "setup";
import Board from "Board";
import * as three from "three";

const boards = [];

console.time("something");
const board = new Board(scene, 2, 4, 50, boards);
console.timeEnd("something");
