import {AnimationAction, AnimationClip, AnimationMixer, LoopOnce, MathUtils, Mesh, Object3D, Vector2} from 'three';
import {BaseScene} from '../BaseScene';
import {getMetalMaterial} from '../materials/metalMaterials';
import useDragAnimation, {DragAnimatable, DragAnimation} from '../three-composables/useDragAnimations';
import {animate} from 'popmotion';


export default class Fertilizer implements DragAnimatable {
    public object: Object3D;

    private scene: BaseScene;
    private visibleOpacity: number;
    private initialX: number;

    public onFinished?: () => void;
    private mixer: AnimationMixer;
    private animClip: AnimationClip;
    private action: AnimationAction;
    private progress: number;
    public movement = new Vector2(-0.4, -0.4)

    private animationBounds: Array<number> = [ 0.345, 3 ]
    private fertilizerAnimation: DragAnimation;

    private dragThreshold = 0.5
    private hasEnded = false

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
        this.action.clampWhenFinished = true
        this.action.play()

        this.progress = this.animationBounds[0]

        this.fertilizerAnimation = useDragAnimation(this, this.scene.canvas, this.scene.camera)
        // console.log('play ?')
        // this.object.visible = false
        // this.setOpacity(0)
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

    public snapAnimation() {
        const shouldEnd = this.animationProgress > this.dragThreshold
        const to = shouldEnd ? this.animationBounds[1] : 0;
        const duration = shouldEnd ? 2000 : 500
        animate({
            from: this.animationProgress,
            to,
            onUpdate: val => {
                this.animationProgress = val
            },
            duration
        })
    }

    async show() {
        this.fertilizerAnimation.bind()
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

}
