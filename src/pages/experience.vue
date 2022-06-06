<script setup lang="ts">
import SetupPowerBlock from '../components/Experience/SetupPowerBlock.vue';
import {combineLoaders, commonLoader, growLoader, powerBlockLoader} from '../composables/useLoader';
import sequenceManager from '../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import {onBeforeUnmount, onMounted, reactive, ref, watch} from 'vue';
import PairPhone from '../components/Experience/PairPhone.vue';
import Link from '@paapi/client/dist/Link';
import WhenOnMobile from '../components/Experience/WhenOnMobile.vue';
import Introduction from '../components/Experience/Introduction.vue';
import {TomatoColor, TomatoParams} from '../three/objects/Tomato';
import Loader from '../components/Loader.vue';
import SkipButton from '../components/SkipButton.vue';
import {useEventBus} from '@vueuse/core';

const {
  loading: powerBlockLoading,
  progress: powerBlockProgress,
  load: loadPowerBlock
} = commonLoader.ready.value ? powerBlockLoader : combineLoaders(commonLoader, powerBlockLoader)
const {
  loading: growLoading,
  progress: growProgress
} = growLoader

const displayPowerBlockLoading = ref(powerBlockLoading.value)
const bus = useEventBus('init-scene')
watch(powerBlockLoading, isLoading => {
  displayPowerBlockLoading.value = isLoading
})
bus.on(scene => {
  if (scene === 'power-block') {
    displayPowerBlockLoading.value = false
  }
})

const {state, send} = useActor(sequenceManager)

const tomatoParams: TomatoParams = reactive({
  long: 1,
  size: 1,
  color: TomatoColor.red
})

const link = ref<Link>(null)
const onPair = (l: Link) => {
  sequenceManager.send('phonePaired')

  link.value = l
  const updateStateToLink = () => {
    link.value.emit('update:state', sequenceManager.state.value)
  }
  sequenceManager.onTransition(() => {
    updateStateToLink()
  })
  link.value.on('sequence:send', event => {
    sequenceManager.send(event)
  })
  link.value.on('update:tomato', (newParams: TomatoParams) => {
    tomatoParams.long = newParams.long
    tomatoParams.size = newParams.size
    tomatoParams.color = newParams.color
  })
  updateStateToLink()
}

onMounted(loadPowerBlock)

onBeforeUnmount(() => {
  sequenceManager.stop()
  sequenceManager.start()
})
</script>
<template>
  <div class="experience-wrapper theme-gradient h-full">
    <Transition name="fade" mode="out-in">
      <Introduction v-if="state.value === 'introduction'" @next="send('next')"/>
      <PairPhone v-else-if="state.value === 'leaveWork'" @pair="onPair"/>
      <Transition
          v-else-if=" ['tomatoExplanation', 'customizeTomato', 'growReady','grow', 'collectReady', 'collect', 'collected', 'share'].includes(state.value)"
          name="fade-quick" mode="out-in"
      >
        <Loader v-if="growLoading" :progress="growProgress"/>
        <WhenOnMobile
            v-else
            :step="state.value"
            :tomato-params="tomatoParams"
        />
      </Transition>
      <div class="w-full h-full" v-else>
        <SetupPowerBlock v-if="!powerBlockLoading" class="w-full h-full z-10"/>
        <Transition name="fade-quick">
          <div v-show="displayPowerBlockLoading" class="absolute w-full h-full inset-0 bg-imperial">
            <Loader :progress="powerBlockProgress"/>
          </div>
        </Transition>
      </div>
    </Transition>
    <SkipButton/>
  </div>
</template>
<style scoped>
.experience-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
