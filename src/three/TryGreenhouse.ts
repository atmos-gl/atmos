import {
    AmbientLight,
    BoxGeometry,
    Clock, Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight, Raycaster,
    Scene, Vector2, Vector3,
    WebGLRenderer
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Tomato} from './pocs/Tomato';
import GUI from 'lil-gui';
import {BaseScene} from './BaseScene';
import {Box} from './objects/Box';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {start} from 'repl';

export class TryGreenhouse extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private box: Box;
    private xOffset: number;


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
        let mouseStart = 0
        const raycaster = new Raycaster()
        const pointer = new Vector2()
        let startOpen = 0
        this.canvas.addEventListener('mousedown', (e) => {
            pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( pointer, this.camera );
            const intersects = raycaster.intersectObjects( [this.box.handle] );

            if (intersects.length === 0) {
                return
            }
            dragging = true
            mouseStart = e.layerX
            startOpen = this.box.open
        })
        this.canvas.addEventListener('mouseup', (e) => {
            dragging = false
            this.box.snapDoor()
        })
        this.canvas.addEventListener('mousemove', (e) => {
            if (dragging) {
                const x = e.layerX
                const offset = x - mouseStart
                this.box.open = startOpen + offset / this.xOffset
            }
        })


        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()

        const vector = new Vector3()
        this.box.handle.getWorldPosition(vector)
        vector.project(this.camera)

        const w2 = this.canvas.clientWidth / 2
        const startX = (vector.x * w2) + w2

        this.box.open = 1
        this.box.handle.getWorldPosition(vector)
        vector.project(this.camera)

        const we2 = this.canvas.clientWidth / 2
        const endX = (vector.x * we2) + we2

        this.xOffset = endX - startX - 100
        this.box.open = 0

        console.log(this.xOffset)
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
