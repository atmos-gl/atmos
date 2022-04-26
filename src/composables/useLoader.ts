import ResourcesLoader, {ResourcesToLoad} from '../three/ResourcesLoader';
import {computed, ref} from 'vue';

export default function useLoader(toLoad?: ResourcesToLoad) {

    const loader = ResourcesLoader.getInstance()
    const progress = ref(0)
    const loading = ref(true)
    const ready = computed(() => !loading.value)
    const percentageProgress = computed(() => {
        return Math.round(progress.value * 100) + ' %'
    })

    if (toLoad) {
        loader.bulkLoad(toLoad)
    }

    // loader.onStart = function (url, itemsLoaded, itemsTotal) {
    //     console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    // };
    loader.onLoad = async function () {
        loading.value = false
    };
    loader.onProgress = function (url, itemsLoaded, itemsTotal) {
        progress.value = itemsLoaded / itemsTotal
    };
    loader.onError = function (url) {
        console.log('There was an error loading ' + url);
    };
    return {
        loader,
        loading,
        ready,
        progress,
        percentageProgress
    }
}
