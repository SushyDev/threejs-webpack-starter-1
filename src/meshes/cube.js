import * as THREE from 'three';

const Cube = (width, height, depth) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);

    const material = new THREE.MeshNormalMaterial({color: 0xff0000});
    const mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'cube';

    return mesh;
};

export default Cube;
