import {Group, Mesh, MeshStandardMaterial, Object3D, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {DragAnimatable} from '../three-composables/useDragAnimations';
import Door from './Door';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';

export class Box {
    public scene: Object3D
    public door: Door;


    constructor() {
        this.init()
    }

    public init() {
        const model = ResourcesLoader.getInstance().getFBX('box')
        this.importFBX(model)
        // const model = ResourcesLoader.getInstance().getGLTF('box')
        // this.importModel(model)

    }

    private importModel(model: GLTF) {
        // model.remove(
        //     model.getObjectByName('Light_1'),
        //     model.getObjectByName('Light'),
        // )
        // console.log(model.getObjectByName('tuyeau'))
        model.scene.scale.set(0.01, 0.01, 0.01)
        console.log(model)
        this.scene = model.scene
        this.door = new Door(this.scene.getObjectByName('porte'))

    }
    private importFBX(model: Group) {
        console.log(model)
        // console.log(model.getObjectByName('tuyeau'))
        model.scale.set(0.01, 0.01, 0.01)
        this.scene = model
        this.door = new Door(this.scene.getObjectByName('porte'))
        this.door.handle.castShadow = true
        console.log(this.door.mesh.getObjectByName('Cube_1').receiveShadow = true)

        const envMap = ResourcesLoader.getInstance().getCubeTexture('envmap')
        const glassMaterial = new MeshStandardMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.6,
            roughness: 0,
            metalness: 0.8,
            envMap,
        })
        const pipe = model.getObjectByName('tuyeau').children[0] as Mesh
        pipe.material = glassMaterial

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
