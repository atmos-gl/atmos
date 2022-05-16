import {ResourcesToLoad} from '../ResourcesLoader';

const resources: ResourcesToLoad = {
    fbx: {
        box: '/three-assets/fbx/box.fbx',
    },
    gltf: {
        plant: '/three-assets/gltf/plant.gltf',
    },
    texture: {},
    cubeTexture: {
        envmap:[
            '/three-assets/texture/envmap/px.png',
            '/three-assets/texture/envmap/nx.png',
            '/three-assets/texture/envmap/py.png',
            '/three-assets/texture/envmap/ny.png',
            '/three-assets/texture/envmap/pz.png',
            '/three-assets/texture/envmap/nz.png'
        ]
    }
}
export default resources
