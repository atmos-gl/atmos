import {Color, Material, MathUtils, Mesh, MeshPhongMaterial, Object3D, Vector2, Vector3} from 'three';
import {animate, createExpoIn, reverseEasing} from 'popmotion';
import {BaseScene} from '../BaseScene';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {animateAsync, delay} from '../../utils';
import CustomDragControls from '../custom/CustomDragControls';
import {UnwrapNestedRefs} from 'vue';
import useUiTip, {UiTip} from '../three-composables/useUiTip';


const createXtoZ = (start, end, amp, offset = 0) => {
    const l = end - start
    return (x) => {
        const p = MathUtils.clamp((x - start) / l, 0, 1)
        return Math.sin(p * Math.PI) * amp + offset
    }
}


export default class Bottle {
    public object: Object3D;

    private scene: BaseScene;
    private controls: DragControls;
    private targetPosition: Vector3;
    private xToZ: (x) => number;
    private finalPosition: Vector3;
    private targetObject: Mesh;
    private helperAnimation: { stop: () => void } = null;
    private xToRotate: (x) => any;
    private visibleOpacity: number;
    private initialX: number;

    public onFinished?: () => void;
    public ui: UiTip

    constructor(object: Object3D, targetObjectMesh: Mesh, scene: BaseScene) {
        this.object = object
        this.targetObject = targetObjectMesh
        this.scene = scene

        this.init()
        this.setupControls()
        this.setupPositions()
    }

    init() {
        this.object.traverse(object => {
            if (object instanceof Mesh) {
                this.visibleOpacity = object.material.opacity
            }
        })
        this.setOpacity(0)
        this.object.visible = false

        this.ui = useUiTip(this.object, this.scene)
    }

    setupPositions() {
        this.xToZ = createXtoZ(50, 450, 300, this.object.position.z)
        this.xToRotate = createXtoZ(50, 450, Math.PI / 6)

        this.finalPosition = this.object.position.clone()
        this.targetPosition = this.object.position.clone()
        this.targetPosition.y -= 20;

        const initialPosition = new Vector2(450, -120)
        this.initialX = initialPosition.x

        this.object.position.x = initialPosition.x + 200
        this.object.position.y += initialPosition.y
    }

    setupControls() {
        this.controls = new CustomDragControls(
            [this.object],
            this.scene.camera,
            this.scene.canvas,
            {
                hoverCursor: 'grab',
                grabbingCursor: 'grabbing'
            }
        )
        this.controls.transformGroup = true
        this.controls.deactivate()

        this.controls.addEventListener('dragstart', async () => {
            this.startHelper()
            await delay(200)
            this.ui.hide()
        })
        this.controls.addEventListener('drag', (e) => {
            this.onDrag()
        })
    }

    startHelper() {
        return true
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
        return false
        this.helperAnimation.stop()
        this.helperAnimation = null
        const currentColor = (this.targetObject.material as MeshPhongMaterial).emissive.getHexString()
        animate({
            from: '#' + currentColor,
            to: '#000',
            onUpdate: v => {
                const mat = this.targetObject.material as MeshPhongMaterial
                mat.emissive = new Color(v)
            }
        })
    }

    async show() {
        this.object.visible = true
        await animateAsync({
            from: {
                translate: this.object.position.x,
                opacity: 0
            },
            to: {
                translate: this.initialX,
                opacity: this.visibleOpacity
            },
            onUpdate: v => {
                this.object.position.x = v.translate
                this.setOpacity(v.opacity)
            },
            ease: reverseEasing(createExpoIn(4)),
            duration: 1000
        })
        this.controls.activate()
        this.ui.show()
    }

    onDrag() {
        this.object.position.y = MathUtils.clamp(this.object.position.y, -10, 120)
        this.object.position.z = this.xToZ(this.object.position.x)
        this.object.rotation.x = this.xToRotate(this.object.position.x)

        if (this.object.position.x < -220) {
            this.object.position.x = -220
        }

        const distanceToTarget = this.object.position.distanceTo(this.targetPosition)
        if (distanceToTarget < 20) {
            this.snap()
        }
    }

    setOpacity(o) {
        this.object.traverse(object => {
            if (object instanceof Mesh) {
                object.material.opacity = o
            }
        })
    }

    async snap() {
        this.controls.dispose()
        this.stopHelper()
        await animateAsync({
            from: this.object.position,
            to: this.targetPosition,
            onUpdate: v => {
                const {x, y, z} = v
                this.object.position.set(x, y, z)
            },
        })
        await animateAsync({
            from: {
                rotation: 0,
                ...this.object.position
            },
            to: {
                rotation: Math.PI * 4,
                ...this.finalPosition
            },
            onUpdate: v => {
                this.object.rotation.y = v.rotation
                const {x, y, z} = v
                this.object.position.set(x, y, z)
            },
            duration: 1000
        })
        this.onFinished?.()
    }

    public dispose() {

    }
}
