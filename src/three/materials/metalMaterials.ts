import {Mesh, MeshStandardMaterial} from 'three';

export const metalMat = new MeshStandardMaterial({
    color: '#c9d1d9',
    roughness: 0.5,
    metalness: 0.6,
    transparent: true
})

export const goldMat = new MeshStandardMaterial({
        color: '#ffcd00',
        roughness: 0.2,
        metalness: 0.6,
        transparent: true
    })
