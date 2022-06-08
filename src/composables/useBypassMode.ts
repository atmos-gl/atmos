import {ref} from 'vue';

const isBypass = ref(false)
export default function () {
    const setBypass = set => {
        isBypass.value = set
    }
    const toggleBypass = () => {
        isBypass.value = !isBypass.value
    }
    return {
        isBypass,
        setBypass,
        toggleBypass
    }
}
