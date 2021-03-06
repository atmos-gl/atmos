import {AmbientLight, AnimationMixer, PointLight, PointLightHelper, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {Tomato, TomatoParams} from './objects/Tomato';
import {commonLoader, growLoader} from '../composables/useLoader';
import sequenceManager from '../managers/sequenceManager';
import {animateAsync, delay} from '../utils';
import {createExpoIn, mirrorEasing, reverseEasing} from 'popmotion';
import {Greenhouse} from './objects/Greenhouse';

export class GrowScene extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private tomatoParams: TomatoParams;
    private tomato: Tomato;
    private greenhouse: Greenhouse;

    constructor(tomatoParams: TomatoParams) {
        super('grow');
        this.tomatoParams = tomatoParams
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)

        this.ambientLight = new AmbientLight('#ffffff', 0.2)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#ffffff', 0.9)
        this.pointLight.position.x = 6
        this.pointLight.position.y = 4
        this.pointLight.position.z = 4
        this.scene.add(this.pointLight)
        // this.scene.add(new PointLightHelper(this.pointLight))

        this.camera.position.set(-5, 4, 10)
        this.camera.lookAt(0, 0, 0)
        this.camera.fov = 30
        this.camera.updateProjectionMatrix()

        this.tomato = new Tomato(this.tomatoParams, commonLoader.loader.getFBX('tomato'))
        this.tomato.mesh.scale.set(0.3, 0.3, 0.3)
        this.scene.add(this.tomato.mesh)

        sequenceManager.onTransition(state => this.onStep(state))

        this.greenhouse = new Greenhouse(this.tomatoParams)
        this.scene.add(this.greenhouse.mesh)
        this.greenhouse.mesh.scale.set(0, 0, 0)
        this.greenhouse.mesh.visible = false

        this.setupPostProcessing()
    }

    private async onStep(state: any) {
        if (state.value === 'growReady') {
            this.transitionToGrow()
        }
        if (state.value === 'grow') {
            await this.growTomatoes()
            sequenceManager.send('growOk')
        }
    }

    private async transitionToGrow() {
        const easing = createExpoIn(4)
        this.camera.move({
            x: 0,
            y: 2,
            z: 15,
            tx: 0,
            ty: 0,
            tz: 0,
        })
        await animateAsync({
            from: this.tomato.mesh.scale,
            to: new Vector3(0, 0, 0),
            ease: easing,
            duration: 500,
            onUpdate: v => {
                this.tomato.mesh.scale.set(
                    v.x,
                    v.y,
                    v.z,
                )
            }
        })
        this.tomato.mesh.visible = false
        this.greenhouse.onShow()
        this.greenhouse.mesh.visible = true
        await animateAsync({
            from: this.greenhouse.mesh.scale,
            to: new Vector3(0.01, 0.01, 0.01),
            ease: mirrorEasing(easing),
            duration: 500,
            onUpdate: v => {
                this.greenhouse.mesh.scale.set(
                    v.x,
                    v.y,
                    v.z,
                )
            }
        })
    }

    async growTomatoes() {
        this.camera.move({
        x: 0,
        y: 1,
        z: 10,
        tx: 0,
        ty: 0.5,
        tz: 0,
    }, null, 5000)
        await this.greenhouse.grow()
        this.greenhouse.openDoor()
        await this.camera.move({
            x: 0,
            y: 1,
            z: 6,
            tx: 0,
            ty: 0.5,
            tz: 0,
        }, null)
        await delay(1000)
    }

    animate() {
        if (this.disposed) return
        // this.mixer.update(this.clock.getDelta())
        const deltaTime = this.clock.getDelta()
        if (this.tomato.mesh.visible) {
            this.tomato.animate(deltaTime)
            this.tomato.mesh.rotateX(deltaTime * 0.2)
            this.tomato.mesh.rotateY(deltaTime * 0.2)
        }

        if (this.greenhouse.mesh.visible) {
            this.greenhouse.animate(deltaTime)
        }

        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
