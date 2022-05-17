import {AmbientLight, AnimationMixer, PointLight, Vector3} from 'three';
import {BaseScene} from './BaseScene';
import {Tomato, TomatoParams} from './objects/Tomato';
import {growLoader} from '../composables/useLoader';
import sequenceManager from '../managers/sequenceManager';
import {animateAsync} from '../utils';
import {createExpoIn} from 'popmotion';

export class GrowScene extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private mixer: AnimationMixer;
    private tomatoParams: TomatoParams;
    private tomato: Tomato;

    constructor(tomatoParams: TomatoParams) {
        super();
        this.tomatoParams = tomatoParams
    }

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)

        this.ambientLight = new AmbientLight('#ffffff', 0.2)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#ffffff', 0.9)
        this.pointLight.position.x = 30
        this.pointLight.position.y = 20
        this.pointLight.position.z = -10
        this.scene.add(this.pointLight)

        this.camera.position.set(25, 20, 30)
        this.camera.lookAt(0, 0, 0)
        // Temporary test
        // const {loader} = powerBlockLoader
        // const gltf = loader.getGLTF('plant')
        // console.log(gltf)
        // this.scene.add(gltf.scene)
        // this.mixer = new AnimationMixer(gltf.scene)
        // const action = this.mixer.clipAction(AnimationClip.findByName(gltf.animations, 'animation_0'))
        // //
        // const mat = gltf.scene.getObjectByName("Plant_tomate_Feuille_(Copy)").material
        // ;mat.color = new Color('#fff');
        // mat.metalness = 0
        // // console.log(mat)
        // action.play()

        this.tomato = new Tomato(this.tomatoParams, growLoader.loader.getFBX('tomato'))

        this.scene.add(this.tomato.mesh)

        sequenceManager.onTransition(state => this.onStep(state))

        this.setupPostProcessing()
    }

    private onStep(state: any) {
        if (state.value === 'grow') {
            this.transitionToGrow()
        }
    }

    private async transitionToGrow() {
        await animateAsync({
            from: this.tomato.mesh.scale,
            to: new Vector3(0, 0, 0),
            ease: createExpoIn(4),
            duration: 500,
            onUpdate: v => {
                this.tomato.mesh.scale.set(
                    v.x,
                    v.y,
                    v.z,
                )
            }
        })
    }

    animate() {
        // this.mixer.update(this.clock.getDelta())
        const deltaTime = this.clock.getDelta()
        if (this.tomato.mesh.visible) {
            this.tomato.animate(deltaTime)
        }

        this.tomato.mesh.rotateX(deltaTime * 0.2)
        this.tomato.mesh.rotateY(deltaTime * 0.2)
        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
