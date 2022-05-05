import {MathUtils, Mesh, MeshStandardMaterial, Object3D, Vector3} from 'three';
import {DragAnimatable} from '../three-composables/useDragAnimations';
import {animate, createExpoIn, easeOut, mirrorEasing, reverseEasing} from 'popmotion';
import {BaseScene} from '../BaseScene';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {animateAsync} from '../../utils';


const createXtoZ = (start, end, amp, offset) => {
    const l = end - start
    return (x) => {
        const p = MathUtils.clamp((x - start) / l, 0, 1)
        return Math.sin(p * Math.PI) * amp + offset
    }
}


export default class Bottle {
    public mesh: Object3D;
    public handle: Object3D;
    private _open = 0

    private minRotation = 0;
    private maxRotation = 2;

    public onOpen?: () => void
    private scene: BaseScene;
    private controls: DragControls;
    private targetPosition: Vector3;
    private xToZ: (x) => number;
    private finalPosition: Vector3;

    constructor(object: Object3D, scene: BaseScene) {
        this.mesh = object
        this.scene = scene

        this.init()
        this.setupControls()
    }

    init() {
        const metalMat = new MeshStandardMaterial({
            color: '#c9d1d9',
            roughness: 0.5,
            metalness: 0.6,
            transparent: true
        })

        const goldMat = new MeshStandardMaterial({
            color: '#ffcd00',
            roughness: 0.2,
            metalness: 0.6,
            transparent: true
        })
        this.mesh.getObjectByName('Cylinder').material = metalMat
        this.mesh.getObjectByName('Sweep').material = goldMat

        this.setOpacity(0)

    }

    setupControls() {
        this.controls = new DragControls([this.mesh], this.scene.camera, this.scene.canvas)
        this.controls.transformGroup = true
        this.controls.deactivate()
        this.xToZ = createXtoZ(-150, 500, 300, this.mesh.position.z)

        this.finalPosition = this.mesh.position.clone()
        this.targetPosition = this.mesh.position.clone()
        this.targetPosition.y -= 20;

        this.mesh.position.x = 600
        this.mesh.position.y = 112

        this.controls.addEventListener('drag', (e) => {
            this.onDrag()
        })
    }

    show() {
        this.controls.activate()
        this.mesh.visible = true
        animate({
            from: {
                translate: this.mesh.position.x,
                opacity: 0
            },
            to: {
                translate: 500,
                opacity: 1
            },
            onUpdate: v => {
                this.mesh.position.x = v.translate
                this.setOpacity(v.opacity)
            },
            ease: reverseEasing(createExpoIn(4)),
            duration: 1000
        })
    }

    onDrag() {
        this.mesh.position.y = MathUtils.clamp(this.mesh.position.y, 1, 120)
        this.mesh.position.z = this.xToZ(this.mesh.position.x)

        const distanceToTarget = this.mesh.position.distanceTo(this.targetPosition)
        if (distanceToTarget < 50) {
            this.snap()
        }
    }

    setOpacity(o) {
        this.mesh.traverse(object => {
            if (object instanceof Mesh) {
                object.material.opacity = o
            }
        })
    }

    async snap() {
        this.controls.dispose()
        await animateAsync({
            from: this.mesh.position,
            to: this.targetPosition,
            onUpdate: v => {
                const {x, y, z} = v
                this.mesh.position.set(x, y, z)
            },
        })
        await animateAsync({
            from: {
                rotation: 0,
                ...this.mesh.position
            },
            to: {
                rotation: Math.PI * 4,
                ...this.finalPosition
            },
            onUpdate: v => {
                this.mesh.rotation.y = v.rotation
                const {x, y, z} = v
                this.mesh.position.set(x, y, z)
            },
            duration: 1000
        })
    }

}
