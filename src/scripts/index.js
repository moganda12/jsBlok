import * as THREE from 'three';
import * as datgui from 'dat.gui';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(5, 5, 5);

const firstperson = new PointerLockControls( camera, renderer.domElement );

const textureLoader = new THREE.TextureLoader();
function loadTexture(path) {
    let texture = textureLoader.load(path);
    texture.magFilter = THREE.NearestFilter;
    return texture;
}

const dirt = loadTexture('./assets/minecraft/textures/block/dirt.png');

const axis = new THREE.AxesHelper(5);
scene.add(axis);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, map: dirt});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

box.position.set(1,1,1);

const ambience = new THREE.AmbientLight(0x333333);
scene.add(ambience);

const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(dirLight);
dirLight.position.set(1,1,1);


renderer.domElement.addEventListener('click', () => {
    firstperson.lock();
});

let dt = 0.01;
let lastTime = new Date().getTime();

function renderGame(time) {
    dt = time - lastTime;
    renderer.render(scene, camera);
    lastTime = time;
};

renderer.setAnimationLoop(renderGame);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
