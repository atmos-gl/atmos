import {
    Mesh,
    MeshStandardMaterial, Object3D,
    SphereGeometry,
    Vector3
} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import ResourcesLoader from '../ResourcesLoader';

export class Tomato {
    private scene: Object3D
    private tomatoSphere: Object3D
    private tomatoOffset = -5.78

    public long = 1
    public size = 1
    public grow = 1


    constructor() {
        this.init()
    }

    public init () {
        // this.buildBody()
        const gltf = ResourcesLoader.getInstance().getGLTF('tomato')
        console.log(gltf)
        this.importModel(gltf)
    }
    private importModel(gltf: GLTF) {
        // @ts-ignore
        gltf.scene.children[1].material.metalness = 0.5
        gltf.scene.children[0].position.y = 0
        const sphere = gltf.scene.children[1]
        const sphereParent = new Object3D()
        sphere.position.y = this.tomatoOffset
        gltf.scene.remove(sphere)
        sphereParent.add(sphere)
        gltf.scene.add(sphereParent)
        this.scene = gltf.scene
        this.tomatoSphere = sphereParent
    }

    get mesh() {
        return this.scene
    }

    public aim(position: Vector3) {
        // this.turretPivot.lookAt(position)
    }

    public animate (elapsedTime: number) {
        this.tomatoSphere.scale.x = this.grow
        this.tomatoSphere.scale.y = this.long * this.grow
        this.tomatoSphere.scale.z = this.grow

        this.tomatoSphere.children[0].position.y = (
            this.tomatoOffset + (this.long / 10)
        )

        this.scene.scale.x = this.size
        this.scene.scale.y = this.size
        this.scene.scale.z = this.size
    }

    destroy () {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.scene = null
    }
}
