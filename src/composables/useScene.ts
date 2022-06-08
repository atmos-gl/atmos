import {BaseScene} from '../three/BaseScene';
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {useEventBus} from '@vueuse/core';

export default function useScene<T extends BaseScene>(scene: T) {
    const bus = useEventBus<string>('init-scene')
    const canvas = ref(null)
    const appReady = ref(false)

    onMounted(() => {
        scene.init(canvas.value)
        scene.run()
        appReady.value = true
        bus.emit(scene.name)
    })

    onBeforeUnmount(() => {
        scene.destroy()
    })
    return {canvas, scene, appReady}
}
