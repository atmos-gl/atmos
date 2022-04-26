import {
    DoubleSide,
    Mesh, MeshBasicMaterial, Object3D, PlaneGeometry,
} from 'three';

export class CustomPlane {
    private plane = null

    constructor(color) {
        this.init(color)
    }

    public init (color) {
        const geometry = new PlaneGeometry( 100, 100 );
        const material = new MeshBasicMaterial( {color: color, side: DoubleSide} );
        this.plane = new Mesh( geometry, material );
    }

    get mesh() {
        return this.plane
    }

    destroy () {
        this.plane = null
    }
}
