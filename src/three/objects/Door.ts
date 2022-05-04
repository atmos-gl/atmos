import {MathUtils, Object3D} from 'three';
import {DragAnimatable} from '../three-composables/useDragAnimations';
import {animate} from 'popmotion';

export default class Door implements DragAnimatable{
    private object: Object3D;
    public handle: Object3D;
    private _open = 0

    private minRotation = 0;
    private maxRotation = 2;

    public onOpen?: () => void

    constructor(object: Object3D) {
        this.object = object

        this.handle = this.object.children.find(obj => obj.name === 'poignee')
        this.minRotation = this.object.rotation.y
    }

    set animationProgress(factor: number) {
        factor = MathUtils.clamp(factor, 0, 1)
        this._open = factor
        this.object.rotation.y = -factor * (this.maxRotation - this.minRotation) + this.minRotation
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
}
