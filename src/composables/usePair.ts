import paapi from '@paapi/client';
import {reactive, ref, toRef} from 'vue';

export default function usePair(withId?: string) {
    const link = reactive(paapi())
    link.pair(withId).then()

    const id = toRef(link, 'id')
    return {link, id}
}
