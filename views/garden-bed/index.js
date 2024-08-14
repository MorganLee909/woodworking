import * as three from "three";
import {OrbitControls} from "orbitControls";

import {CheapBoard, TwoByFour} from "boards";

const canvas = document.getElementById("canvas");
const renderer = new three.WebGLRenderer({antialias: true, canvas});

const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 200;
camera.position.y = 1.8;

const controls = new OrbitControls(camera, renderer.domElement);

const scene = new three.Scene();

const light = new three.DirectionalLight(0xffffff, 3);
scene.add(light);

const board = new TwoByFour(scene, 96);

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
    requestAnimationFrame(render);
}

renderer.render(scene, camera);
requestAnimationFrame(render);
