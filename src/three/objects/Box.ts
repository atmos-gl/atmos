import {
    AnimationClip,
    AnimationMixer,
    Group,
    Object3D,
    Vector3
} from 'three';
import ResourcesLoader from '../ResourcesLoader';

export class Box {
    public scene: Object3D
    private mixer: AnimationMixer;
    private canvas: HTMLElement;
    public door: Object3D;
    public handle: Object3D;

    private minRotation = 0;
    private maxRotation = 2;

    constructor(canvas: HTMLElement) {
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

    public setOpen(factor: number) {
        this.door.rotation.y = -factor * (this.maxRotation - this.minRotation) + this.minRotation
    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.scene = null
    }
}
