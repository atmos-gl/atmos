import {AmbientLight, Color, Object3D, PCFSoftShadowMap, PointLight} from 'three';
import {BaseScene} from './BaseScene';
import {Box} from './objects/Box';
import useDragAnimation, {DragAnimation} from './three-composables/useDragAnimations';
import sequenceManager from '../managers/sequenceManager';
import {createExpoIn, mirrorEasing} from 'popmotion';
import {EffectPass, OutlineEffect} from 'postprocessing';
import {animate} from 'popmotion';
import {animateAsync, delay} from '../utils';


export class SetupPowerBlock extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private box: Box;
    private xOffset: number;
    private openDoorInteraction: DragAnimation;
    private outlineEffect: OutlineEffect

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFSoftShadowMap
        this.ambientLight = new AmbientLight('#b5c7ef', 0.15)
        this.scene.add(this.ambientLight)

        // const pointLight = new PointLight('#fff', 0.4)
        // pointLight.position.x = -10
        // pointLight.position.y = 10
        // pointLight.position.z = 10
        // this.scene.add(pointLight)
        this.pointLight = new PointLight('#cbbebe', 0.6)
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
        this.camera.position.y = 3
        this.camera.position.z = 18
        this.camera.lookAt(2, 1, 0)

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
            sequenceManager.send('doorOk')
        }
        sequenceManager.onTransition(state => this.onStep(state))

        setTimeout(() => {
            console.log(`Rendering ${this.renderer.info.render.triangles} triangles`)
        }, 0)

        this.setupPostProcessing()
    }

    protected postProcessingPasses() {
        this.outlineEffect = new OutlineEffect(
            this.scene, this.camera, {

            }
        )

        this.outlineEffect.blurPass.enabled = true
        this.outlineEffect.blurPass.kernelSize = 2
        this.outlineEffect.pulseSpeed = 0.5
        this.outlineEffect.edgeStrength = 0
        this.outlineEffect.hiddenEdgeColor = new Color( '#fff')
        // this.outlineEffect.edgeStrength

        this.composer.addPass(new EffectPass(this.camera, this.outlineEffect))
        super.postProcessingPasses();
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
    get trayUi() {
        return this.box.tray.ui.state
    }
    get uraniumFlaskUi() {
        return this.box.uraniumFlask.ui.state
    }

    public showOutline() {
        return animateAsync({
            from: 0,
            to: 8,
            duration: 500,
            onUpdate: v => {
                this.outlineEffect.edgeStrength = v
            }
        })
    }

    public async hideOutline() {
        return animateAsync({
            from: 8,
            to: 0,
            duration: 500,
            onUpdate: v => {
                this.outlineEffect.edgeStrength = v
            }
        })
    }

    public async setSelection(selection: Object3D|Object3D[]) {
        if (!Array.isArray(selection)) {
            selection = [selection]
        }
        this.outlineEffect.selection.set(selection)
        await this.showOutline()
    }
    public async clearSelection () {
        await this.hideOutline()
        this.outlineEffect.selection.clear()
    }

    async onStep(state: any) {
        if (state.value.setupPowerBlock === 'plugCO2') {
            await this.camera.move({
                x: 3,
                y: 0,
                z: 12,
                tx: 3,
                ty: 0,
                tz: 0,
            })
            this.box.co2Bottle.onFinished = () => {
                sequenceManager.send('co2Ok')
            }
            await this.box.co2Bottle.show()
            return
        }

        if (state.value.setupPowerBlock === 'plugWater') {
            this.box.waterBottle.onFinished = () => {
                sequenceManager.send('waterOk')
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
                    sequenceManager.send('fertilizerOk')
                }
            }
        }
        if (state.value.setupPowerBlock === 'putUranium') {
            this.box.fertilizer.hide()
            await this.camera.move({
                x: 2,
                y: 4,
                z: 7,
                tx: 2,
                ty: 3.5,
                tz: 0,
            })
            await this.box.tray.close()
            this.box.uraniumFlask.show()
            this.box.uraniumFlask.onConnected = () => {
                sequenceManager.send('uraniumOk')
            }
        }
        if (state.value.setupPowerBlock === 'start') {
            setTimeout(() => {
                this.box.uraniumFlask.fallPill()}, 200)
            await this.camera.move({
                x: 2,
                y: 2,
                z: 10,
                tx: 2,
                ty: 0,
                tz: 0,
            }, null, 2000)
            this.box.turnLightOn()

            setTimeout(() => this.box.door.closeDoor(), 500)
            await this.camera.move({
                x: 0,
                y: 2,
                z: 18,
                tx: 0,
                ty: 0,
                tz: 0,
            }, null, 2000)
            await delay(500)
            sequenceManager.send('started')
        }
    }

    animate() {
        this.box.animate(this.clock.getDelta())
        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
        console.log(this.box)
    }
}
