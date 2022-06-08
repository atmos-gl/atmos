import {MathUtils, Object3D} from 'three';
import useDragAnimation, {DragAnimatable, DragAnimation} from '../three-composables/useDragAnimations';
import {animate} from 'popmotion';
import {animateAsync} from '../../utils';
import useUiTip, {UiTip} from '../three-composables/useUiTip';
import {BaseScene} from '../BaseScene';
import sequenceManager from '../../managers/sequenceManager';
import {playSoundEffect, useDoorSoundEffect} from '../../composables/useSoundEffect';

export default class Door implements DragAnimatable{
    public mesh: Object3D;
    public handle: Object3D;
    private _open = 0

    private minRotation = 0.52;
    private maxRotation = 2.5;

    public onOpen?: () => void
    private scene: BaseScene;
    public ui: UiTip;
    private dragAnimation: DragAnimation;

    constructor(object: Object3D, scene: BaseScene) {
        this.mesh = object
        this.scene = scene

        this.handle = this.mesh.getObjectByName('poignee')
        this.mesh.rotation.y = this.minRotation

        this.ui = useUiTip(this.handle, this.scene)

        setTimeout(() => {
            this.dragAnimation = useDragAnimation(this, this.scene.canvas, this.scene.camera, {
                onDragStart: () => {
                    this.ui.hide()
                }
            })
            this.dragAnimation.bind()
            this.onOpen = () => {
                this.dragAnimation.unbind()
                sequenceManager.send('doorOk')
            }
        }, 0)
    }

    set animationProgress(factor: number) {
        factor = MathUtils.clamp(factor, 0, 1)
        this._open = factor
        this.mesh.rotation.y = -factor * (this.maxRotation - this.minRotation) + this.minRotation
        if (factor === 1) {
            this.onOpen?.()
        }
    }

    get animationProgress() {
        return this._open
    }

    public animationProgressBy(offset: number) {
        this.animationProgress = this.animationProgress + offset
    }

    public snapAnimation() {
        const to = this.animationProgress > 0.3 ? 1 : 0;
        this.animateTo(to)
    }

    public openDoor() {
        return this.animateTo(1, 800)
    }
    public closeDoor() {
        return this.animateTo(0, 800)
    }

    private async animateTo(to, duration = 500) {
        if (to === 0) {
            setTimeout(() => playSoundEffect('clacDoor'), duration - 100)
        }
        await animateAsync({
            from: this.animationProgress,
            to,
            onUpdate: val => {
                this.animationProgress = val
            },
            duration
        })
    }
}
