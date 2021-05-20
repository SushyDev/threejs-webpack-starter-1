// import * as CANNON from 'CANNON';
import * as CANNON from 'cannon';

const someClass = class {
    setup(scene) {
        
        const world = new CANNON.World();
        world.gravity.set(0, 0, -9.82);

        world.broadphase = new CANNON.NaiveBroadphase();

            const mass = 5;
            const radius = 1;
            const sphereShape = new CANNON.Sphere(radius); // Step 1
            const sphereBody = new CANNON.Body({mass: mass, shape: sphereShape}); // Step 2
            sphereBody.position.set(1, 1, 1);
            world.add(sphereBody); // Step 3

        // ground
            const groundShape = new CANNON.Plane();
            const groundBody = new CANNON.Body({mass: 0, shape: groundShape});
            world.add(groundBody);
        const timeStep = 1.0 / 60.0; // seconds
        for (let i = 0; i < 60; ++i) {
            world.step(timeStep);
            console.log(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
        }
    }
};
export default someClass;
