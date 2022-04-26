import {
    AxesHelper,
    BoxGeometry,
    BufferGeometry, Material,
    Mesh,
    MeshStandardMaterial, Object3D, SphereBufferGeometry,
    SphereGeometry,
    Vector3
} from 'three';
import {Geometry} from 'three/examples/jsm/deprecated/Geometry';
import GUI from 'lil-gui';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import ResourcesLoader from './ResourcesLoader';

export class Tomato {
    private scene: Object3D
    private tomatoSphere: Object3D
    private tomatoOffset = -5.78

    public long = 1
    public size = 1
    public grow = 1
    private loader: GLTFLoader;


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

    private buildBody() {
        const geometry = new SphereGeometry( 2, 32, 16 );
        const material = new MeshStandardMaterial({
            color: '#c23838',
            metalness: 0.4,
            roughness: 0.6,
        })
        this.scene = new Mesh(geometry, material)

        const sphereVerticesArray = []
        const vertices= geometry.attributes.position.array
        for (let i = 0; i < vertices.length; i += 3) {
            const vec = new Vector3(vertices[i], vertices[i+1], vertices[i+2]);
            sphereVerticesArray.push(vec);
            let mag = vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
            mag = Math.sqrt(mag);
            // const norm = new THREE.Vector3(vertex.x / mag, vertex.y / mag, vertex.z / mag);
            // sphereVerticesNormArray.push(norm);
        }
        console.log(sphereVerticesArray)
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
