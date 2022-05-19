import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    Group,
    LoopOnce,
    Mesh,
    MeshStandardMaterial,
    Object3D
} from 'three';
import {BaseScene} from '../BaseScene';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import {Tomato, TomatoParams} from './Tomato';
import {growLoader} from '../../composables/useLoader';

export default class Plant {
    public object: Object3D;

    private scene: BaseScene;
    private model: GLTF;
    private mixer: AnimationMixer;
    private animationAction: AnimationAction;
    private tomatoParams: TomatoParams;

    private tomatoes: Tomato[] = []
    private tomatoModel: Group;

    constructor(model: GLTF, tomatoModel: Group, scene: BaseScene, tomatoParams: TomatoParams) {
        this.model = model
        this.tomatoModel = tomatoModel
        this.scene = scene

        this.object = model.scene.clone()
        console.log(this.model)

        this.tomatoParams = tomatoParams

        this.init()
        this.initTomatoes()
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

    initTomatoes() {
        for (const object of this.object.children) {
            if (
                object.name.includes('Groupe_Tomate')
            ) {
                for (const child of object.children) {
                    object.remove(child)
                }
                const model = this.tomatoModel.clone(true)
                model.scale.set(0.7, 0.7, 0.7)
                model.position.set(0, -4, 0)
                const tomato = new Tomato(this.tomatoParams, model)
                tomato.updateParams()
                object.add(tomato.mesh)
                this.tomatoes.push(tomato)
            }
        }
    }

    updateTomatoes() {
        this.tomatoes.forEach(tomato => tomato.updateParams())
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
