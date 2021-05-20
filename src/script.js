import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';

import buildComposer from './base/renderer';
import buildCamera from './base/camera';

import Donut from './meshes/donut';
import Plane from './meshes/plane';
import Cube from './meshes/cube';

import HemisphereLight from './lights/HemisphereLight';

import MovementSystem from './physics/movement';

import Mirror from './things/mirror';
import {CompressedPixelFormat} from 'three';

// $ Debug
const gui = new dat.GUI();

// $ Scene
const scene = new THREE.Scene();

// # Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// $ Camera
const builtCamera = new buildCamera(sizes);
const camera = builtCamera.camera;

// $ Renderer & Composer
const builtComposer = new buildComposer(scene, camera, sizes);
const renderer = builtComposer.renderer;
const composer = builtComposer.composer;
scene.add(camera);

// $ Controlls
const controls = new MovementSystem(camera, document.body);

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// # Donut
const donut = Donut(0.7, 0.2, 16, 100, scene, camera);
donut.position.set(0, 0, 0);
scene.add(donut);

// # Plane
const plane = Plane(10, 10);
plane.position.set(0, -1, 0);
plane.rotateX(-Math.PI * 0.5); // this is how you can do it
scene.add(plane);

// # Mirror
const mirror = Mirror(1, 2);
mirror.position.set(2, 0, 0);
scene.add(mirror);

// # Lights
const light = HemisphereLight('#ffffff', '#000000', 5);
scene.add(light);

document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey && !event.shiftKey) || (event.ctrlKey && event.key !== 'r')) {
        event.preventDefault();
    }
});
document.addEventListener(
    'wheel',
    (event) => {
        switch (event.deltaY) {
            case -100:
                donut.rotation.y = donut.rotation.y + 0.4;
                break;
            case 100:
                donut.rotation.y = donut.rotation.y - 0.4;
                break;
        }
    },
    false
);

const images = ['textures/cubemap/negx.jpg', 'textures/cubemap/posx.jpg', 'textures/cubemap/posy.jpg', 'textures/cubemap/negy.jpg', 'textures/cubemap/negz.jpg', 'textures/cubemap/posz.jpg'];

const cubeLoader = new THREE.CubeTextureLoader();

scene.background = cubeLoader.load(images);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

document.addEventListener(
    'click',
    () => {
        const intersects = raycaster.intersectObjects(scene.children, true);
        const cubes = scene.children.filter((child) => child.name === 'cube');
        if (cubes.length > 50) scene.remove(cubes[0]);

        const l = 0;
        const y = intersects[l].point.y + 0.25; //<= -0.75 ? -0.75 : intersects[l].point.y;
        const cube = Cube(0.5, 0.5, 0.5);
        cube.position.set(intersects[l].point.x, y, intersects[l].point.z);
        scene.add(cube);
    },
    false
);

const clock = new THREE.Clock();
const stats = new Stats();

stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const tick = () => {
    stats.begin();
    const elapsedTime = clock.getElapsedTime();

    // Update stats menu
    document.getElementById('cords').textContent = `x: ${camera.position.x.toFixed(2)} y: ${camera.position.y.toFixed(2)} z: ${camera.position.z.toFixed(2)}`;

    // Update movement
    controls.update();

    // Render
    composer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera);

    // Call tick again on the next frame
    stats.end();
    window.requestAnimationFrame(tick);
};
tick();
