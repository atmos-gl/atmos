import {AmbientLight, Clock, Group, Object3D, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import {BaseScene} from '../BaseScene';
import {Tomato, TomatoParams} from '../objects/Tomato';

export class TomatoScene extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight
    private tomato: Tomato | null = null

    private inclination = Math.PI / 6
    private tomatoWrapper: Group;
    private params: TomatoParams;

    constructor(params: TomatoParams) {
        super();
        this.params = params
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        this.ambientLight = new AmbientLight('#ffffff', 1)
        this.scene.add(this.ambientLight)
        this.renderer.setClearAlpha(0)
    //
        this.scene.add(this.camera)
        this.pointLight = new PointLight(0xffffff, 1)
        this.pointLight.position.x = 30
        this.pointLight.position.y = 20
        this.pointLight.position.z = -10
        this.camera.add(this.pointLight)

        // Controls
        this.tomatoWrapper = new Group()
        this.tomato = new Tomato(this.params)
        this.tomato.mesh.rotation.set(0, 0, this.inclination)
        this.tomatoWrapper.add(this.tomato.mesh)
        this.scene.add(this.tomatoWrapper)

        this.camera.position.set(15, 15, 15)
        this.camera.lookAt(this.tomato.mesh.position)

        this.enableControls()
        this.controls.enablePan = false
        this.controls.enableZoom = false
        this.controls.dampingFactor = 0.05

        this.gui.hide()
    }

    animate() {
        // hey
        const deltaTime = this.clock.getDelta()
        this.tomatoWrapper.rotateY(deltaTime * 0.2)
        this.tomato.mesh.rotateX(deltaTime * 0.2)
        this.tomato.mesh.rotateY(deltaTime * 0.2)

        this.tomato.animate(deltaTime)

        super.animate();
    }

}
