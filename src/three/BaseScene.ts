import {Clock, MathUtils, Scene, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import CustomCamera from './custom/CustomCamera';
import {ref, Ref} from 'vue';

export class BaseScene {
    protected scene: Scene | null = null
    public camera: CustomCamera | null = null
    protected renderer: WebGLRenderer | null = null
    public canvas: HTMLCanvasElement | null = null
    protected clock: Clock | null = null

    public isCameraMoving: Ref<boolean> = ref(false)

    protected controls?: OrbitControls

    public gui: GUI;

    public init(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.scene = new Scene()
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
        })
        this.renderer.setPixelRatio(MathUtils.clamp(window.devicePixelRatio, 1, 2))

        this.clock = new Clock()
        this.gui = new GUI()
        if (import.meta.env.PROD) {
            this.gui.hide()
        }

        const gl = this.renderer.getContext()
        const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        this.camera = new CustomCamera(45, aspect, 0.01, 1000)
        this.camera.position.set(10, 10, 10)
        this.camera.lookAt(0, 0, 0)
        this.camera.onMoveChange = isMoving => {
            this.isCameraMoving.value = isMoving
        }

        this.resizeRendererToDisplaySize()
        this.fixResize()
    }

    protected enableControls(damping = 0.2) {
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = !!damping
        this.controls.dampingFactor = damping
    }

    protected resizeRendererToDisplaySize() {
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

    protected fixResize() {

        const gl = this.renderer!.getContext()
        this.camera!.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        this.camera!.updateProjectionMatrix()
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        if (this.resizeRendererToDisplaySize()) {
            this.fixResize()
        }

        this.controls?.update()

        this.render()
    }

    get width() {
        const gl = this.renderer!.getContext()
        return gl.drawingBufferWidth
    }
    get height() {
        const gl = this.renderer!.getContext()
        return gl.drawingBufferHeight
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
