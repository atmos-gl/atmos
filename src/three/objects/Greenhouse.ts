import {DoubleSide, Group, Mesh, Object3D} from 'three';
import {growLoader, headerLoader} from '../../composables/useLoader';
import ResourcesLoader from "../ResourcesLoader";
import getGlassMaterial from '../materials/glassMaterial';
import Plant from './Plant';
import {BaseScene} from '../BaseScene';

export class Greenhouse {
    public object: Object3D
    private scene: BaseScene;
    private leftDoor: Object3D;
    private rightDoor: Object3D;

    private plant1: Plant;
    private plant2: Plant;

    constructor(loader: ResourcesLoader, scene: BaseScene) {
        this.scene = scene
        this.init(loader)
    }

    public init(loader: ResourcesLoader) {
        const model = loader.getFBX('greenhouse')
        this.importModel(model)
    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        fbx.rotation.y = Math.PI
        this.object = fbx

        // Vitres
        const glassMat = getGlassMaterial(growLoader.loader, {
            side: DoubleSide,
            roughness: 0.01,
            transmission: 0.99,
            reflectivity: 0.82
        })
        glassMat.thickness = 1
        const glass = fbx.getObjectByName('Cube_3') as Mesh
        glass.material = glassMat

        ;(fbx.getObjectByName('Vitre_droite').children[0] as Mesh).material = glassMat
        ;(fbx.getObjectByName('Vitre_gauche').children[0] as Mesh).material = glassMat
        console.log(fbx)
        this.leftDoor = fbx.getObjectByName('Porte_gauche')
        this.rightDoor = fbx.getObjectByName('Porte_droite')

        this.setDoorsAngle(0)

        // this.setDoorsAngle(Math.PI * 3 / 4)

        // Add plant
        const plantModel = growLoader.loader.getGLTF('plant')
        this.plant1 = new Plant(plantModel, this.scene)
        this.plant1.object.position.set(90, 70, 0)
        this.object.add(this.plant1.object)
        this.plant2 = new Plant(plantModel, this.scene)
        this.plant2.object.position.set(-90, 70, 0)
        this.object.add(this.plant2.object)

        this.plant1.grow().then(() => console.log('fiiin'))
    }

    get mesh() {
        return this.object
    }

    setDoorsAngle(angle: number) {
        this.leftDoor.rotation.y = -angle
        this.rightDoor.rotation.y = angle
    }

    public animate(deltaTime: number) {
        this.plant1.animate(deltaTime)
        this.plant2.animate(deltaTime)
    }

    destroy() {
        this.object = null
    }
}
