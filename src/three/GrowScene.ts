import {AmbientLight, AnimationClip, AnimationMixer, PointLight} from 'three';
import {BaseScene} from './BaseScene';
import {powerBlockLoader} from '../composables/useLoader';

export class GrowScene extends BaseScene {

    private ambientLight: AmbientLight
    private pointLight: PointLight;
    private mixer: AnimationMixer;

    public init(canvas: HTMLCanvasElement) {
        super.init(canvas)
        this.ambientLight = new AmbientLight('#b5c7ef', 2)
        this.scene.add(this.ambientLight)

        this.pointLight = new PointLight('#c4a8a8', 2)
        this.pointLight.position.y = 200
        this.scene.add(this.pointLight)

        this.enableControls()

        // Temporary test
        const {loader} = powerBlockLoader
        const gltf = loader.getGLTF('plant')
        console.log(gltf)
        this.scene.add(gltf.scene)
        this.mixer = new AnimationMixer(gltf.scene)
        const action = this.mixer.clipAction(AnimationClip.findByName(gltf.animations, 'animation_0'))
        //
        // const mat = gltf.scene.getObjectByName("Plant_tomate_Feuille_(Copy)").material
        // ;mat.color = new Color('#fff');
        // mat.metalness = 0
        // console.log(mat)
        // action.play()
        this.setupPostProcessing()
    }

    animate() {
        this.mixer.update(this.clock.getDelta())
        super.animate()
    }

    // Memory management
    destroy() {
        super.destroy()
    }
}
