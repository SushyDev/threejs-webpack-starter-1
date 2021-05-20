import * as THREE from 'three';

const Plane = (width, height) => {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({color: '#ffffff', side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'Plane'

    return mesh;
};
export default Plane;
