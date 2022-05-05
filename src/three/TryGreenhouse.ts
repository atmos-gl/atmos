import {AmbientLight, PCFSoftShadowMap, PointLight} from 'three';
import {BaseScene} from './BaseScene';
import {Box} from './objects/Box';
import useDragAnimation, {DragAnimation} from './three-composables/useDragAnimations';
import sequenceManager from '../managers/sequenceManager';
import {animate, createExpoIn, easeInOut, mirrorEasing} from 'popmotion';
import {animateAsync} from '../utils';

export class TryGreenhouse extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private box: Box;
    private xOffset: number;
    private openDoorInteraction: DragAnimation;


    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFSoftShadowMap
        // this.enableControls()
        this.ambientLight = new AmbientLight('#aedaea', 0.4)
        this.scene.add(this.ambientLight)

        // const pointLight = new PointLight('#fff', 0.4)
        // pointLight.position.x = -10
        // pointLight.position.y = 10
        // pointLight.position.z = 10
        // this.scene.add(pointLight)
        this.pointLight = new PointLight('#9da2a6', 1.2)
        this.pointLight.position.x = 7
        this.pointLight.position.y = 12
        this.pointLight.position.z = 14
        this.pointLight.castShadow = true
        this.pointLight.shadow.mapSize.width = 1024
        this.pointLight.shadow.mapSize.height = 1024
        this.pointLight.shadow.radius = 3
        this.scene.add(this.pointLight)

        this.box = new Box(this)
        this.scene.add(this.box.mesh)

        this.camera.position.x = 4
        this.camera.position.y = 5
        this.camera.position.z = 25
        this.camera.lookAt(0, 2, 0)

        // this.scene.add(new Mesh(
        //     new BoxGeometry(5, 5),
        //     new MeshPhongMaterial({color: '#f00'})
        // ))

        this.resizeRendererToDisplaySize()
        this.camera.updateMatrixWorld()
        this.openDoorInteraction = useDragAnimation(this.box.door, this.canvas, this.camera)

        this.openDoorInteraction.bind()
        this.box.door.onOpen = () => {
            this.openDoorInteraction.unbind()
            sequenceManager.send('next')
        }

        sequenceManager.onTransition(state => this.onStep(state))

        setTimeout(() => {
            this.resizeRendererToDisplaySize()
        }, 2000)

        setTimeout(() => {
            console.log(`Rendering ${this.renderer.info.render.triangles} triangles`)
        }, 0)
    }

    async moveCamera(from, to) {
        await animateAsync({
            from,
            to,
            onUpdate: (val) => {
                const {x, y, z, tx, ty, tz} = val
                this.camera.position.set(x, y, z)
                this.camera.lookAt(tx, ty, tz)
            },
            duration: 1500,
            ease: mirrorEasing(createExpoIn(4)),
        })
    }

    async onStep(state: any) {
        if (state.value.setupPowerBlock === 'plugCO2') {
            const from = {
                ...this.camera.position,
                tx: 0,
                ty: 2,
                tz: 0,
            }
            const to = {
                x: 2,
                y: 0,
                z: 12,
                tx: 2,
                ty: 0,
                tz: 0,
            }
            await this.moveCamera(from, to)
            this.box.co2Bottle.onFinished = () => {
                sequenceManager.send('next')
            }
            await this.box.co2Bottle.show()
            return
        }

        if (state.value.setupPowerBlock === 'plugWater') {
            this.box.waterBottle.onFinished = () => {
                sequenceManager.send('next')
            }
            await this.box.waterBottle.show()
            return
        }

        if (state.value.setupPowerBlock === 'pourFertilizer') {
            const from = {
                ...this.camera.position,
                tx: 2,
                ty: 0,
                tz: 0,
            }
            const to = {
                x: 12,
                y: 5,
                z: -2,
                tx: 2,
                ty: 1,
                tz: -2,
            }
            await this.moveCamera(from, to)
        }
    }

    animate() {
        this.box.animate(this.clock.getDelta())
        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
