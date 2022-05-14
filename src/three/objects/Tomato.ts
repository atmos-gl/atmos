import {
    Group,
    Mesh,
    MeshStandardMaterial, Object3D,
    SphereGeometry,
    Vector3
} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
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
    private tomatoSphere: Object3D
    private tomatoOffset = -5.78

    private params: TomatoParams


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
        // this.tomatoSphere = sphereParent
    }

    get mesh() {
        return this.object
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate(deltaTime: number) {
        console.log(this.params)
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

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.object = null
    }
}
