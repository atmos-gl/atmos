import {Color, Material, MathUtils, Mesh, MeshPhongMaterial, MeshStandardMaterial, Object3D, Vector3} from 'three';
import {animate, Animation, createExpoIn, reverseEasing} from 'popmotion';
import {BaseScene} from '../BaseScene';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {animateAsync} from '../../utils';


const createXtoZ = (start, end, amp, offset = 0) => {
    const l = end - start
    return (x) => {
        const p = MathUtils.clamp((x - start) / l, 0, 1)
        return Math.sin(p * Math.PI) * amp + offset
    }
}


export default class Bottle {
    public mesh: Object3D;

    private scene: BaseScene;
    private controls: DragControls;
    private targetPosition: Vector3;
    private xToZ: (x) => number;
    private finalPosition: Vector3;
    private targetObject: Mesh;
    private helperAnimation: { stop: () => void } = null;
    private xToRotate: (x) => any;

    constructor(object: Object3D, targetObjectMesh: Mesh, scene: BaseScene) {
        this.mesh = object
        this.targetObject = targetObjectMesh
        this.scene = scene

        const mat = (this.targetObject.material as Material).clone()
        this.targetObject.material = mat

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
        ;(this.mesh.getObjectByName('Cylinder') as Mesh).material = metalMat
        ;(this.mesh.getObjectByName('Sweep') as Mesh).material = goldMat

        this.setOpacity(0)

    }

    setupControls() {
        this.controls = new DragControls([this.mesh], this.scene.camera, this.scene.canvas)
        this.controls.transformGroup = true
        this.controls.deactivate()
        this.xToZ = createXtoZ(50, 500, 300, this.mesh.position.z)
        this.xToRotate = createXtoZ(50, 500, Math.PI / 6)

        this.finalPosition = this.mesh.position.clone()
        this.targetPosition = this.mesh.position.clone()
        this.targetPosition.y -= 20;

        this.mesh.position.x += 900
        this.mesh.position.y -= 20

        this.controls.addEventListener('dragstart', (e) => {
            this.startHelper()
        })
        this.controls.addEventListener('drag', (e) => {
            this.onDrag()
        })
    }

    startHelper() {
        if (this.helperAnimation !== null) return
        this.helperAnimation = animate({
            from: '#000',
            to: '#484848',
            repeat: Infinity,
            repeatType: "mirror",
            onUpdate: v => {
                (this.targetObject.material as MeshPhongMaterial).emissive = new Color(v)
            },
            duration: 600
        })
    }

    stopHelper() {
        this.helperAnimation.stop()
        this.helperAnimation = null
        const currentColor = (this.targetObject.material as MeshPhongMaterial).emissive.getHexString()
        animate({
            from: '#' + currentColor,
            to: '#000',
            onUpdate: v => {
                this.targetObject.material.emissive = new Color(v)
            }
        })
    }

    async show() {
        this.mesh.visible = true
        await animateAsync({
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
        this.controls.activate()
    }

    onDrag() {
        this.mesh.position.y = MathUtils.clamp(this.mesh.position.y, 1, 120)
        this.mesh.position.z = this.xToZ(this.mesh.position.x)
        this.mesh.rotation.x = this.xToRotate(this.mesh.position.x)

        if (this.mesh.position.x < -220) {
            this.mesh.position.x = -220
        }

        const distanceToTarget = this.mesh.position.distanceTo(this.targetPosition)
        if (distanceToTarget < 20) {
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
        this.stopHelper()
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
