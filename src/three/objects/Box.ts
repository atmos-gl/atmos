import {
    Group,
    Object3D,
    Vector3
} from 'three';
import ResourcesLoader from '../ResourcesLoader';

export class Box {
    private scene: Object3D

    constructor() {
        this.init()
    }

    public init() {
        // const gltf = ResourcesLoader.getInstance().getGLTF('tomato')
        // console.log(gltf)
        // this.importModel(gltf)
    }

    private importModel(fbx: Group) {

    }

    get mesh() {
        return this.scene
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(elapsedTime: number) {

    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.scene = null
    }
}
