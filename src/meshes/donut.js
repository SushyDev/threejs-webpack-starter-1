import * as THREE from 'three';

const Donut = (radius, tube, radialSegments, tubularSegments, scene, camera) => {
    const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);

    const images = ['textures/cubemap/negx.jpg', 'textures/cubemap/posx.jpg', 'textures/cubemap/posy.jpg', 'textures/cubemap/negy.jpg', 'textures/cubemap/negz.jpg', 'textures/cubemap/posz.jpg'];

    const refractionCube = new THREE.CubeTextureLoader().load(images);

    const material = new THREE.MeshLambertMaterial({color: 0xffffff, envMap: refractionCube, refractionRatio: 1});

    const mesh = new THREE.Mesh(geometry, material);

    mesh.name = 'donut';

    return mesh;
};

export default Donut;
