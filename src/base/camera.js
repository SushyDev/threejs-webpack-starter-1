import * as THREE from 'three';

const camera = class {
    constructor(sizes) {
        this.camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100);

        {
            const camera = this.camera;
            camera.position.set(0, 0, 2);
        }
    }
};

export default camera;
