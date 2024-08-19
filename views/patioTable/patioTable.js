import {scene, Group, compute} from "setup";
import Board from "board";

const boards = [];

createLegs();
createTop();

let borderOne = new Board(scene, 2, 4, 36, boards);
borderOne.translate(19, 15, 0);

let borderTwo = new Board(scene, 2, 4, 36, boards);
borderTwo.translate(-19, 15, 0);

let borderThree = new Board(scene, 2, 4, 40, boards);
borderThree.translate(0, 15, 19);
borderThree.rotate(0, 90, 0);

let borderFour = new Board(scene, 2, 4, 40, boards);
borderFour.translate(0, 15, -19);
borderFour.rotate(0, 90, 0);

function createLegs(){
    let legs = [];
    for(let i = 0; i < 4; i++){
        let leg = new Board(scene, 4, 4, 30, boards);
        leg.rotate(90, 0, 0);
        legs.push(leg);
    }

    let posX = 16;
    let posZ = 16;
    legs[0].translate(posX, 0, posZ);
    legs[1].translate(posX, 0, -posZ);
    legs[2].translate(-posX, 0, posZ);
    legs[3].translate(-posX, 0, -posZ);

    return legs;
}

function createTop(){
    let top = [];
    let leftShift = 15;
    for(let i = 0; i < 6; i++){
        let board = new Board(scene, 2, 6, 36, boards);
        board.translate(0, 16, leftShift - (i * 6));
        board.rotate(0, 90, 90);
        top.push(board);
    }

    return top;
}

compute(boards);
