import {AmbientLight, PointLight, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {GreenHouse} from "./objects/GreenHouse";

export class Header extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private greenHouse: GreenHouse;

    private defaultCamPos: Vector3 = new Vector3(4, 5, 15)
    private defaultCamLookAt: Vector3 = new Vector3()

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

        this.greenHouse = new GreenHouse()
        this.greenHouse.mesh.rotateY(Math.PI)
        this.scene.add(this.greenHouse.mesh)

        this.camera.position.set(this.defaultCamPos.x, this.defaultCamPos.y, this.defaultCamPos.z)
        this.camera.lookAt(this.defaultCamLookAt)

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()
    }

    animate() {
        this.greenHouse.animate()

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
