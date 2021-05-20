import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';

const MovementSystem = class {
    constructor(camera, elem) {
        this.movement = {
            87: false, //w
            65: false, //a
            83: false, //s
            68: false, //d
            32: false, // space
            17: false, // ctrl
            16: false, // shift
        };

        this.speed = 0.025;

        this.camera = camera;

        this.controls = new PointerLockControls(camera, elem);

        elem.addEventListener(
            'keyup',
            (event) => {
                this.movement[event.keyCode] = false;
            },
            false
        );

        elem.addEventListener(
            'keydown',
            (event) => {
                this.movement[event.keyCode] = true;
            },
            false
        );

        elem.onclick = () => this.controls.lock();
    }

    updatePosition(keyCode) {
        const speed = this.movement['17'] ? this.speed * 2 : this.speed;

         document.getElementById('sprint').textContent = `Springing: ${this.movement['17']}`;

        switch (keyCode) {
            case '87':
                this.controls.moveForward(speed);
                break;
            case '65':
                this.controls.moveRight(-speed);
                break;
            case '83':
                this.controls.moveForward(-speed);
                break;
            case '68':
                this.controls.moveRight(speed);
                break;
            case '32':
                this.camera.position.y = this.camera.position.y + speed;
                break;
            case '16':
                this.camera.position.y = this.camera.position.y - speed;
                break;
        }
    }

    update() {
        Object.keys(this.movement).forEach((keyCode) => this.movement[keyCode] && this.updatePosition(keyCode));
    }

    // setSpeed(value) {
    //     this.speed = value;
    // }
};

export default MovementSystem;
