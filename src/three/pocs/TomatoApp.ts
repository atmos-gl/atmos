import {AmbientLight, Clock, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from 'three'
import {Tomato} from './Tomato';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

export class TomatoApp {
    private scene: Scene | null = null
    private camera: PerspectiveCamera | null = null
    private renderer: WebGLRenderer | null = null
    private canvas: HTMLCanvasElement | null = null
    private clock: Clock | null = null

    private ambientLight: AmbientLight
    private pointLight: PointLight;

    private controls: OrbitControls

    private tomato: Tomato | null = null
    private gui: GUI;

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

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = true


        this.ambientLight = new AmbientLight('#cc4747', 1)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight(0xffffff, 1)
        this.pointLight.position.x = 5
        this.pointLight.position.y = 5
        this.pointLight.position.z = -5
        this.scene.add(this.pointLight)

        // Controls

        this.tomato = new Tomato()
        this.scene.add(this.tomato.mesh)
        this.gui.add(this.tomato, 'long').min(0.7).max(1.5).step(0.001)
        this.gui.add(this.tomato, 'grow').min(0.7).max(1.5).step(0.001)
        this.gui.add(this.tomato, 'size').min(0.7).max(1.5).step(0.001)
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
        this.tomato.animate(elapsedTime)

        // @ts-ignore
        this.controls.update()


        this.render()
    }

    private updateTarget(elapsedTime: number) {
        // const angle = (elapsedTime / this.rotatePeriod) * Math.PI * 2
        // const bounce = (elapsedTime / (this.bouncePeriod * 2)) * Math.PI * 2
        // this.target.mesh.position.set(
        //     Math.cos(angle) * this.radius,
        //     Math.abs(Math.sin(bounce)) + 1,
        //     Math.sin(angle) * this.radius,
        // )
    }

    private updateTank(elapsedTime: number) {
        // this.tank.aim(this.target.mesh.position)
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
