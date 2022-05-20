<script setup lang="ts">
import SetupPowerBlock from '../components/Experience/SetupPowerBlock.vue';
import {growLoader, powerBlockLoader} from '../composables/useLoader';
import sequenceManager from '../managers/sequenceManager';
import {useActor} from '@xstate/vue';
import {reactive, ref, watch} from 'vue';
import PairPhone from '../components/Experience/PairPhone.vue';
import Link from '@paapi/client/dist/Link';
import WhenOnMobile from '../components/Experience/WhenOnMobile.vue';
import Introduction from '../components/Experience/Introduction.vue';
import {TomatoColor, TomatoParams} from '../three/objects/Tomato';

const {loading, percentageProgress} = powerBlockLoader
if (!powerBlockLoader.ready.value) {
  powerBlockLoader.load()
}
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

// Preload further resources
watch(loading, newVal => {
  if (!newVal) {
    growLoader.load()
  }
})
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <div v-else class="experience-wrapper theme-gradient h-full">
    <Transition name="fade" mode="out-in">
      <Introduction v-if="state.value === 'introduction'" @next="send('next')"/>
      <PairPhone v-else-if="state.value === 'leaveWork'" @pair="onPair"/>
      <WhenOnMobile
          v-else-if=" ['tomatoExplanation', 'customizeTomato', 'growReady','grow', 'collectReady', 'collect', 'collected', 'share'].includes(state.value)"
          :step="state.value"
          :tomato-params="tomatoParams"
      />
      <SetupPowerBlock v-else class="w-full h-full"/>
    </Transition>
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
