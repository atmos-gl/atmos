import {Box3, Color, Group, Material, Mesh, MeshPhongMaterial, Object3D, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {tomatoLoader} from '../../composables/useLoader';

export enum TomatoColor {
    red = 'red',
    yellow = 'yellow',
    green = 'green',
    black = 'black',
}
const colorTable = {
    red: '#b20000',
    yellow: '#e0bb00',
    green: '#339b07',
    black: '#0e1806',
}

export interface TomatoParams {
    long: number
    size: number
    color: TomatoColor
}

export class Tomato {
    private object: Object3D
    private tomatoBody: Object3D

    private params: TomatoParams

    public boundingBox = new Box3()
    private tomatoMaterial: MeshPhongMaterial;


    constructor(params: TomatoParams, model: Group) {
        this.params = params
        this.init(model)
    }

    public init(model: Group) {
        this.importModel(model)
        this.updateParams()
    }

    private importModel(model: Group) {
        // @ts-ignore
        // model.children[1].material.metalness = 0.5
        // model.children[0].position.y = 0
        // const sphere = model.children[1]
        // const sphereParent = new Object3D()
        // sphere.position.y = this.tomatoOffset
        // model.remove(sphere)
        // sphereParent.add(sphere)
        // model.add(sphereParent)
        // model.scale.set(0.1, 0.1, 0.1)
        this.object = model
        this.tomatoBody = model.getObjectByName('body')
        this.tomatoMaterial = (this.tomatoBody.getObjectByName('Sphere') as Mesh).material as MeshPhongMaterial
        this.tomatoMaterial.shininess = 25
        // this.tomatoSphere = sphereParent
    }

    get mesh() {
        return this.object
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(deltaTime: number) {
        this.updateParams(true)
    }

    public updateParams(lerpColor = false) {
        const { long, size, color } = this.params
        this.tomatoBody.scale.y = long * size
        this.tomatoBody.scale.x = size
        this.tomatoBody.scale.z = size

        this.boundingBox.setFromObject(this.object)

        if (lerpColor) {
            this.tomatoMaterial.color.lerp(new Color(colorTable[color]), 0.2)
        } else {
            this.tomatoMaterial.color.set(colorTable[color])

        }
    }

    get center(): Vector3 {
        const result = new Vector3()
        this.boundingBox.getCenter(result)
        return result
    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.object = null
    }
}
