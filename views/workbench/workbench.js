import {scene, Group, compute} from "setup";
import Board from "board";

const container = new Group();
scene.add(container);

const boards = [];

createLegs(boards);
let tableTop = new Board(scene, 2, 36, 72);
tableTop.translate(0, 18 + (tableTop.width / 2), 0);
tableTop.rotate(0, 90, 90);

//Creating edge boards with 2x4
let borderOne = new Board(scene, 2, 4, 72);
borderOne.translate(0, 16, 17);
borderOne.rotate(0, 90, 0);
let borderTwo = new Board(scene, 2, 4, 72);
borderTwo.translate(0, 16, -17);
borderTwo.rotate(0, 90, 0);
let borderThree = new Board(scene, 2, 4, 32);
borderThree.translate(35, 16, 0);
let borderFour = new Board(scene, 2, 4, 32);
borderFour.translate(-35, 16, 0);

//Add shelf
let shelf = new Board(scene, 1, 24, 60);
shelf.translate(0, -3.5, 0);
shelf.rotate(0, 90, 90);
let shelfSupportOne = new Board(scene, 2, 4, 32);
shelfSupportOne.translate(-29, -6, 0);
let shelfSupportTwo = new Board(scene, 2, 4, 32);
shelfSupportTwo.translate(29, -6, 0);
let shelfSupportThree = new Board(scene, 2, 4, 56);
shelfSupportThree.translate(0, -6, 11);
shelfSupportThree.rotate(0, 90, 0);
let shelfSupportFour = new Board(scene, 2, 4, 56);
shelfSupportFour.translate(0, -6, -11);
shelfSupportFour.rotate(0, 90, 0);

boards.push(
    tableTop,
    borderOne, borderTwo, borderThree, borderFour,
    shelf,
    shelfSupportOne, shelfSupportTwo, shelfSupportThree, shelfSupportFour
);

function createLegs(boards){
    let legs = [];
    for(let i = 0; i < 4; i++){
        let leg = new Board(scene, 4, 4, 36);
        leg.rotate(90, 0, 0);
        legs.push(leg);
        boards.push(leg);
    }

    let posX = 32;
    let posZ = 14;
    legs[0].translate(posX, 0, posZ);
    legs[1].translate(posX, 0, -posZ);
    legs[2].translate(-posX, 0, posZ);
    legs[3].translate(-posX, 0, -posZ);

    return legs;
}
