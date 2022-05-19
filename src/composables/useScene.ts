import {BaseScene} from '../three/BaseScene';
import {onBeforeUnmount, onMounted, ref} from 'vue';

export default function useScene<T extends BaseScene>(scene: T) {
    const canvas = ref(null)
    const appReady = ref(false)

    onMounted(() => {
        scene.init(canvas.value)
        scene.run()
        appReady.value = true
    })

    onBeforeUnmount(() => {
        scene.destroy()
    })
    return {canvas, scene, appReady}
}
