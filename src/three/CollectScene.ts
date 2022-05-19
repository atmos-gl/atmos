import {
    AmbientLight, DoubleSide, Euler,
    Group,
    Mesh,
    MeshPhongMaterial,
    PlaneGeometry,
    PointLight,
    PointLightHelper, PolyhedronGeometry, SphereGeometry,
    Vector3
} from 'three';
import {BaseScene} from './BaseScene';
import {Tomato, TomatoParams} from './objects/Tomato';
import {growLoader} from '../composables/useLoader';
import {World, Vec3, Body, Plane, Sphere, ConvexPolyhedron} from 'cannon-es'
import CannonDebugRenderer, {createPolyHedron, createTrimesh} from './utils/physics';

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

        this.camera.position.set(30, 0, -30)
        this.camera.lookAt(0, -20, 0)
        const {loader} = growLoader

        const cart = loader.getGLTF('cart').scene
        console.log(cart)
        cart.scale.setScalar(0.3)
        cart.position.y = -20
        this.scene.add(cart)

        this.tomatoModel = loader.getFBX('tomato')

        // physics
        this.world = new World({
            gravity: new Vec3(0, -9.82, 0), // m/s²
        })

        this.createTomato(new Vector3(
            2, 0, 0
        ))
        this.createTomato(new Vector3(
            -1, 4, 0
        ))
        this.createCartGround()

        this.physicsDebug = new CannonDebugRenderer(this.scene, this.world)
        this.enableControls()

        this.controls.target.y = -10
        this.setupPostProcessing()

        // @ts-ignore
        window.heee = this.dropTomatoes.bind(this)
    }

    private onStep(state: any) {
    }

    createCartGround() {
        const createPlane = (
            position = new Vector3(0, 0, 0),
            rotation = new Euler(0, 0, 0)
        ) => {
            const planeGeometry = new PlaneGeometry(15, 15)
            const planeMesh = new Mesh(planeGeometry, new MeshPhongMaterial({
                side: DoubleSide,
                transparent: true,
                opacity: 0.3
            }))
            planeMesh.position.copy(position)
            planeMesh.rotation.copy(rotation)
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
        }
        createPlane(
            new Vector3(0, -22, 0),
            new Euler(-Math.PI / 2, 0, 0),
        )
        createPlane(
            new Vector3(-4.5, -18, 0),
            new Euler(-0.3, Math.PI / 2, 0, 'YXZ'),
        )
        createPlane(
            new Vector3(0, -18, 8),
            new Euler(0.3, 0, 0),
        )
        // createPlane(
        //     new Vector3(4.5, -18, 0),
        //     new Euler(0.3, Math.PI / 2, 0, 'YXZ'),
        // )
    }

    private createTomato(position: Vector3) {
        const tomato = new Tomato(this.tomatoParams, this.tomatoModel.clone())
        const scale = 0.3
        tomato.mesh.scale.setScalar(scale)
        tomato.mesh.position.copy(position)
        this.scene.add(tomato.mesh)
        const geometry = tomato.bodyWorldGeometry
        geometry.computeBoundingSphere()
        const boundingsphere = geometry.boundingSphere
        const tomatoGeometry = new SphereGeometry(boundingsphere.radius)
        tomatoGeometry.scale(scale, scale, scale)
        // const tomatoShape = createPolyHedron(tomatoGeometry)
        let ratio = this.tomatoParams.long / this.tomatoParams.size
        const tomatoShape = new Sphere(boundingsphere.radius * scale)
        // const polyhedronGeometry = new PolyhedronGeometry(null, null, 3, 5)
        // const tomatoShape = new ConvexPolyhedron()
        // tomatoShape.sca
        const tomatoBody = new Body({mass: 1})
        tomatoBody.addShape(tomatoShape)
        // const tomatoPosition = tomato.body.localToWorld(tomato.body.position.clone())
        const spherePosition = boundingsphere.center.multiplyScalar(scale)
        tomatoBody.position.x = tomato.mesh.position.x + spherePosition.x
        tomatoBody.position.y = tomato.mesh.position.y + spherePosition.y
        tomatoBody.position.z = tomato.mesh.position.z + spherePosition.z
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
            try {
                this.world.step(deltaTime)
            } catch (e) {
                console.log(e)
            }
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
