import ResourcesLoader, {ResourcesToLoad} from '../three/ResourcesLoader';
import {computed, ComputedRef, Ref, ref, UnwrapRef} from 'vue';
import exploreResources from '../three/resources/exploreResources';
import powerBlockResources from '../three/resources/powerBlockResources';
import tomatoResources from '../three/resources/tomatoResources';
import headerResources from '../three/resources/headerResources';
import growResources from '../three/resources/growResources';

const loaders = {
    header: createLoader(headerResources),
    explore: createLoader(exploreResources),
    powerBlock: createLoader(powerBlockResources),
    tomato: createLoader(tomatoResources),
    grow: createLoader(growResources),
}

export type LoaderComposable = { percentageProgress: ComputedRef<string>; load: () => void; loader: ResourcesLoader; ready: ComputedRef<boolean>; progress: Ref<UnwrapRef<number>>; loading: Ref<UnwrapRef<boolean>> };

function createLoader(toLoad?: ResourcesToLoad): LoaderComposable {
    const loader = new ResourcesLoader()
    const progress = ref(0)
    const loading = ref(true)
    const ready = computed(() => !loading.value)
    const percentageProgress = computed(() => {
        return Math.round(progress.value * 100) + ' %'
    })

    let itemsToLoad = 0
    let itemsLoaded = 0

    const load = () => {
        if (ready.value === true) {
            return
        }
        if (toLoad) {
            if (loader.alreadyLoaded(toLoad)) {
                progress.value = 1
                loading.value = false
            } else {
                itemsToLoad = (
                    Object.keys(toLoad.texture).length +
                    Object.keys(toLoad.cubeTexture).length +
                    Object.keys(toLoad.gltf).length +
                    Object.keys(toLoad.fbx).length
                )
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
    loader.onItemLoaded = function () {
        itemsLoaded++
        progress.value = itemsLoaded / itemsToLoad
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
export const growLoader = loaders.grow

export default function useLoader(name): LoaderComposable {
    return loaders[name]
}

export function combineLoaders(...loaders: LoaderComposable[]) {
    const loading = computed(() => {
        for (const loader of loaders) {
            if (loader.loading.value) return true
        }
        return false
    })
    const progress = computed(() => {
        let sum = 0;
        for (const loader of loaders) {
            sum += loader.progress.value
        }
        return sum / loaders.length
    })

    const load = () => {
        for (const loader of loaders) {
            loader.load()
        }
    }

    return {
        loading,
        progress,
        load
    }
}
