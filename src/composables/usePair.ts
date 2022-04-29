import paapi from '@paapi/client';
import {reactive, ref, toRef} from 'vue';

export default function usePair() {
    const link = reactive(paapi())
    const id = toRef(link, 'id')
    const paired = ref(false)
    link.onPair(() => {
        paired.value = true
    })
    return {link, id, paired}
}
