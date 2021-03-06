import {Clock, MathUtils, Scene, sRGBEncoding, WebGLRenderer} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import CustomCamera from './custom/CustomCamera';
import {ref, Ref} from 'vue';
import {disposeFullObject} from './utils/cleanup';
import {EffectComposer, EffectPass, RenderPass, SMAAEffect} from 'postprocessing';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

export class BaseScene {
    protected scene: Scene | null = null
    public camera: CustomCamera | null = null
    protected renderer: WebGLRenderer | null = null
    public canvas: HTMLCanvasElement | null = null
    protected clock: Clock | null = null

    protected disposed = false

    public isCameraMoving: Ref<boolean> = ref(false)

    protected controls?: OrbitControls|TrackballControls

    public gui: GUI;
    protected composer: EffectComposer

    public name = 'base'

    constructor(name?: string) {
        if (name) {
            this.name = name
        }
    }

    public init(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        canvas.dataset.scene = this.constructor.name
        this.scene = new Scene()
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false,
            logarithmicDepthBuffer: true,
        })
        this.renderer.outputEncoding = sRGBEncoding
        this.renderer.setPixelRatio(MathUtils.clamp(window.devicePixelRatio, 1, 2))

        this.clock = new Clock()
        this.gui = new GUI()
        // if (import.meta.env.PROD) {
        // }
        this.gui.hide()

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

    protected setupPostProcessing() {
        // Post processing
        this.composer = new EffectComposer(this.renderer, {
        })
        this.composer.addPass(new RenderPass(this.scene, this.camera))
        this.postProcessingPasses()
    }

    protected postProcessingPasses() {
        const  smaaEffect = new SMAAEffect(
            {}
        )
        const smaaPass = new EffectPass(this.camera, smaaEffect)
        this.composer.addPass(smaaPass)
    }

    protected enableControls(damping = 0.2) {
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = !!damping
        this.controls.dampingFactor = damping
    }

    protected resizeRendererToDisplaySize() {
        const width = this.canvas.parentElement.clientWidth
        const height = this.canvas.parentElement.clientHeight
        const needResize = this.canvas!.width / this.renderer.getPixelRatio() !== width
            || this.canvas!.height / this.renderer.getPixelRatio() !== height
        if (needResize) {
            this.renderer?.setSize(width, height, true)
            this.composer?.setSize(width, height, true)
        }
        return needResize
    }

    protected render() {
        // this.renderer!.render(this.scene!, this.camera!)
        this.composer.render()
    }

    protected fixResize() {
        const gl = this.renderer!.getContext()
        this.camera!.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
        this.camera!.updateProjectionMatrix()
    }

    animate() {
        if (this.disposed) return
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
        console.log(`Scene ${this.name} run`)

        this.render()
        this.animate()
    }

    // Memory management
    destroy() {
        disposeFullObject(this.scene)
        this.renderer.dispose()
        this.scene = null
        this.camera = null
        this.renderer = null
        this.canvas = null
        this.disposed = true
    }
}
