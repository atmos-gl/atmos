import {MathUtils, Mesh, Object3D, Vector2, Vector3} from 'three';
import {BaseScene} from '../BaseScene';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import CustomDragControls from '../custom/CustomDragControls';
import {animateAsync, delay} from '../../utils';
import useUiTip, {UiTip} from '../three-composables/useUiTip';

export default class Tray {
    public object: Object3D;

    private scene: BaseScene;
    private controls: DragControls;

    public onOpen?: () => void;
    private initialPos: Vector3;

    private openX = 303

    public ui: UiTip

    constructor(object: Object3D, scene: BaseScene) {
        this.object = object
        this.scene = scene

        this.init()
        this.setupControls()
    }

    init() {
        this.initialPos = this.object.position.clone()
        const handle = this.object.getObjectByName('Cylinder_4')
        this.ui = useUiTip(handle, this.scene, new Vector2(0, 0))
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
            await delay(200)
            this.ui.hide()
        })
        this.controls.addEventListener('drag', (e) => {
            this.onDrag()
        })
        this.controls.addEventListener('dragend', (e) => {
            this.snap()
        })
    }

    enable() {
        this.controls.activate()
        this.ui.show()
    }
    disable() {
        this.controls.dispose()
    }

    onDrag() {
        const position = this.object.position
        position.y = this.initialPos.y
        position.z = this.initialPos.z

        position.x = MathUtils.clamp(position.x, this.initialPos.x, this.openX)
    }

    async snap() {
        const position = this.object.position
        const progress = (position.x - this.initialPos.x) / (this.openX - this.initialPos.x)

        const shouldOpen = progress > 0.4
        let to = this.initialPos.x
        if (shouldOpen) {
            to = this.openX
        }
        await animateAsync({
            from: position.x,
            to,
            onUpdate: v => {
                position.x = v
            }
        })
        if (shouldOpen) {
            this.onOpen?.()
        }
    }

    public close() {
        const position = this.object.position
        return animateAsync({
            from: position.x,
            to: this.initialPos.x,
            onUpdate: v => {
                position.x = v
            },
            duration: 800,
        })
    }

}
