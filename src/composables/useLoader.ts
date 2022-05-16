import ResourcesLoader, {ResourcesToLoad} from '../three/ResourcesLoader';
import {computed, ComputedRef, Ref, ref, UnwrapRef} from 'vue';
import exploreResources from '../three/resources/exploreResources';
import powerBlockResources from '../three/resources/powerBlockResources';
import tomatoResources from '../three/resources/tomatoResources';
import headerResources from '../three/resources/headerResources';

const loaders = {
    header: createLoader(headerResources),
    explore: createLoader(exploreResources),
    powerBlock: createLoader(powerBlockResources),
    tomato: createLoader(tomatoResources),
}

type LoaderComposable = { percentageProgress: ComputedRef<string>; load: () => void; loader: ResourcesLoader; ready: ComputedRef<boolean>; progress: Ref<UnwrapRef<number>>; loading: Ref<UnwrapRef<boolean>> };

function createLoader(toLoad?: ResourcesToLoad): LoaderComposable {
    const loader = new ResourcesLoader()
    const progress = ref(0)
    const loading = ref(true)
    const ready = computed(() => !loading.value)
    const percentageProgress = computed(() => {
        return Math.round(progress.value * 100) + ' %'
    })

    const load = () => {
        if (toLoad) {
            if (loader.alreadyLoaded(toLoad)) {
                progress.value = 1
                loading.value = false
            } else {
                loader.bulkLoad(toLoad)
            }
        }
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
        load,
        loading,
        ready,
        progress,
        percentageProgress
    }
}

export const exploreLoader = loaders.explore
export const powerBlockLoader = loaders.powerBlock
export const tomatoLoader = loaders.tomato
export const headerLoader = loaders.header

export default function useLoader(name): LoaderComposable {
    return loaders[name]
}
