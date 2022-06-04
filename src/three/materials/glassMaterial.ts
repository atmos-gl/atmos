import {MeshPhysicalMaterial, MeshPhysicalMaterialParameters} from 'three';
import ResourcesLoader from '../ResourcesLoader';
import {commonLoader} from '../../composables/useLoader';

export default function getGlassMaterial(options: MeshPhysicalMaterialParameters = {}) {
    const envMap = commonLoader.loader.getCubeTexture('envmap')
    const params = Object.assign(
        {
            color: '#ffffff',
            // transparent: true,
            // opacity: 0.8,
            roughness: 0,
            // metalness: 0.8,
            envMap,
            transmission: 0.9,
            ior: 5,

        }, options)
    const mat = new MeshPhysicalMaterial(params)
    mat.thickness = 15
    return mat
}
