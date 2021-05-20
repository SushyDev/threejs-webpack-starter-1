import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/js/postprocessing/UnrealBloomPass.js';

const buildComposer = class {
    constructor(scene, camera, sizes) {
        this.scene = scene;
        this.camera = camera;
        this.sizes = sizes;

        this.canvas = document.querySelector('canvas.webgl');

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
        });

        this.composer = new EffectComposer(this.renderer);

        {
            const renderer = this.renderer;
            const composer = this.composer;
            const camera = this.camera;
            const sizes = this.sizes;

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            composer.addPass(new RenderPass(scene, camera));
        }
    }
};

export default buildComposer;
