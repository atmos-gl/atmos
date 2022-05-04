import {
    AnimationClip,
    AnimationMixer,
    Group,
    Object3D,
    Vector3,
    MathUtils
} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {animate} from 'popmotion';
import {DragAnimatable} from '../three-composables/useDragAnimations';

export class Box implements DragAnimatable {
    public scene: Object3D
    public door: Object3D;
    public handle: Object3D;
    private _open = 0

    private minRotation = 0;
    private maxRotation = 2;

    public onOpen?: () => void

    constructor() {
        this.init()
    }

    public init() {
        const fbx = ResourcesLoader.getInstance().getFBX('box')
        this.importModel(fbx)

    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        this.scene = fbx

        this.door = this.scene.children.find(obj => obj.name === 'porte')
        this.handle = this.door.children.find(obj => obj.name === 'poignee')
        this.minRotation = this.door.rotation.y

    }

    get mesh() {
        return this.scene
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(deltaTime: number) {
        // this.mixer.update(deltaTime)
    }

    set animationProgress(factor: number) {
        factor = MathUtils.clamp(factor, 0, 1)
        this._open = factor
        this.door.rotation.y = -factor * (this.maxRotation - this.minRotation) + this.minRotation
        if (factor === 1) {
            this.onOpen?.()
        }
    }

    get animationProgress() {
        return this._open
    }

    public animationProgressBy(offset: number) {
        console.log(offset)
        this.animationProgress = this.animationProgress + offset
    }

    public snapAnimation() {
        const to = this.animationProgress > 0.3 ? 1 : 0;
        animate({
            from: this.animationProgress,
            to,
            onUpdate: val => {
                this.animationProgress = val
            }
        })
    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.scene = null
    }
}
