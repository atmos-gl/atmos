import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    LoopOnce,
    MathUtils,
    Mesh,
    MeshPhongMaterial,
    Object3D,
    Vector2
} from 'three';
import {BaseScene} from '../BaseScene';
import {getMetalMaterial} from '../materials/metalMaterials';
import useDragAnimation, {DragAnimatable, DragAnimation} from '../three-composables/useDragAnimations';
import {animate} from 'popmotion';
import {animateAsync, delay} from '../../utils';
import useUiTip, {UiTip} from '../three-composables/useUiTip';


export default class Fertilizer implements DragAnimatable {
    public object: Object3D;

    private scene: BaseScene;
    private initialX: number;

    public onFinished?: () => void;
    private mixer: AnimationMixer;
    private animClip: AnimationClip;
    private action: AnimationAction;
    private progress: number;
    public movement = new Vector2(-0.4, -0.4)

    private animationBounds: Array<number> = [ 0.345, 3 ]
    private fertilizerAnimation: DragAnimation;

    private dragThreshold = 0.7
    private hasEnded = false
    private bottleMesh: Mesh;

    public ui: UiTip;

    constructor(object: Object3D, scene: BaseScene, animationClip: AnimationClip) {
        this.object = object
        this.scene = scene

        this.animClip = animationClip

        this.init()
    }

    init() {
        this.object.getObjectByName('reservoir_pillule').visible = false

        this.bottleMesh = this.object.getObjectByName('Bouteille_ouverte') as Mesh
        this.bottleMesh.material = getMetalMaterial()
        //
        this.mixer = new AnimationMixer(this.object)
        this.action = this.mixer.clipAction(this.animClip)
        this.action.clampWhenFinished = true
        this.action.play()

        this.progress = this.animationBounds[0]

        this.ui = useUiTip(this.object, this.scene)

        this.fertilizerAnimation = useDragAnimation(this, this.scene.canvas, this.scene.camera, {
            onDragStart: async () => {
                await delay(200)
                this.ui.hide()
            }
        })
        // this.object.visible = false
        this.setVisibility(false)
        this.bottleMesh.material.opacity = 0
    }

    get animationProgress() {
        return this.progress - 0.345
    }

    set animationProgress(set) {
        this.progress = MathUtils.clamp(set + 0.345, this.animationBounds[0], this.animationBounds[1])
        if (!this.hasEnded && this.animationProgress > this.dragThreshold) {
            this.fertilizerAnimation.unbind()
            this.hasEnded = true
            this.snapAnimation()
        }
    }

    animationProgressBy(offset: number): void {
        this.animationProgress = this.animationProgress + offset
    }

    get handle() {
        return this.object
    }

    public async snapAnimation() {
        const shouldEnd = this.animationProgress > (this.dragThreshold - 0.1)
        const to = shouldEnd ? this.animationBounds[1] : 0;
        const duration = shouldEnd ? 2500 : 500
        await animateAsync({
            from: this.animationProgress,
            to,
            onUpdate: val => {
                this.animationProgress = val
            },
            duration
        })
        this.onFinished?.()
    }

    async show() {
        this.fertilizerAnimation.bind()
        this.bottleMesh.visible = true
        await animateAsync({
            from: {
                translate: this.object.position.x,
                opacity: 0
            },
            to: {
                translate: this.initialX,
                opacity: 1
            },
            onUpdate: v => {
                // this.object.position.x = v.translate
                ;(this.bottleMesh.material as MeshPhongMaterial).opacity = v.opacity
            },
            duration: 400
        })
        this.setVisibility(true)
        this.ui.show()
    }

    setVisibility(set: boolean) {
        this.object.traverse(object => {
            if (object instanceof Mesh) {
                object.visible = set
            }
        })
    }

    animate(deltaTime: number) {
        // this.mixer.update(deltaTime)
        this.mixer.setTime(this.progress)
    }

}
