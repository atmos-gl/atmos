import {Mesh, MeshStandardMaterial} from 'three';
import ResourcesLoader from '../ResourcesLoader';

export const goldMat = new MeshStandardMaterial({
        color: '#ffcd00',
        roughness: 0.2,
        metalness: 0.6,
        transparent: true
    })

export function getMetalMaterial(loader: ResourcesLoader, color = '#ffffff') {
    const envMap = loader.getCubeTexture('envmap')
    return new MeshStandardMaterial({
        color: '#c9d1d9',
        roughness: 0.5,
        metalness: 0.6,
        transparent: true,
        envMap
    })
}
