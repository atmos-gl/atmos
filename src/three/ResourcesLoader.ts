import {
    CubeTexture,
    CubeTextureLoader,
    Group,
    Loader,
    LoadingManager, Object3D,
    ObjectLoader,
    Texture,
    TextureLoader
} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

interface ResourceStore<T> {
    [key: string]: T
}

interface ResourceLoader<T> {
    load(
        url: string|string[],
        onLoad: (r: T) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
}

export interface ResourcesToLoad {
    gltf?: { [key: string]: string }
    fbx?: { [key: string]: string }
    texture?: { [key: string]: string }
    cubeTexture?: { [key: string]: Array<string> }
}

export default class ResourcesLoader {

    private readonly manager: LoadingManager;
    private textureLoader: TextureLoader;
    private gltfLoader: GLTFLoader;
    private fbxLoader: FBXLoader;

    private textureResources: ResourceStore<Texture> = {}
    private cubeTextureResources: ResourceStore<CubeTexture> = {}
    private gltfResources: ResourceStore<GLTF> = {}
    private fbxResources: ResourceStore<Group> = {}
    private cubeTextureLoader: CubeTextureLoader;
    private worker: Worker;
    private objectLoader: ObjectLoader;

    constructor() {
        this.manager = new LoadingManager()

        this.textureLoader = new TextureLoader(this.manager)
        this.cubeTextureLoader = new CubeTextureLoader(this.manager)
        this.gltfLoader = new GLTFLoader(this.manager)
        this.fbxLoader = new FBXLoader(this.manager)

        this.objectLoader = new ObjectLoader()

        this.worker = new Worker('/js/loaderWorker.js')
        this.worker.onmessage = e => this.onMessage(e)
    }

    private sendWorker(type: string, data: any) {
        this.worker.postMessage({
            type,
            data
        })
    }

    private onMessage(e) {
        const {event} = e.data
        if (event === 'model') {
            const {type, key, data} = e.data
            if (type === 'gltf') {
                this.gltfLoaded(key, data)
            }
        }
    }
    private gltfLoaded(key, data) {
        console.log(data)
        const scene = JSON.parse(data.scene)
        Object.setPrototypeOf(scene, Group)
        console.log(scene)
    }

    get onStart() {
        return this.manager.onStart
    }

    set onStart(cb) {
        this.manager.onStart = cb
    }

    get onLoad() {
        return this.manager.onLoad
    }

    set onLoad(cb) {
        this.manager.onLoad = cb
    }

    get onProgress() {
        return this.manager.onProgress
    }

    set onProgress(cb) {
        this.manager.onProgress = cb
    }

    get onError() {
        return this.manager.onError
    }

    set onError(cb) {
        this.manager.onError = cb
    }

    private loadResource<T>(key: string, url: string|string[], type: string, store: ResourceStore<T>) {
        if (store[key]) return
        // loader.load(url, (resource: T) => {
        //     console.log(resource)
        //     store[key] = resource
        // })
        this.worker.postMessage({
            action: 'load',
            key,
            url,
            type
        })
    }

    private getResource<T>(key: string, store: ResourceStore<T>): T {
        if (!store[key]) {
            throw new Error(`The resource ${key} has not been loaded.`)
        }
        return store[key]
    }

    loadTexture(key: string, url: string) {
        this.loadResource<Texture>(key, url, 'texture', this.textureResources)
    }

    getTexture(key): Texture {
        return this.getResource<Texture>(key, this.textureResources)
    }

    loadGLTF(key: string, url: string) {
        this.loadResource<GLTF>(key, url, 'gltf', this.gltfResources)
    }

    getGLTF(key): GLTF {
        return this.getResource<GLTF>(key, this.gltfResources)
    }
    loadFBX(key: string, url: string) {
        this.loadResource<Group>(key, url, 'fbx', this.fbxResources)
    }

    getFBX(key): Group {
        return this.getResource<Group>(key, this.fbxResources)
    }
    loadCubeTexture(key: string, url: string[]) {
        this.loadResource<CubeTexture>(key, url, 'cubeTexture', this.cubeTextureResources)
    }

    getCubeTexture(key): CubeTexture {
        return this.getResource<CubeTexture>(key, this.cubeTextureResources)
    }

    alreadyLoaded(resources: ResourcesToLoad): boolean {
        // Si on trouve une ressource pas encore chargée, on retourne false, sinon à la fin true
        if (resources.gltf) {
            for (const key of Object.keys(resources.gltf)) {
                if (!this.gltfResources[key]) {
                    return false
                }
            }
        }
        if (resources.fbx) {
            for (const key of Object.keys(resources.fbx)) {
                if (!this.fbxResources[key]) {
                    return false
                }
            }
        }
        if (resources.texture) {
            for (const key of Object.keys(resources.texture)) {
                if (!this.textureResources[key]) {
                    return false
                }
            }
        }
        if (resources.cubeTexture) {
            for (const key of Object.keys(resources.cubeTexture)) {
                if (!this.cubeTextureResources[key]) {
                    return false
                }
            }
        }
        return true
    }

    bulkLoad(resources: ResourcesToLoad) {
        if (resources.gltf) {
            Object.keys(resources.gltf).forEach(key => {
                this.loadGLTF(key, resources.gltf[key])
            })
        }
        if (resources.fbx) {
            Object.keys(resources.fbx).forEach(key => {
                this.loadFBX(key, resources.fbx[key])
            })
        }
        if (resources.texture) {
            Object.keys(resources.texture).forEach(key => {
                this.loadTexture(key, resources.texture[key])
            })
        }
        if (resources.cubeTexture) {
            Object.keys(resources.cubeTexture).forEach(key => {
                this.loadCubeTexture(key, resources.cubeTexture[key])
            })
        }
    }
}
