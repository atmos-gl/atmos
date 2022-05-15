import {AmbientLight, Clock, PerspectiveCamera, PlaneGeometry, PointLight, Scene, Vector3, WebGLRenderer} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import {CustomPlane} from "./CustomPlane";
import {Cube} from "./Cube";
import {DragControls} from "three/examples/jsm/controls/DragControls";

export class DragDropApp {
    private scene: Scene | null = null
    private camera: PerspectiveCamera | null = null
    private renderer: WebGLRenderer | null = null
    private canvas: HTMLCanvasElement | null = null
    private clock: Clock | null = null

    private ambientLight: AmbientLight
    private pointLight: PointLight;

    private controls: OrbitControls

    private gui: GUI;

    private ground: CustomPlane | null = null
    private wallLeft: CustomPlane | null = null
    private wallBack: CustomPlane | null = null

    private cube: Cube | null = null

    public init(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.scene = new Scene()
        this.renderer = new WebGLRenderer({
            canvas: this.canvas
        })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.clock = new Clock()
        this.gui = new GUI()

        const gl = this.renderer.getContext()
        const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        this.camera = new PerspectiveCamera(45, aspect, 0.01, 1000)
        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(0, 0, 0)

        // this.controls = new OrbitControls(this.camera, this.canvas)
        // this.controls.enableDamping = true


        this.ambientLight = new AmbientLight('#ffffff', 1)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight(0xffffff, 1)
        this.pointLight.position.x = 5
        this.pointLight.position.y = 5
        this.pointLight.position.z = -5
        this.scene.add(this.pointLight)

        this.ground = new CustomPlane(0xffff00)
        this.scene.add(this.ground.mesh)
        this.ground.mesh.rotateX(-Math.PI / 2)

        this.wallLeft = new CustomPlane(0xFF0000)
        this.scene.add(this.wallLeft.mesh)
        this.wallLeft.mesh.rotateY(-Math.PI / 2)
        this.wallLeft.mesh.position.set(-50, 50, 0)

        this.wallBack = new CustomPlane(0x0000FF)
        this.scene.add(this.wallBack.mesh)
        this.wallBack.mesh.position.set(0, 50, -50)

        this.cube = new Cube(0x38761D)
        this.scene.add(this.cube.mesh)
        this.cube.mesh.position.set(-50, 5, -50)

        const dragCubes = [this.cube.mesh]

        const controlsDrag = new DragControls(dragCubes, this.camera, this.renderer.domElement) ;

        let currentCube = this.cube

        // @ts-ignore
        document.addEventListener('mousemove', (event) => {
            currentCube.mesh.position.set((event.clientX / window.innerWidth) * 50 , 5, (event.clientY / window.innerHeight) * 50)
        });

        document.addEventListener('click', () => {
            currentCube = new Cube(0x38761D)
            this.scene.add(currentCube.mesh)
        })
    }

    resizeRendererToDisplaySize() {
        const width = this.canvas!.clientWidth
        const height = this.canvas!.clientHeight
        const needResize = this.canvas!.width !== width || this.canvas!.height !== height
        if (needResize) {
            this.renderer?.setSize(width, height, false)
        }
        return needResize
    }

    private render() {
        this.renderer!.render(this.scene!, this.camera!)
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        const elapsedTime = this.clock!.getElapsedTime()
        // Update ...
        if (this.resizeRendererToDisplaySize()) {
            const gl = this.renderer!.getContext()
            this.camera!.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
            this.camera!.updateProjectionMatrix()
        }

        // @ts-ignore
        this.cube.mesh.position.clamp(new Vector3(-45, 5, -45), new Vector3(45, 5, 45))
        // this.cube.mesh.position.set(mouse.x, 5, 0)

        this.render()
    }


    // Run app, load things, add listeners, ...
    run() {
        console.log("Dragdrop App run")

        this.render()
        this.animate()
    }

    // Memory management
    destroy() {
        this.scene = null
        this.camera = null
        this.renderer = null
        this.canvas = null
    }
}
