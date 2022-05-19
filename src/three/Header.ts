import {AmbientLight, PointLight, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {Greenhouse} from "./objects/Greenhouse";
import {headerLoader} from "../composables/useLoader";

export class Header extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private greenHouse: Greenhouse;

    private defaultCamPos: Vector3 = new Vector3(2, 3, 10)
    private defaultCamLookAt: Vector3 = new Vector3()

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        // this.enableControls()
        this.ambientLight = new AmbientLight('#ffffff', 0.3)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#99e1cb', 0.9)
        this.pointLight.position.x = 10
        this.pointLight.position.y = 10
        this.pointLight.position.z = 10
        this.scene.add(this.pointLight)

        this.greenHouse = new Greenhouse(headerLoader.loader, this)
        // this.greenHouse.mesh.rotateY(Math.PI)
        this.scene.add(this.greenHouse.mesh)

        this.camera.position.set(this.defaultCamPos.x, this.defaultCamPos.y, this.defaultCamPos.z)
        this.camera.lookAt(this.defaultCamLookAt)

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()

        // this.greenHouse.openDoor()
        this.setupPostProcessing()
    }

    animate() {
        // this.greenHouse.animate()

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
