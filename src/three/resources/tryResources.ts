import {ResourcesToLoad} from '../ResourcesLoader';

const resources: ResourcesToLoad = {
    fbx: {
        box: '/three-assets/fbx/box.fbx',
        // explore: '/three-assets/fbx/explore_v2.fbx'
    },
    gltf: {
        explore: '/three-assets/gltf/explore_v1.gltf'
        // box: '/three-assets/gltf/box.gltf'
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
