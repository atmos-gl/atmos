import {Color, MathUtils, Mesh, MeshPhongMaterial, Object3D, Vector2, Vector3, Vector4} from 'three';
import {animate, createExpoIn, reverseEasing} from 'popmotion';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {animateAsync, delay} from '../../utils';
import CustomDragControls from '../custom/CustomDragControls';
import useUiTip, {UiTip} from '../three-composables/useUiTip';
import {SetupPowerBlockScene} from '../SetupPowerBlock';


const createXtoZ = (start, end, amp, offset = 0) => {
    const l = end - start
    return (x) => {
        const p = MathUtils.clamp((x - start) / l, 0, 1)
        return Math.sin(p * Math.PI) * amp + offset
    }
}


export default class Bottle {
    public object: Object3D;

    protected scene: SetupPowerBlockScene;
    protected controls: DragControls;
    protected targetPosition: Vector3;
    protected xToZ: (x) => number;
    protected finalPosition: Vector3;
    protected targetObject: Mesh;
    protected helperAnimation: { stop: () => void } = null;
    protected xToRotate: (x) => any;
    protected visibleOpacity: number;

    public onFinished?: () => void;
    public ui: UiTip
    protected clamp: Vector4;
    protected screwDirection: number;
    protected initialPosition: Vector2;

    constructor({
                    object,
                    targetObjectMesh,
                    scene,
                    clamp = new Vector4(-220, 1000, -10, 120),
                    screwDirection = -1,
                    initialPosition = new Vector2(450, 50)
                }: { object: Object3D, targetObjectMesh: Mesh, scene: SetupPowerBlockScene, clamp?: Vector4, screwDirection?: number, initialPosition?: Vector2 },
    ) {
        this.object = object
        this.targetObject = targetObjectMesh
        this.scene = scene
        this.clamp = clamp
        this.screwDirection = screwDirection
        this.initialPosition = initialPosition

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
        this.targetPosition.y += this.screwDirection * 20;

        this.object.position.x = this.initialPosition.x + 800
        this.object.position.y = this.initialPosition.y
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
                x: this.object.position.x,
                y: this.object.position.y,
                opacity: 0
            },
            to: {
                x: this.initialPosition.x,
                y: this.initialPosition.y,
                opacity: this.visibleOpacity
            },
            onUpdate: v => {
                this.object.position.x = v.x
                this.object.position.y = v.y
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
        if (this.object.position.x > this.clamp.y) {
            this.object.position.x = this.clamp.y
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
                rotation: Math.PI * -4 * this.screwDirection,
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
