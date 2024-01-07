import * as THREE from 'three';
import * as datgui from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

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

const orbit = new OrbitControls(camera, renderer.domElement);

const axis = new THREE.AxesHelper(5);
scene.add(axis);

camera.position.set(2,2,5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color: 0x006700});
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);

const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);

function renderGame(time) {
    box.rotation.x += time/10000;
    box.rotation.y += time/10000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(renderGame);
