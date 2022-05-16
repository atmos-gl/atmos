import {
    Box3,
    BoxGeometry,
    DoubleSide,
    Mesh, MeshBasicMaterial, SphereGeometry, Vector3
} from 'three';

export class Cube {
    private cube = null

    constructor(color) {
        this.init(color)
    }

    public init (color) {
        const geometry = new BoxGeometry(10, 10, 10);
        const material = new MeshBasicMaterial( {color: color, side: DoubleSide} );
        this.cube = new Mesh( geometry, material );
    }

    get mesh() {
        return this.cube
    }

    destroy () {
        this.cube = null
    }
}
