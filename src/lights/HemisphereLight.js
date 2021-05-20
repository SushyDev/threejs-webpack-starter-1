import * as THREE from 'three';

const HemisphereLight = (skyColor, groundColor, intensity) => {
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    return light;
};

export default HemisphereLight;
