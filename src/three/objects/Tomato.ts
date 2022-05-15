import {Box3, Group, Object3D, Vector3} from 'three';
import ResourcesLoader from '../ResourcesLoader';

enum TomatoColor {
    red = 'red',
    yellow = 'yellow',
    green = 'green',
    black = 'black',
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


    constructor(params: TomatoParams) {
        this.params = params
        this.init()
    }

    public init() {
        // this.buildBody()
        const model = ResourcesLoader.getInstance().getFBX('tomato')
        console.log(model)
        this.importModel(model)
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
        // this.tomatoSphere = sphereParent
    }

    get mesh() {
        return this.object
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(deltaTime: number) {
        // console.log(this.params)
        const { long, size } = this.params
        this.tomatoBody.scale.y = long * size
        this.tomatoBody.scale.x = size
        this.tomatoBody.scale.z = size

        this.boundingBox.setFromObject(this.object)
        // this.tomatoSphere.scale.x = this.grow
        // this.tomatoSphere.scale.y = this.long * this.grow
        // this.tomatoSphere.scale.z = this.grow
        //
        // this.tomatoSphere.children[0].position.y = (
        //     this.tomatoOffset + (this.long / 10)
        // )
        //
        // this.object.scale.x = this.size
        // this.object.scale.y = this.size
        // this.object.scale.z = this.size
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
