import {MeshPhysicalMaterial, MeshStandardMaterial} from 'three';
import ResourcesLoader from '../ResourcesLoader';

export default function getGlassMaterial(color = '#ffffff') {
    const envMap = ResourcesLoader.getInstance().getCubeTexture('envmap')
    const mat = new MeshPhysicalMaterial({
        color: '#ffffff',
        transparent: true,
        // opacity: 0.8,
        roughness: 0,
        // metalness: 0.8,
        envMap,
        transmission: 1,
        ior: 5,
    })
    mat.thickness = 15
    return mat
}
