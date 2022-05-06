import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {Camera, Object3D} from 'three';

export type CustomOptions = {
    hoverCursor?: string,
    grabbingCursor?: string,
}
export default class CustomDragControls extends DragControls {
    private domElement: HTMLElement;
    constructor(
        objects: Object3D[],
        camera: Camera,
        domElement?: HTMLElement,
        customOptions?: CustomOptions
    ) {
        super(objects, camera, domElement)
        this.setupCustom(customOptions)
        this.domElement = domElement
    }

    private setupCustom(options: CustomOptions) {
        if (options.hoverCursor) {
            this.addEventListener('hoveron', (e) => {
                setTimeout(() => {
                    this.domElement.style.cursor = options.hoverCursor
                }, 0)
            })
        }
        if (options.grabbingCursor) {
            this.addEventListener('dragstart', (e) => {
                this.domElement.style.cursor = 'grabbing'
            })
        }
    }
}
