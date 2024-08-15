import * as three from "three";
import {OrbitControls} from "orbitControls";
import {CSS2DRenderer} from "2dRenderer";

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

export const scene = new three.Scene();

const light = new three.DirectionalLight(0xffffff, 3);
scene.add(light);

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

export function compute(data){
    console.log(data);
}

export const Group = three.Group;
