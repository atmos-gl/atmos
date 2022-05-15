import {Group, Object3D, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {DragAnimatable} from '../three-composables/useDragAnimations';
import Door from './Door';
import {exploreLoader} from '../../composables/useLoader';

export class ExplorePoiObject {
    public scene: Object3D
    // public door: Door;


    constructor() {
        this.init()
    }

    public init() {
        const {loader} = exploreLoader
        const gltf = loader.getGLTF('explore')
        this.importModel(gltf.scene)
        // const fbx = loader.getFBX('explore')
        // this.importModel(fbx)
        // console.log(gltf)
    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        this.scene = fbx

        // this.door = new Door(this.scene.children.find(obj => obj.name === 'porte'))

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

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.scene = null
    }
}
