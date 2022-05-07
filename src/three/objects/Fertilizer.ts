import {AnimationAction, AnimationClip, AnimationMixer, LoopOnce, Mesh, Object3D} from 'three';
import {createExpoIn, reverseEasing} from 'popmotion';
import {BaseScene} from '../BaseScene';
import {animateAsync} from '../../utils';
import {getMetalMaterial} from '../materials/metalMaterials';


export default class Fertilizer {
    public object: Object3D;

    private scene: BaseScene;
    private visibleOpacity: number;
    private initialX: number;

    public onFinished?: () => void;
    private mixer: AnimationMixer;
    private animClip: AnimationClip;
    private action: AnimationAction;
    private progress: number;

    constructor(object: Object3D, scene: BaseScene, animationClip: AnimationClip) {
        this.object = object
        this.scene = scene

        this.animClip = animationClip

        this.init()
    }

    init() {
        this.object.traverse(object => {
            if (object instanceof Mesh) {
                this.visibleOpacity = object.material.opacity
            }
        })
        this.object.getObjectByName('reservoir_pillule').visible = false

        const bottleMesh = this.object.getObjectByName('Bouteille_ouverte') as Mesh
        bottleMesh.material = getMetalMaterial()
        //
        this.mixer = new AnimationMixer(this.object)
        this.action = this.mixer.clipAction(this.animClip)
        this.action.setLoop(LoopOnce, 1)
        this.action.clampWhenFinished = true
        this.action.play()

        this.progress = 0.345
        this.scene.gui.add(this, 'progress').min(0.345).max(3)
        // console.log('play ?')
        // this.object.visible = false
        // this.setOpacity(0)
    }
    async show() {
        this.action.play()
        // this.object.visible = true
        // await animateAsync({
        //     from: {
        //         translate: this.object.position.x,
        //         opacity: 0
        //     },
        //     to: {
        //         translate: this.initialX,
        //         opacity: this.visibleOpacity
        //     },
        //     onUpdate: v => {
        //         this.object.position.x = v.translate
        //         this.setOpacity(v.opacity)
        //     },
        //     ease: reverseEasing(createExpoIn(4)),
        //     duration: 1000
        // })
    }

    setOpacity(o) {
        this.object.traverse(object => {
            if (object instanceof Mesh) {
                object.material.opacity = o
            }
        })
    }

    animate(deltaTime: number) {
        // this.mixer.update(deltaTime)
        this.mixer.setTime(this.progress)
    }

    async snap() {
    }

}
