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
        this.ambientLight = new AmbientLight('#b5c7ef', 0.4)
        this.scene.add(this.ambientLight)

        // const pointLight = new PointLight('#fff', 0.4)
        // pointLight.position.x = -10
        // pointLight.position.y = 10
        // pointLight.position.z = 10
        // this.scene.add(pointLight)
        this.pointLight = new PointLight('#c4a8a8', 1.2)
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
            console.log(`Rendering ${this.renderer.info.render.triangles} triangles`)
        }, 0)
    }

    async onStep(state: any) {
        if (state.value.setupPowerBlock === 'plugCO2') {
            const to = {
                x: 2,
                y: 0,
                z: 12,
                tx: 2,
                ty: 0,
                tz: 0,
            }
            await this.camera.move(to)
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
            await this.camera.move({
                x: 5,
                y: 5,
                z: 5,
                tx: 4,
                ty: 2,
                tz: 0.5,
            })
            this.box.tray.enable()
            this.box.tray.onOpen = () => {
                this.box.tray.disable()
                this.camera.move({
                    x: 5,
                    y: 5.5,
                    z: 5,
                    tx: 4,
                    ty: 3,
                    tz: 0.5,
                })
            }
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
