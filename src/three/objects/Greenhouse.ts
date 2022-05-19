import {DoubleSide, Group, Mesh, Object3D} from 'three';
import ResourcesLoader from "../ResourcesLoader";
import getGlassMaterial from '../materials/glassMaterial';
import Plant from './Plant';
import {BaseScene} from '../BaseScene';
import {TomatoColor, TomatoParams} from './Tomato';
import {animateAsync} from '../../utils';

export class Greenhouse {
    public object: Object3D
    private scene: BaseScene;
    private leftDoor: Object3D;
    private rightDoor: Object3D;

    private plant1: Plant;
    private plant2: Plant;
    private tomatoParams: TomatoParams;
    private loader: ResourcesLoader;

    constructor(loader: ResourcesLoader, scene: BaseScene, tomatoParams: TomatoParams = {
        long: 1,
        size: 1,
        color: TomatoColor.red
    }) {
        this.scene = scene
        this.tomatoParams = tomatoParams
        this.loader = loader
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
        const glassMat = getGlassMaterial(this.loader, {
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
        const plantModel = this.loader.getGLTF('plant')
        const tomatoModel = this.loader.getFBX('tomato')
        this.plant1 = new Plant(plantModel, tomatoModel, this.scene, this.tomatoParams)
        this.plant1.object.position.set(90, 70, 0)
        this.plant1.object.rotation.y = -4
        this.object.add(this.plant1.object)
        this.plant2 = new Plant(plantModel, tomatoModel, this.scene, this.tomatoParams)
        this.plant2.object.position.set(-90, 70, 0)
        this.plant2.object.rotation.y = 4
        this.object.add(this.plant2.object)
    }

    get mesh() {
        return this.object
    }

    async onShow() {
        this.plant1.updateTomatoes()
        this.plant2.updateTomatoes()
    }
     async grow() {
        this.plant1.grow()
        await this.plant2.grow()
     }

     async openDoor () {
        await animateAsync({
            from: 0,
            to: Math.PI * 3 / 4,
            duration: 500,
            onUpdate: v => {
                this.setDoorsAngle(v)
            }
        })
     }

     async closeDoor () {
        await animateAsync({
            from: Math.PI * 3 / 4,
            to: 0,
            duration: 500,
            onUpdate: v => {
                this.setDoorsAngle(v)
            }
        })
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
