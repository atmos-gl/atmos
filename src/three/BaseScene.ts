import {AmbientLight, Clock, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {Tomato} from './pocs/Tomato';
import GUI from 'lil-gui';

export class BaseScene {
    protected scene: Scene | null = null
    protected camera: PerspectiveCamera | null = null
    protected renderer: WebGLRenderer | null = null
    protected canvas: HTMLCanvasElement | null = null
    protected clock: Clock | null = null

    protected controls?: OrbitControls

    protected gui: GUI;

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
        this.camera.position.set(10, 10, 10)
        this.camera.lookAt(0, 0, 0)
    }

    protected enableControls(damping = 0.2) {
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = !!damping
        this.controls.dampingFactor = damping
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

    protected render() {
        this.renderer!.render(this.scene!, this.camera!)
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        if (this.resizeRendererToDisplaySize()) {
            const gl = this.renderer!.getContext()
            this.camera!.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
            this.camera!.updateProjectionMatrix()
        }

        this.controls?.update()

        this.render()
    }

    // Run app, load things, add listeners, ...
    run() {
        console.log("App run")

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
