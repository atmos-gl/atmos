import {CubeTexture, CubeTextureLoader, Group, Loader, LoadingManager, Texture, TextureLoader} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

interface ResourceStore<T> {
    [key: string]: T
}

interface ResourceLoader<T> {
    load(
        url: string | string[],
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
    private cubeTextureLoader: CubeTextureLoader;

    private textureResources: ResourceStore<Texture> = {}
    private cubeTextureResources: ResourceStore<CubeTexture> = {}
    private gltfResources: ResourceStore<GLTF> = {}
    private fbxResources: ResourceStore<Group> = {}

    private itemsLoaded = 0
    public onItemLoaded?: (key: string) => void;

    constructor() {
        this.manager = new LoadingManager()

        this.textureLoader = new TextureLoader(this.manager)
        this.cubeTextureLoader = new CubeTextureLoader(this.manager)
        this.gltfLoader = new GLTFLoader(this.manager)
        this.fbxLoader = new FBXLoader(this.manager)
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

    get onError() {
        return this.manager.onError
    }

    set onError(cb) {
        this.manager.onError = cb
    }

    private loadResource<T>(key: string, url: string | string[], loader: ResourceLoader<T>, store: ResourceStore<T>) {
        if (store[key]) return
        loader.load(url, (resource: T) => {
            store[key] = resource
            this.itemsLoaded++
            this.onItemLoaded?.(key)
        })
    }

    private getResource<T>(key: string, store: ResourceStore<T>): T {
        if (!store[key]) {
            throw new Error(`The resource ${key} has not been loaded.`)
        }
        // return store[key]
        const resource = store[key] as any
        if (resource.clone) {
            const cloned = resource.clone(true)
            if (resource.animations) {
                cloned.animations = resource.animations
            }
            return cloned
        }
        return resource
    }

    loadTexture(key: string, url: string) {
        this.loadResource<Texture>(key, url, this.textureLoader, this.textureResources)
    }

    getTexture(key): Texture {
        return this.getResource<Texture>(key, this.textureResources)
    }

    loadGLTF(key: string, url: string) {
        this.loadResource<GLTF>(key, url, this.gltfLoader, this.gltfResources)
    }

    getGLTF(key): GLTF {
        return this.getResource<GLTF>(key, this.gltfResources)
    }

    loadFBX(key: string, url: string) {
        this.loadResource<Group>(key, url, this.fbxLoader, this.fbxResources)
    }

    getFBX(key): Group {
        return this.getResource<Group>(key, this.fbxResources)
    }

    loadCubeTexture(key: string, url: string[]) {
        this.loadResource<CubeTexture>(key, url, this.cubeTextureLoader, this.cubeTextureResources)
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
