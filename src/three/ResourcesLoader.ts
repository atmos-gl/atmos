import {Loader, LoadingManager, Texture, TextureLoader} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

interface ResourceStore<T> {
    [key: string]: T
}

interface ResourceLoader<T> {
    load(
        url: string,
        onLoad: (r: T) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
}
export interface ResourcesToLoad {
    gltf: { [key: string] : string }
    texture: { [key: string] : string }
}

export default class ResourcesLoader {
    private static instance: ResourcesLoader;

    private readonly manager: LoadingManager;
    private textureLoader: TextureLoader;
    private gltfLoader: GLTFLoader;

    private textureResources: ResourceStore<Texture> = {}
    private gltfResources: ResourceStore<GLTF> = {}

    private constructor() {
        this.manager = new LoadingManager()

        this.textureLoader = new TextureLoader(this.manager)
        this.gltfLoader = new GLTFLoader(this.manager)
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

    private loadResource<T>(key: string, url: string, loader: ResourceLoader<T>, store: ResourceStore<T>) {
        loader.load(url, (resource: T) => {
            store[key] = resource
        })
    }

    private getResource<T>(key: string, store: ResourceStore<T>): T {
        if (!store[key]) {
            throw new Error(`The resource ${key} has not been loaded.`)
        }
        return store[key]
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

    bulkLoad(resources: ResourcesToLoad) {
        Object.keys(resources.gltf).forEach(key => {
            this.loadGLTF(key, resources.gltf[key])
        })
        Object.keys(resources.texture).forEach(key => {
            this.loadTexture(key, resources.texture[key])
        })
    }

    // Singleton
    public static getInstance(): ResourcesLoader {
        if (!ResourcesLoader.instance) {
            ResourcesLoader.instance = new ResourcesLoader();
        }

        return ResourcesLoader.instance;
    }
}
