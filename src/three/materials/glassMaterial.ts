import {MeshStandardMaterial} from 'three';
import ResourcesLoader from '../ResourcesLoader';

export default function getGlassMaterial(color = '#ffffff') {
        const envMap = ResourcesLoader.getInstance().getCubeTexture('envmap')
    return new MeshStandardMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.5,
        roughness: 0,
        metalness: 0.8,
        envMap,
    })
}
