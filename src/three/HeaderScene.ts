import {AmbientLight, PointLight, Raycaster, Vector2, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {Greenhouse} from "./objects/Greenhouse";
import {commonLoader} from "../composables/useLoader";

export class HeaderScene extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private greenHouse: Greenhouse;

    private defaultCamPos: Vector3 = new Vector3(0, 1.3, 15)
    private defaultCamLookAt: Vector3 = new Vector3(0, 0, 0)

    private isHover = false

    constructor() {
        super('header');
    }

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

        this.greenHouse = new Greenhouse()
        this.scene.add(this.greenHouse.mesh)

        this.camera.position.set(this.defaultCamPos.x, this.defaultCamPos.y, this.defaultCamPos.z)
        this.camera.lookAt(this.defaultCamLookAt)

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()
        this.initInteraction()

        // this.greenHouse.openDoor()
        this.setupPostProcessing()
    }

    private initInteraction() {
        const raycaster = new Raycaster()
        const pointer = new Vector2()
        this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect()
            const rX = e.x - rect.x
            const rY = e.y - rect.y
            pointer.set(
                ( rX / rect.width ) * 2 - 1,
                -( rY / rect.height ) * 2 + 1,
            )
            raycaster.setFromCamera(pointer, this.camera)
            const intersect = raycaster.intersectObjects(this.greenHouse.intersectables, false)
            this.setHover(!!intersect.length)
        })
        this.canvas.addEventListener('mouseout', () => this.greenHouse.closeDoor('both',300))
    }

    private setHover(set: boolean) {
        if (this.isHover === set) {
            return
        }
        this.isHover = set

        if (this.isHover) {
            this.greenHouse.openDoor('both',300)
        } else {
            this.greenHouse.closeDoor('both',300)
        }
    }

    animate() {
        // this.greenHouse.animate()
        const deltaTime = this.clock.getDelta()
        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
