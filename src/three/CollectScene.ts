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
import {World, Vec3, Body, Plane, Box, Sphere, ConvexPolyhedron, Material, ContactMaterial} from 'cannon-es'
import CannonDebugRenderer, {createPolyHedron, createTrimesh} from './utils/physics';
import {delay} from '../utils';
import {animate, createExpoIn, mirrorEasing} from 'popmotion';
import sequenceManager from '../managers/sequenceManager';
import {Ref, watch} from 'vue';

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

    private tomatoScale = 0.25
    private lastShownTomato = 0

    constructor(tomatoParams: TomatoParams, progress: Ref<number>) {
        super();
        this.tomatoParams = tomatoParams

        watch(progress, p => this.updateProgress(p))
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)

        this.ambientLight = new AmbientLight('#ffffff', 0.2)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#ffffff', 0.9)
        this.pointLight.position.x = 15
        this.pointLight.position.y = 10
        this.pointLight.position.z = 10
        this.scene.add(this.pointLight)
        // this.scene.add(new PointLightHelper(this.pointLight))

        this.camera.position.set(0, 0, 25)
        this.camera.lookAt(0, 0, 0)
        const {loader} = growLoader

        // const cart = loader.getGLTF('cart').scene
        const cart = loader.getFBX('cart')
        console.log(cart)
        cart.scale.setScalar(0.06)
        cart.position.y = -15
        this.scene.add(cart)

        this.tomatoModel = loader.getFBX('tomato')

        // physics
        this.world = new World({
            gravity: new Vec3(0, -30, 0), // m/s²
        })
        this.world.defaultContactMaterial.contactEquationRelaxation = 10000
        this.world.defaultContactMaterial.friction = 100
        this.world.defaultContactMaterial.restitution = 0

        this.createTomatoes()
        this.createCartGround()

        // this.physicsDebug = new CannonDebugRenderer(this.scene, this.world)
        // this.enableControls()
        this.scene.rotation.y = -Math.PI / 2

        // this.enableControls()
        this.setupPostProcessing()
    }

    private updateProgress(progress: number) {
        const currentProgress = this.lastShownTomato / this.tomatoes.length
        if (progress / 100 > currentProgress) {
            const tomato = this.tomatoes[this.lastShownTomato]
            animate({
                from: 0,
                to: this.tomatoScale,
                onUpdate: v => tomato.tomato.mesh.scale.setScalar(v)
            })
            this.lastShownTomato++
        }
    }

    private createTomatoes() {
        this.createTomato(new Vector3(
            2, 0, 4
        ))
        this.createTomato(new Vector3(
            -1, 4, 0
        ))
        this.createTomato(new Vector3(
            2, 2, -5
        ))
        this.createTomato(new Vector3(
            -3, 5, 5
        ), new Vec3(0, 8, 0))
        this.createTomato(new Vector3(
            3, -1, 0.5
        ), new Vec3(0, 8, 0))
        this.createTomato(new Vector3(
            -2, 10, 3
        ), new Vec3(0, 8, 0))
        this.createTomato(new Vector3(
            3, 11, -5
        ), new Vec3(0, 8, 0))
        this.createTomato(new Vector3(
            -4, 8, -7
        ), new Vec3(0, 8, 0))
    }

    private createCartGround() {
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
            // this.scene.add(planeMesh)
            const planeShape = new Box(new Vec3(10, 10, 0.2))
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
            console.log(planeMesh.position, planeMesh.rotation)
        }
        createPlane(
            new Vector3(0, -19.6, 0),
            new Euler(-Math.PI / 2, 0, 0),
        )
        createPlane(
            new Vector3(-4.7, -15, 0),
            new Euler(-0.086, Math.PI / 2, 0, 'YXZ'),
        )
        createPlane(
            new Vector3(0, -15, 7.5),
            new Euler(0.086, 0, 0),
        )
        createPlane(
            new Vector3(4.7, -15, 0),
            new Euler(0.086, Math.PI / 2, 0, 'YXZ'),
        )
        createPlane(
            new Vector3(0, -15, -7.5),
            new Euler(-0.086, 0, 0),
        )
        // createPlane(
        //     new Vector3(4.5, -18, 0),
        //     new Euler(0.3, Math.PI / 2, 0, 'YXZ'),
        // )
    }

    private createTomato(position: Vector3, velocity: Vec3 = new Vec3(0, 0, 0)) {
        const tomato = new Tomato(this.tomatoParams, this.tomatoModel.clone())
        const scale = this.tomatoScale
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
        const material = new Material({
            friction: 10,
            restitution: 0,
        })
        const tomatoBody = new Body({
            mass: 1000,
            linearDamping: 0.00005,
            material,
            velocity
        })
        tomatoBody.addShape(tomatoShape)
        // const tomatoPosition = tomato.body.localToWorld(tomato.body.position.clone())
        const spherePosition = boundingsphere.center.multiplyScalar(scale)
        tomatoBody.position.x = tomato.mesh.position.x + spherePosition.x
        tomatoBody.position.y = tomato.mesh.position.y + spherePosition.y
        tomatoBody.position.z = tomato.mesh.position.z + spherePosition.z
        this.world.addBody(tomatoBody)
        tomato.mesh.scale.setScalar(0)
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

    async dropTomatoes() {
        this.dropped = true
        await this.camera.move({
            x: 0,
            y: -5,
            z: 30,
            tx: 0,
            ty: -10,
            tz: 0,
        }, null, 1000)
        await delay(500)

        // Final cam move
        const duration = 1500
        const ease = mirrorEasing(createExpoIn(2))
        animate({
            from: this.scene.rotation.y,
            to: 0,
            duration,
            ease,
            onUpdate: (v) => {
                this.scene.rotation.y = v
            }
        })
        await this.camera.move({
                x: 0,
                y: 20,
                z: 0,
                tx: 0,
                ty: -10,
                tz: 0,
            },
            null, duration, ease)
        await delay(300)
        sequenceManager.send('dropped')
        await delay(3000)
        this.dropped = false // Stop physics simulation
    }

    public getSceneJson() {
        return JSON.stringify(this.scene.toJSON())
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
