import {Group, Mesh, MeshStandardMaterial, Object3D, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {DragAnimatable} from '../three-composables/useDragAnimations';
import Door from './Door';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import Bottle from './Bottle';
import {BaseScene} from '../BaseScene';

export class Box {
    public model: Object3D
    public door: Door;
    public co2Bottle: Bottle;
    private scene: BaseScene;


    constructor(scene: BaseScene) {
        this.scene = scene
        this.init()
    }

    public init() {
        const model = ResourcesLoader.getInstance().getFBX('box')
        this.importFBX(model)
        // const model = ResourcesLoader.getInstance().getGLTF('box')
        // this.importModel(model)

    }

    private importFBX(model: Group) {
        console.log(model)
        // console.log(model.getObjectByName('tuyeau'))
        model.scale.set(0.01, 0.01, 0.01)
        this.model = model
        this.door = new Door(this.model.getObjectByName('porte'))
        this.door.handle.castShadow = true
        console.log(this.door.mesh.getObjectByName('Cube_1').receiveShadow = true)

        this.co2Bottle = new Bottle(
            model.getObjectByName('Bonbonne_de_CO2'),
            this.model.getObjectByName('Tube_1') as Mesh,
            this.scene
        )

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
        //
        // this.scene.getObjectByName('Cube').castShadow = true
        // this.scene.getObjectByName('Cube').receiveShadow = true

    }

    get mesh() {
        return this.model
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
        this.model = null
    }
}
