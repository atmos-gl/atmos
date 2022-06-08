import {Group, Object3D} from 'three';
import {exploreLoader, commonLoader} from '../../composables/useLoader';
import {Greenhouse} from './Greenhouse';
import {BaseScene} from '../BaseScene';

export class ExploreGreenHouse {
    public object: Object3D
    public mainGreenhouse: Greenhouse;
    public secondGreenhouse: Greenhouse;

    constructor() {
        this.init()
    }

    public init() {
        const {loader} = exploreLoader
        const fbx = loader.getFBX('explore')
        this.importModel(fbx)
    }

    private importModel(fbx: Group) {
        fbx.scale.set(0.01, 0.01, 0.01)
        this.object = fbx
        this.mainGreenhouse = new Greenhouse()
        this.mainGreenhouse.mesh.scale.setScalar(1)
        this.mainGreenhouse.mesh.position.y = -125
        this.mainGreenhouse.mesh.rotation.y = 0
        this.object.add(this.mainGreenhouse.mesh)

        this.secondGreenhouse = new Greenhouse()
        this.secondGreenhouse.mesh.scale.setScalar(1)
        this.secondGreenhouse.mesh.position.y = -125
        this.secondGreenhouse.mesh.rotation.y = 0
        this.secondGreenhouse.mesh.position.x = 550
        this.object.add(this.secondGreenhouse.mesh)

    }

    get mesh() {
        return this.object
    }

    public animate(deltaTime: number) {
        // this.mixer.update(deltaTime)
    }

    destroy() {
        // this.scene.dispose()
        // this.scene.material.dispose()
        this.object = null
    }
}
