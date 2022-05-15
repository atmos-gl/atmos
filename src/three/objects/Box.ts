import {AnimationClip, AnimationMixer, Group, Mesh, Object3D, Vector2, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import Door from './Door';
import Bottle from './Bottle';
import {BaseScene} from '../BaseScene';
import glassMaterial from '../materials/glassMaterial';
import {getMetalMaterial, goldMat} from '../materials/metalMaterials';
import Tray from './Tray';
import Fertilizer from './Fertilizer';
import {mix} from 'popmotion';
import {powerBlockLoader} from '../../composables/useLoader';

export class Box {
    public model: Object3D
    public door: Door;
    public co2Bottle: Bottle;
    private scene: BaseScene;
    public waterBottle: Bottle;
    public tray: Tray;
    public fertilizer: Fertilizer;


    constructor(scene: BaseScene) {
        this.scene = scene
        this.init()
    }

    public init() {
        const model = powerBlockLoader.loader.getFBX('box')
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

        const {loader} = powerBlockLoader
        ;(co2Bottle.getObjectByName('corp_c02') as Mesh).material = getMetalMaterial(loader)
        ;(co2Bottle.getObjectByName('parvis_c02') as Mesh).material = goldMat
        this.co2Bottle = new Bottle(
            co2Bottle,
            this.model.getObjectByName('Tube_1') as Mesh,
            this.scene
        )

        const waterBottle = this.model.getObjectByName('Bouteille') as Mesh
        waterBottle.material = glassMaterial(loader, 'rgba(182,210,234,0.57)')
        this.waterBottle = new Bottle(waterBottle,
            this.model.getObjectByName('Tube_5') as Mesh,
            this.scene
        )

        const pipe = this.model.getObjectByName('tuyeau').children[0] as Mesh
        pipe.material = glassMaterial(loader)

        this.tray = new Tray(this.model.getObjectByName('Tiroir'), this.scene)

        const fertilizer = this.model.getObjectByName('fertilisant')
        const fertilizerClip = AnimationClip.findByName(this.model.animations, 'fertilizer')
        // console.log(fertilizerClip)
        this.fertilizer = new Fertilizer(fertilizer, this.scene, fertilizerClip)

        const mixer = new AnimationMixer(fertilizer)
        const action = mixer.clipAction(fertilizerClip)
        // @ts-ignore
        window.action = action
        action.play()
    }

    get mesh() {
        return this.model
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(deltaTime: number) {
        this.fertilizer.animate(deltaTime)
    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.model = null
    }
}
