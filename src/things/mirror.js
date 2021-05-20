import * as THREE from 'three';

const Mirror = (width, height) => {
    const geometry = new THREE.BoxGeometry(width, height, 0.05);
    const images = ['textures/cubemap/negx.jpg', 'textures/cubemap/posx.jpg', 'textures/cubemap/posy.jpg', 'textures/cubemap/negy.jpg', 'textures/cubemap/negz.jpg', 'textures/cubemap/posz.jpg'];

    const reflectionCube = new THREE.CubeTextureLoader().load(images);
    const material = new THREE.MeshLambertMaterial({color: 0xff0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 1});
    const mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'mirror';

    return mesh;
};

export default Mirror;
