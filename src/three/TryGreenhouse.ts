import {
    AmbientLight,
    BoxGeometry,
    Clock, Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Tomato} from './pocs/Tomato';
import GUI from 'lil-gui';
import {BaseScene} from './BaseScene';
import {Box} from './objects/Box';
import {DragControls} from 'three/examples/jsm/controls/DragControls';

export class TryGreenhouse extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private box: Box;


    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        // this.enableControls()
        this.ambientLight = new AmbientLight('#ffffff', 0.3)
        this.scene.add(this.ambientLight)

        const pointLight = new PointLight('#4453b2', 0.9)
        pointLight.position.x = -10
        pointLight.position.y = 10
        pointLight.position.z = 10
        this.scene.add(pointLight)
        this.pointLight = new PointLight('#99e1cb', 0.9)
        this.pointLight.position.x = 10
        this.pointLight.position.y = 10
        this.pointLight.position.z = 10
        this.scene.add(this.pointLight)

        this.box = new Box()
        this.scene.add(this.box.mesh)

        this.camera.position.x = 4
        this.camera.position.y = 5
        this.camera.position.z = 22
        this.camera.lookAt(0, 0, 0)

        // this.scene.add(new Mesh(
        //     new BoxGeometry(5, 5),
        //     new MeshPhongMaterial({color: '#f00'})
        // ))

        let dragging = false
        this.canvas.addEventListener('mousedown', (e) => {
            dragging = true
        })
        this.canvas.addEventListener('mouseup', (e) => {
            dragging = false
        })
        this.canvas.addEventListener('mousemove', (e) => {
            if (dragging) {
                console.log('dragging')
            }
        })

        window.tmp = this.box
    }

    animate() {
        this.box.animate(this.clock.getDelta())
        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
