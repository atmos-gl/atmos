import {AmbientLight, PCFSoftShadowMap, PointLight} from 'three';
import {BaseScene} from './BaseScene';
import {Box} from './objects/Box';
import useDragAnimation, {DragAnimation} from './three-composables/useDragAnimations';
import setupSequenceManager from '../managers/setupSequenceManager';
import {createExpoIn, easeInOut, mirrorEasing} from 'popmotion';
import {computed} from 'vue';


export class SetupPowerBlock extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private box: Box;
    private xOffset: number;
    private openDoorInteraction: DragAnimation;

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFSoftShadowMap
        this.renderer.setClearAlpha(0.1)
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
        this.camera.lookAt(2, 2, 0)

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
            setupSequenceManager.send('doorOk')
        }


        setupSequenceManager.onTransition(state => this.onStep(state))

        setTimeout(() => {
            console.log(`Rendering ${this.renderer.info.render.triangles} triangles`)
        }, 0)
    }

    get co2BottleUi() {
        return this.box.co2Bottle.ui.state
    }
    get waterBottleUi() {
        return this.box.waterBottle.ui.state
    }
    get fertilizerUi() {
        return this.box.fertilizer.ui.state
    }

    async onStep(state: any) {
        if (state.value.setupPowerBlock === 'plugCO2') {
            const to = {
                x: 3,
                y: 0,
                z: 12,
                tx: 3,
                ty: 0,
                tz: 0,
            }
            await this.camera.move(to)
            this.box.co2Bottle.onFinished = () => {
                setupSequenceManager.send('co2Ok')
            }
            await this.box.co2Bottle.show()
            return
        }

        if (state.value.setupPowerBlock === 'plugWater') {
            this.box.waterBottle.onFinished = () => {
                setupSequenceManager.send('waterOk')
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
            this.box.tray.onOpen = async () => {
                this.box.tray.disable()
                await this.camera.move({
                    x: 5,
                    y: 5.5,
                    z: 5,
                    tx: 4,
                    ty: 3,
                    tz: 0.5,
                }, null, 600, mirrorEasing(createExpoIn(3)))
                this.box.fertilizer.show()
                this.box.fertilizer.onFinished = () => {
                    setupSequenceManager.send('fertilizerOk')
                    setupSequenceManager.send('uraniumOk')
                }
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
