import {AmbientLight, Clock, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Tomato} from './pocs/Tomato';
import GUI from 'lil-gui';
import {BaseScene} from './BaseScene';

export class TryGreenhouse extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;


    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        this.ambientLight = new AmbientLight('#cc4747', 1)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight(0xffffff, 1)
        this.pointLight.position.x = 5
        this.pointLight.position.y = 5
        this.pointLight.position.z = -5
        this.scene.add(this.pointLight)


    }

    animate() {

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
