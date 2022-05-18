import {AnimationAction, AnimationClip, AnimationMixer, LoopOnce, Mesh, MeshStandardMaterial, Object3D} from 'three';
import {BaseScene} from '../BaseScene';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';

export default class Plant {
    public object: Object3D;

    private scene: BaseScene;
    private model: GLTF;
    private mixer: AnimationMixer;
    private animationAction: AnimationAction;

    constructor(model: GLTF, scene: BaseScene) {
        this.model = model
        this.scene = scene

        this.object = model.scene.clone()

        this.init()
    }

    init() {
        const mat = (this.object.getObjectByName("Plant_tomate_Feuille_(Copy)") as Mesh).material as MeshStandardMaterial
        mat.metalness = 0.05
        mat.roughness = 0.5
        this.object.scale.set(1.3, 1.3, 1.3)

        this.mixer = new AnimationMixer(this.object)
        this.animationAction = this.mixer.clipAction(AnimationClip.findByName(this.model.animations, 'animation_0'))
        this.animationAction.setLoop(LoopOnce, 1)
        this.animationAction.clampWhenFinished = true
        this.animationAction.play()
        this.animationAction.paused = true
    }

    grow() {
        this.animationAction.paused = false
        return new Promise<void>(resolve => {
            this.mixer.addEventListener('finished', () => {
                resolve()
            })
        })
    }

    animate(deltaTime: number) {
        this.mixer.update(deltaTime)
    }

}
