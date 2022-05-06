import {Group, Mesh, MeshStandardMaterial, Object3D, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {DragAnimatable} from '../three-composables/useDragAnimations';
import Door from './Door';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import Bottle from './Bottle';
import {BaseScene} from '../BaseScene';
import glassMaterial from '../materials/glassMaterial';
import {getMetalMaterial, goldMat} from '../materials/metalMaterials';
import Tray from './Tray';

export class Box {
    public model: Object3D
    public door: Door;
    public co2Bottle: Bottle;
    private scene: BaseScene;
    public waterBottle: Bottle;
    public tray: Tray;


    constructor(scene: BaseScene) {
        this.scene = scene
        this.init()
    }

    public init() {
        const model = ResourcesLoader.getInstance().getFBX('box')
        this.importFBX(model)
        this.setupChildren()
    }

    private importFBX(model: Group) {
        console.log(model)

        model.scale.set(0.01, 0.01, 0.01)
        this.model = model
    }

    setupChildren() {
        this.door = new Door(this.model.getObjectByName('porte'))
        this.door.handle.castShadow = true
        this.door.mesh.getObjectByName('Cube_1').receiveShadow = true

        const co2Bottle = this.model.getObjectByName('Bonbonne_de_CO2');

        ;(co2Bottle.getObjectByName('Cylinder') as Mesh).material = getMetalMaterial()
        ;(co2Bottle.getObjectByName('Sweep') as Mesh).material = goldMat
        this.co2Bottle = new Bottle(
            co2Bottle,
            this.model.getObjectByName('Tube_1') as Mesh,
            this.scene
        )

        const waterBottle = this.model.getObjectByName('Bouteille') as Mesh
        const mat = glassMaterial('rgba(182,210,234,0.57)')
        console.log(mat)
        waterBottle.material = mat
        this.waterBottle = new Bottle(waterBottle,
            this.model.getObjectByName('Tube_5') as Mesh,
            this.scene,
            500)


        const pipe = this.model.getObjectByName('tuyeau').children[0] as Mesh
        pipe.material = glassMaterial()

        this.tray = new Tray(this.model.getObjectByName('Tiroir'), this.scene)
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
