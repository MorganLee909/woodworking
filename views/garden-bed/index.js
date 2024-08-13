//import * as three from "three";
//import {OribitControls} from "orbitControls";


const canvas = document.getElementById("canvas");
const renderer = new three.WebGLRenderer({antialias: true, canvas});

const camera = new three.PerpectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 5;
camera.position.y = 1.8;

const controls = new OrbitControls(camera, renderer.domElement);

const scene = new three.Scene();

const light = new three.DirectionalLight(0xffffff, 3);
scene.add(light);

const floorGom = new three.PlaneGeometry(100, 100);
const loader = new three.TextureLoader();
const floorTex = loader.load("./americanChestnut.jpg", (t)=>{
    t.wrapS = t.wrapT = three.RepeatWrapping;
    t.offset.set(0, 0);
    t.repeat.set(10, 10);
});
floorTex.colorSpace = three.SRGBColorSpace;
const floorMat = new three.MeshBasicMaterial({map: floorTex});
const floor = new three.Mesh(floorGom, floorMat);
floor.rotation.x = -(Math.PI / 2);
scene.add(floor);
