import {DoubleSide, Group, Mesh, Object3D} from 'three';
import getGlassMaterial from '../materials/glassMaterial';
import Plant from './Plant';
import {BaseScene} from '../BaseScene';
import {TomatoColor, TomatoParams} from './Tomato';
import {commonLoader} from '../../composables/useLoader';
import {animate} from 'popmotion';

type DoorToOpen = 'left' | 'right' | 'both';

export class Greenhouse {
    public object: Object3D
    private scene: BaseScene;
    private leftDoor: Object3D;
    private rightDoor: Object3D;

    private plant1: Plant;
    private plant2: Plant;
    private tomatoParams: TomatoParams;

    private currentAnimation
    private glass: Mesh;

    constructor(tomatoParams: TomatoParams = {
        long: 1,
        size: 1,
        color: TomatoColor.red
    }) {
        this.tomatoParams = tomatoParams
        this.init()
    }

    get intersectables() {
        return [
            this.leftDoor,
            this.rightDoor,
            this.glass,
        ]
    }

    public init() {
        const model = commonLoader.loader.getFBX('greenhouse')
        this.importModel(model)
    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        fbx.rotation.y = Math.PI
        this.object = fbx

        // Vitres
        const glassMat = getGlassMaterial( {
            side: DoubleSide,
            roughness: 0.01,
            transmission: 0.99,
            reflectivity: 0.82
        })
        glassMat.thickness = 1
        this.glass = fbx.getObjectByName('Cube_3') as Mesh
        this.glass.material = glassMat

        ;(fbx.getObjectByName('Vitre_droite').children[0] as Mesh).material = glassMat
        ;(fbx.getObjectByName('Vitre_gauche').children[0] as Mesh).material = glassMat
        this.leftDoor = fbx.getObjectByName('Porte_gauche')
        this.rightDoor = fbx.getObjectByName('Porte_droite')

        this.setDoorsAngle(0)

        // this.setDoorsAngle(Math.PI * 3 / 4)

        // Add plant
        const {loader} = commonLoader
        const plantModel = loader.getGLTF('plant')
        const tomatoModel = loader.getFBX('tomato')
        this.plant1 = new Plant(plantModel, tomatoModel, this.tomatoParams)
        this.plant1.object.position.set(90, 70, 0)
        this.plant1.object.rotation.y = -4
        this.object.add(this.plant1.object)
        this.plant2 = new Plant(plantModel, tomatoModel, this.tomatoParams)
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

    private getDoorOpenFunction(door: DoorToOpen) {
        if (door === 'left') {
            return ({left}) => this.setLeftDoorAngle(left)
        }
        if (door === 'right') {
            return ({right}) => this.setRightDoorAngle(right)
        }
        return this.setDoorsAngle.bind(this)
    }

    async openDoor(door: DoorToOpen = 'both', duration = 500) {
        this.currentAnimation?.stop()
        this.currentAnimation = animate({
            from: {
                left: this.leftDoor.rotation.y,
                right: this.rightDoor.rotation.y,
            },
            to: {
                left: -Math.PI * 3 / 4,
                right: Math.PI * 3 / 4,
            },
            duration,
            onUpdate: this.getDoorOpenFunction(door)
        })
    }

    async closeDoor(door: DoorToOpen = 'both', duration = 500) {
        this.currentAnimation?.stop()
        this.currentAnimation = animate({
            from: {
                left: this.leftDoor.rotation.y,
                right: this.rightDoor.rotation.y,
            },
            to: {
                left: 0,
                right: 0,
            },
            duration,
            onUpdate: this.getDoorOpenFunction(door)
        })
    }

    setDoorsAngle(angle: number|any) {
        this.setLeftDoorAngle(angle.left ?? angle)
        this.setRightDoorAngle(angle.right ?? angle)
    }

    setLeftDoorAngle(angle: number) {
        this.leftDoor.rotation.y = angle
    }

    setRightDoorAngle(angle: number) {
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
