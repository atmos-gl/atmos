import {Group, Object3D} from 'three';
import { headerLoader} from '../../composables/useLoader';
import ResourcesLoader from "../ResourcesLoader";

export class GreenHouse {
    public scene: Object3D

    constructor() {
        this.init()
    }

    public init() {
        const {loader} = headerLoader
        const gltf = loader.getGLTF('explore')
        this.importModel(gltf.scene)
    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        this.scene = fbx
    }

    get mesh() {
        return this.scene
    }

    public animate() {

    }

    destroy() {
        this.scene = null
    }
}
