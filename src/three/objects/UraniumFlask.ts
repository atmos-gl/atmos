import Bottle from './Bottle';
import {AnimationAction, AnimationClip, AnimationMixer, Mesh, Object3D, Vector2, Vector4} from 'three';
import {SetupPowerBlock} from '../SetupPowerBlock';

export default class UraniumFlask extends Bottle {
    public onConnected?: () => void
    private clip: AnimationClip;
    private animationMixer: AnimationMixer;
    private uraniumAction: AnimationAction;
    constructor({
                    object,
                    targetObjectMesh,
                    scene,
                }: { object: Object3D, targetObjectMesh: Mesh, scene: SetupPowerBlock, clamp?: Vector4, screwDirection?: number, initialPosition?: Vector2 }, clip: AnimationClip) {
        super({
            object,
            targetObjectMesh,
            scene,
            clamp: new Vector4(
                -120, 330,
                365, 450
            ),
            screwDirection: 1,
            initialPosition: new Vector2(200, 140)
        });
        clip.tracks.pop()
        this.clip = clip
        this.setupAnimation()
    }
    setupPositions() {
        super.setupPositions()
        const pos = this.object.position.z
        this.xToZ = (x) => pos
        this.xToRotate = (x) => 0
        this.object.position.x -= 200 // Cancel animation
        this.targetPosition.y += 50
    }

    async snap(): Promise<void> {
        this.screwDirection = 0
        await super.snap();
        this.onConnected?.()
    }

    private setupAnimation() {
        this.animationMixer = new AnimationMixer(this.object)
        this.uraniumAction = this.animationMixer.clipAction(this.clip)
    }

    public fallPill() {
        this.uraniumAction.play()
    }
    public animate(deltaTime: number) {
        this.animationMixer.update(deltaTime)
    }
}
