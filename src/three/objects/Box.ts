import {AnimationClip, Group, Mesh, MeshPhongMaterial, Object3D, Vector2, Vector3, Vector4} from 'three';
import Door from './Door';
import Bottle from './Bottle';
import glassMaterial from '../materials/glassMaterial';
import {getMetalMaterial, goldMat} from '../materials/metalMaterials';
import Tray from './Tray';
import Fertilizer from './Fertilizer';
import {powerBlockLoader} from '../../composables/useLoader';
import {SetupPowerBlock} from '../SetupPowerBlock';
import UraniumFlask from './UraniumFlask';
import {animate} from 'popmotion';

export class Box {
    public model: Object3D
    public door: Door;
    public co2Bottle: Bottle;
    private scene: SetupPowerBlock;
    public waterBottle: Bottle;
    public tray: Tray;
    public fertilizer: Fertilizer;
    public uraniumFlask: UraniumFlask;
    private nuclearLight: Mesh;


    constructor(scene: SetupPowerBlock) {
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

        const seeThroughGlass = glassMaterial(powerBlockLoader.loader, {
            opacity: 0.15,
            transparent: true,
            transmission: 0,
            color: '#000',
            ior: 0
        })
        seeThroughGlass.thickness = 0
        const tube = this.model.getObjectByName('centrale').getObjectByName('Tube_1') as Mesh
        tube.material =seeThroughGlass.clone()


        this.door = new Door(this.model.getObjectByName('porte'), this.scene)
        this.door.handle.castShadow = true
        this.door.mesh.getObjectByName('Cube_1').receiveShadow = true

        const co2Bottle = this.model.getObjectByName('Bonbonne_de_CO2');

        const {loader} = powerBlockLoader
        ;(co2Bottle.getObjectByName('corp_c02') as Mesh).material = getMetalMaterial(loader)
        ;(co2Bottle.getObjectByName('parvis_c02') as Mesh).material = goldMat
        this.co2Bottle = new Bottle(
            {
                object: co2Bottle,
                targetObjectMesh: this.model.getObjectByName('Tube_1_2') as Mesh,
                scene: this.scene,
                clamp: new Vector4(
                    -220, 1000,
                    30, 120
                )
            }
        )

        const waterBottle = this.model.getObjectByName('Bouteille') as Mesh
        waterBottle.material = glassMaterial(loader, {
            color: 'rgba(112,170,220,0.57)'
        })
        this.waterBottle = new Bottle({
                object: waterBottle,
                targetObjectMesh: this.model.getObjectByName('Tube_5') as Mesh,
                scene: this.scene,
                clamp: new Vector4(
                    -220, 1000,
                    -20, 90
                ),
                screwDirection: 1,
            initialPosition: new Vector2(450, 50)
            }
        )

        // const pipe = this.model.getObjectByName('tuyeau').children[0] as Mesh
        // pipe.material = glassMaterial(loader)

        this.tray = new Tray(this.model.getObjectByName('Tiroir'), this.scene)

        const fertilizer = this.model.getObjectByName('fertilisant')
        const fertilizerClip = AnimationClip.findByName(this.model.animations, 'fertilizer')
        console.log(this.model)
        this.fertilizer = new Fertilizer(fertilizer, this.scene, fertilizerClip)

        const uraniumFlask = this.model.getObjectByName('fiole')
        const flaskBody = uraniumFlask.getObjectByName('Capsule') as Mesh
        flaskBody.material = seeThroughGlass
        const uraniumClip = AnimationClip.findByName(this.model.animations, 'pilule')
        this.uraniumFlask = new  UraniumFlask({
                object: uraniumFlask,
                targetObjectMesh: this.model.getObjectByName('Tube_5') as Mesh,
                scene: this.scene,
            },
            uraniumClip
        )

        ;(this.model.getObjectByName('Pillule').children[0] as Mesh).material = new MeshPhongMaterial({color: '#0f0', emissive: '#040', reflectivity: 0.5})

        this.nuclearLight = this.model.getObjectByName('nuclear_light') as Mesh
        this.nuclearLight.material = new MeshPhongMaterial({
            color: '#1a1a1a'
        })

    }

    public turnLightOn() {
        const mat = this.nuclearLight.material as MeshPhongMaterial
        animate({
            from: {color: '#1a1a1a', emissive: '#000'},
            to: {color: '#0d2d15', emissive: '#2a9a46'},
            onUpdate(v) {
                mat.color.set(v.color)
                mat.emissive.set(v.emissive)
            }
        })
    }

    get mesh() {
        return this.model
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(deltaTime: number) {
        this.fertilizer.animate(deltaTime)
        this.uraniumFlask.animate(deltaTime)
    }

    destroy() {
        this.model = null
    }
}
