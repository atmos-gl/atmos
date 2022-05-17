import {Mesh, Object3D} from 'three';

export function disposeFullObject(object: Object3D) {
    object.traverse?.((child: any) => {
        child.material?.dispose?.()
        child.geometry?.dispose?.()
        // disposeFullObject(child)
    })
}
