import {
    AnimationClip,
    DoubleSide,
    Group,
    Mesh,
    MeshLambertMaterial,
    MeshPhongMaterial,
    Object3D,
    Vector2,
    Vector3,
    Vector4
} from 'three';
import Door from './Door';
import Bottle from './Bottle';
import glassMaterial from '../materials/glassMaterial';
import {getMetalMaterial, goldMat} from '../materials/metalMaterials';
import Tray from './Tray';
import Fertilizer from './Fertilizer';
import {commonLoader, powerBlockLoader} from '../../composables/useLoader';
import {SetupPowerBlockScene} from '../SetupPowerBlockScene';
import UraniumFlask from './UraniumFlask';
import {animate} from 'popmotion';
import getGlassMaterial from '../materials/glassMaterial';

export class Box {
    public model: Object3D
    public door: Door;
    public co2Bottle: Bottle;
    private scene: SetupPowerBlockScene;
    public waterBottle: Bottle;
    public tray: Tray;
    public fertilizer: Fertilizer;
    public uraniumFlask: UraniumFlask;
    private nuclearLight: Mesh;


    constructor(scene: SetupPowerBlockScene) {
        this.scene = scene
        this.init()
    }

    public init() {
        const model = powerBlockLoader.loader.getFBX('box')
        this.importFBX(model)
        this.setupChildren()
    }

    private importFBX(model: Group) {

        model.scale.set(0.01, 0.01, 0.01)
        this.model = model
    }

    setupChildren() {

        const seeThroughGlass = glassMaterial({
            opacity: 0.15,
            transparent: true,
            transmission: 0,
            color: '#000',
            ior: 0
        })
        seeThroughGlass.thickness = 0
        const tube = this.model.getObjectByName('centrale').getObjectByName('Tube_1') as Mesh
        tube.material = seeThroughGlass.clone()


        this.door = new Door(this.model.getObjectByName('porte'), this.scene)
        this.door.handle.castShadow = true
        this.door.mesh.getObjectByName('Cube_1').receiveShadow = true

        const envMap = commonLoader.loader.getCubeTexture('envmap')
        const co2Bottle = this.model.getObjectByName('Bonbonne_de_CO2');
        const co2mat = (co2Bottle.getObjectByName('corp_c02') as Mesh).material as MeshPhongMaterial
        co2mat.shininess = 100
        co2mat.envMap = envMap
        co2mat.reflectivity = 0.2
        const moletMat = new MeshPhongMaterial({
            shininess: 100,
            envMap,
            reflectivity: 0.7,
            color: '#c4c2c2'
        })
        ;(co2Bottle.getObjectByName('molette') as Mesh).material = moletMat
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

        ;(waterBottle.getObjectByName('etiquette_couleur') as Mesh).material[1].side = DoubleSide
        waterBottle.material = glassMaterial({
            roughness: 0.1,
            transmission: 1
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
                initialPosition: new Vector2(450, 50),
                soundEffect: 'screw2'
            }
        )

        // const pipe = this.model.getObjectByName('tuyeau').children[0] as Mesh
        // pipe.material = glassMaterial(loader)

        this.tray = new Tray(this.model.getObjectByName('Tiroir'), this.scene)

        const fertilizer = this.model.getObjectByName('fertilisant')
        const fertilizerClip = AnimationClip.findByName(this.model.animations, 'fertilizer')
        this.fertilizer = new Fertilizer(fertilizer, this.scene, fertilizerClip)

        const uraniumFlask = this.model.getObjectByName('fiole')
        const flaskBody = uraniumFlask.getObjectByName('Capsule') as Mesh
        flaskBody.material = seeThroughGlass
        const uraniumClip = AnimationClip.findByName(this.model.animations, 'pilule')
        this.uraniumFlask = new UraniumFlask({
                object: uraniumFlask,
                targetObjectMesh: this.model.getObjectByName('Tube_5') as Mesh,
                scene: this.scene,
            },
            uraniumClip
        )

        ;(this.model.getObjectByName('Pillule').children[0] as Mesh).material = new MeshPhongMaterial({
            color: '#001f00',
            emissive: '#001f00',
            reflectivity: 0.5
        })
        console.log(this.model)
        ;((uraniumFlask.getObjectByName('Cylinder') as Mesh).material as MeshLambertMaterial).color.set('#021c02')

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
