import * as three from "three";
import {OrbitControls} from "orbitControls";
import {CSS2DRenderer} from "2dRenderer";

import Board from "board";

const canvas = document.getElementById("canvas");
const renderer = new three.WebGLRenderer({antialias: true, canvas});

const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 100;
camera.position.y = 1.8;

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const scene = new three.Scene();
export scene;

const light = new three.DirectionalLight(0xffffff, 3);
scene.add(light);

const container = new three.Group();
scene.add(container);
createProject(container, []);

function resizeRendererToDisplaySize(renderer){
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if(needResize) renderer.setSize(width, height, false);
    return needResize;
}

function render(time){
    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    requestAnimationFrame(render);
}

renderer.render(scene, camera);
requestAnimationFrame(render);

function createProject(container, boards){
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

    computeBoards(boards);
}

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

function computeBoards(boards){
    let boardsObj = {
        totalSurfaceArea: 0
    };
    const boardList = document.createElement("div");
    let allItems = "";
    for(let i = 0; i < boards.length; i++){
        if(boardsObj[boards[i].type]){
            boardsObj[boards[i].type].count++;
            boardsObj[boards[i].type].totalLength += boards[i].length;
        }else{
            boardsObj[boards[i].type] = {
                count: 1,
                totalLength: boards[i].length
            }
        }
        boardsObj.totalSurfaceArea += boards[i].surfaceArea();

        const p = document.createElement("p");
        p.textContent = `${boards[i].type}x${boards[i].length}`;
        boardList.appendChild(p);
    }

    const specs = document.getElementById("specs");
    specs.appendChild(boardList);

    const thing = document.createElement("p");
    thing.textContent = boardsObj;
    specs.appendChild(thing);
}
