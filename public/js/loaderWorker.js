importScripts('./workerDeps/three.min.js',
    './workerDeps/FBXLoader.js',
    './workerDeps/GLTFLoader.js',
)
const manager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(manager)
const cubeTextureLoader = new THREE.CubeTextureLoader(manager)
const gltfLoader = new THREE.GLTFLoader(manager)
const fbxLoader = new THREE.FBXLoader(manager)

manager.onLoad = () => {
    postMessage({
        event: 'load'
    })
}
manager.onProgress = (url, loaded, total) => {
    postMessage({
        event: 'progress',
        data: {url, loaded, total}
    })
}
manager.onError = (url) => {
    postMessage({
        event: 'error',
        data: url
    })
}

function sendModelData(type, key, data) {
    postMessage({
        event: 'model',
        type,
        key,
        data
    })
}

function loadResource(type, key, url) {
    if (type === 'gltf') {
        gltfLoader.load(url, gltf => {
            const animations = []
            gltf.animations?.forEach(animation => {
                animations.push(animation.toJSON())
            })
            sendModelData(type, key, {
                animations,
                scene: gltf.scene.toJSON()
            })

        })
        return
    }
}

onmessage = e => {
    const {action} = e.data
    if (action === 'load') {
        const {type, key, url} = e.data
        loadResource(type, key, url)
        return
    }
}
