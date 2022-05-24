import {Color, MathUtils, Mesh, MeshPhongMaterial, Object3D, Vector2, Vector3, Vector4} from 'three';
import {animate, createExpoIn, reverseEasing} from 'popmotion';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {animateAsync, delay} from '../../utils';
import CustomDragControls from '../custom/CustomDragControls';
import useUiTip, {UiTip} from '../three-composables/useUiTip';
import {SetupPowerBlock} from '../SetupPowerBlock';


const createXtoZ = (start, end, amp, offset = 0) => {
    const l = end - start
    return (x) => {
        const p = MathUtils.clamp((x - start) / l, 0, 1)
        return Math.sin(p * Math.PI) * amp + offset
    }
}


export default class Bottle {
    public object: Object3D;

    private scene: SetupPowerBlock;
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
    private clamp: Vector4;

    constructor(object: Object3D,
                targetObjectMesh: Mesh,
                scene: SetupPowerBlock,
                clamp: Vector4 = new Vector4(-220, 1000, -10, 120)
    ) {
        this.object = object
        this.targetObject = targetObjectMesh
        this.scene = scene
        this.clamp = clamp

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

        const initialPosition = new Vector2(450, -50)
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
        this.scene.setSelection(this.targetObject)
    }

    stopHelper() {
       this.scene.clearSelection()
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
        this.object.position.y = MathUtils.clamp(this.object.position.y, this.clamp.z, this.clamp.w)
        this.object.position.z = this.xToZ(this.object.position.x)
        this.object.rotation.x = this.xToRotate(this.object.position.x)

        if (this.object.position.x < this.clamp.x) {
            this.object.position.x = this.clamp.x
        }
        if (this.object.position.y > this.clamp.y) {
            this.object.position.y = this.clamp.y
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
