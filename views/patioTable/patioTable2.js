import {scene, Group, compute} from "setup";
import Board from "Board";
import * as three from "three";

const boards = [];

createLegs();
createTop();
//createBorder();
//createInnerSupport();

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
    const board0 = new Board(scene, 2, 6, 36, boards, ["height", 45, true]);
    board0.translate(15, 16, 0);
    board0.rotate(0, 0, 90);
    const board1 = new Board(scene, 2, 6, 36, boards, ["height", 45, true]);
    board1.translate(0, 16, 15);
    board1.rotate(0, -90, 90);
    const board2 = new Board(scene, 2, 6, 36, boards, ["height", 45, true]);
    board2.translate(-15, 16, 0);
    board2.rotate(0, 0, -90);
    const board3 = new Board(scene, 2, 6, 36, boards, ["height", 45, true]);
    board3.translate(0, 16, -15);
    board3.rotate(0, 90, 90);

    const board5 = new Board(scene, 2, 6, 24, boards, ["height", 45, true]);
    board5.translate(0, 16, 9);
    board5.rotate(0, 90, -90);
    const board6 = new Board(scene, 2, 6, 24, boards, ["height", 45, true]);
    board6.translate(-9, 16, 0);
    board6.rotate(0, 0, -90);
    const board7 = new Board(scene, 2, 6, 24, boards, ["height", 45, true]);
    board7.translate(0, 16, -9);
    board7.rotate(0, 90, 90);
    const board8 = new Board(scene, 2, 6, 24, boards, ["height", 45, true]);
    board8.translate(9, 16, 0);
    board8.rotate(0, 0, 90);
    
    const board9 = new Board(scene, 2, 6, 12, boards, ["height", 45, true]);
    board9.translate(0, 16, 3);
    board9.rotate(0, 90, -90);
    const board10 = new Board(scene, 2, 6, 12, boards, ["height", 45, true]);
    board10.translate(-3, 16, 0);
    board10.rotate(0, 0, -90);
    const board11 = new Board(scene, 2, 6, 12, boards, ["height", 45, true]);
    board11.translate(0, 16, -3);
    board11.rotate(0, 90, 90);
    const board12 = new Board(scene, 2, 6, 12, boards, ["height", 45, true]);
    board12.translate(3, 16, 0);
    board12.rotate(0, 0, 90);

    /*const geometry = new three.CylinderGeometry(1, 1, 64, 32);
    const material = new three.MeshBasicMaterial({color: 0xffffff});
    const cylinder = new three.Mesh(geometry, material);
    cylinder.position.y += 16;
    scene.add(cylinder);*/
}

function createBorder(){
    const board0 = new Board(scene, 2, 4, 40, boards, ["width", 45, true]);
    board0.translate(0, 15, -19);
    board0.rotate(0, 90, 180);
    const board1 = new Board(scene, 2, 4, 40, boards, ["width", 45, true]);
    board1.translate(19, 15, 0);
    board1.rotate(0, 180, 0);
    const board2 = new Board(scene, 2, 4, 40, boards, ["width", 45, true]);
    board2.translate(0, 15, 19);
    board2.rotate(0, 90, 0);
    const board3 = new Board(scene, 2, 4, 40, boards, ["width", 45, true]);
    board3.translate(-19, 15, 0);
}

function createInnerSupport(){
    const board0 = new Board(scene, 2, 4, 36, boards);
    board0.translate(0, 14, 0);
    board0.rotate(0, 0, 90);
    const board1 = new Board(scene, 2, 4, 36, boards);
    board1.translate(0, 14, 0);
    board1.rotate(0, 90, 90);
}

compute(boards);
