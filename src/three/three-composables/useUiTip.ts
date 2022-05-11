import {Object3D, Vector2, Vector3} from 'three';
import {BaseScene} from '../BaseScene';
import {reactive, UnwrapNestedRefs} from 'vue';

export type UiTip = { hide: () => void; show: () => void; state: UnwrapNestedRefs<{ show: boolean; position: Vector2 }> }

export default function useUiTip(object: Object3D, scene: BaseScene): UiTip {
    const state = reactive({
        show: false,
        position: new Vector2(0, 0),
    })

    const updatePosition = () => {
        console.log('updating ui position')
        const vector = new Vector3()
        object.getWorldPosition(vector)
        vector.x += 0.2
        vector.y += 0.2
        vector.project(scene.camera)

        state.position = new Vector2(
            (vector.x + 1) * scene.canvas.clientWidth / 2,
            -(vector.y - 1) * scene.canvas.clientHeight / 2
        )
    }

    const show = () => {
        updatePosition()
        state.show = true
        window.addEventListener('resize', updatePosition)
    }
    const hide = () => {
        state.show = false
        window.removeEventListener('resize', updatePosition)
    }

    return {
        state,
        show,
        hide
    }
}
