import {Group, Object3D} from 'three';
import {exploreLoader} from '../../composables/useLoader';

export class ExploreGreenHouse {
    public scene: Object3D

    constructor() {
        this.init()
    }

    public init() {
        const {loader} = exploreLoader
        const fbx = loader.getFBX('explore')
        this.importModel(fbx)
        console.log(fbx)
    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        this.scene = fbx
    }

    get mesh() {
        return this.scene
    }

    public animate(deltaTime: number) {
        // this.mixer.update(deltaTime)
    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.scene = null
    }
}
