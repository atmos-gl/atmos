import {
    AmbientLight,
    Group,
    Mesh,
    MeshPhongMaterial,
    PlaneGeometry,
    PointLight,
    PointLightHelper,
    Vector3
} from 'three';
import {BaseScene} from './BaseScene';
import {Tomato, TomatoParams} from './objects/Tomato';
import {growLoader} from '../composables/useLoader';
import {World, Vec3, Body, Plane, Sphere} from 'cannon-es'
import CannonDebugRenderer, {createTrimesh} from './utils/physics';

type PhysicalTomato = {
    tomato: Tomato
    body: Body
}

export class CollectScene extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private tomatoParams: TomatoParams;
    private world: World

    private tomatoes: PhysicalTomato[] = []
    private physicsDebug: CannonDebugRenderer;
    private tomatoModel: Group;

    private dropped = false

    constructor(tomatoParams: TomatoParams) {
        super();
        this.tomatoParams = tomatoParams
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)

        this.ambientLight = new AmbientLight('#ffffff', 0.2)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#ffffff', 0.9)
        this.pointLight.position.x = 3
        this.pointLight.position.y = 2
        this.pointLight.position.z = 2
        this.scene.add(this.pointLight)
        this.scene.add(new PointLightHelper(this.pointLight))

        this.camera.position.set(-5, 4, 10)
        this.camera.lookAt(0, 0, 0)
        const {loader} = growLoader

        this.tomatoModel = growLoader.loader.getFBX('tomato')

        // physics
        this.world = new World({
            gravity: new Vec3(0, -9.82, 0), // m/s²
        })

        this.createTomato(new Vector3(
            3, 0, 0
        ))

        const planeGeometry = new PlaneGeometry(25, 25)
        const planeMesh = new Mesh(planeGeometry, new MeshPhongMaterial())
        planeMesh.rotateX(-Math.PI / 2)
        planeMesh.position.y = -8
        this.scene.add(planeMesh)
        const planeShape = new Plane()
        const planeBody = new Body({mass: 0})
        planeBody.addShape(planeShape)
        planeBody.quaternion.set(
            planeMesh.quaternion.x,
            planeMesh.quaternion.y,
            planeMesh.quaternion.z,
            planeMesh.quaternion.w,
        )
        planeBody.position.set(
            planeMesh.position.x,
            planeMesh.position.y,
            planeMesh.position.z,
        )
        this.world.addBody(planeBody)

        this.physicsDebug = new CannonDebugRenderer(this.scene, this.world)
        this.enableControls()
        this.setupPostProcessing()
    }

    private onStep(state: any) {
    }

    private createTomato(position: Vector3) {
        const tomato = new Tomato(this.tomatoParams, this.tomatoModel.clone())
        const scale = 0.3
        tomato.mesh.scale.setScalar(scale)
        tomato.mesh.position.copy(position)
        this.scene.add(tomato.mesh)
        const tomatoGeometry = tomato.bodyWorldGeometry
        tomatoGeometry.scale(scale, scale, scale)
        const tomatoShape = createTrimesh(tomatoGeometry)
        const tomatoBody = new Body({mass: 1})
        tomatoBody.addShape(tomatoShape)
        // const tomatoPosition = tomato.body.localToWorld(tomato.body.position.clone())
        tomatoBody.position.x = tomato.mesh.position.x
        tomatoBody.position.y = tomato.mesh.position.y
        tomatoBody.position.z = tomato.mesh.position.z
        this.world.addBody(tomatoBody)
        this.tomatoes.push({
            tomato,
            body: tomatoBody
        })
    }

    private updateTomato(p: PhysicalTomato) {
        const {tomato, body} = p
        const mesh = tomato.mesh
        mesh.position.set(
            body.position.x,
            body.position.y,
            body.position.z,
        )
        mesh.quaternion.set(
            body.quaternion.x,
            body.quaternion.y,
            body.quaternion.z,
            body.quaternion.w,
        )
    }

    dropTomatoes() {
        this.dropped = true
    }

    animate() {
        // this.mixer.update(this.clock.getDelta())
        const deltaTime = this.clock.getDelta()
        if (this.dropped) {
            this.world.step(deltaTime)
            this.tomatoes.forEach(p => {
                this.updateTomato(p)
            })
        }
        this.physicsDebug?.update()

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
