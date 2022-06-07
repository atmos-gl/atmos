<script setup lang="ts">
import usePair from '../../composables/usePair';
import CustomizeTomato from '../../components/Mobile/CustomizeTomato.vue';
import {reactive, ref, watch} from 'vue';
import TomatoExplanation from '../../components/Mobile/TomatoExplanation.vue';
import {tomatoLoader} from '../../composables/useLoader';
import GrowTomatoes from '../../components/Mobile/GrowTomatoes.vue';
import {TomatoColor, TomatoParams} from '../../three/objects/Tomato';
import MobileShare from '../../components/Mobile/MobileShare.vue';
import useShareResult from '../../composables/useShareResult';

const props = defineProps(['id'])

const step = ref('tomatoExplanation')
// step.value = 'share'

const {shareId, setShareID} = useShareResult()
setShareID('6e7b42ec-1779-4f14-b475-a957dbe857bc')
const {link} = usePair()

link.on('update:state', newVal => {
  step.value = newVal
})
link.on('update:shareId', id => {
  setShareID(id)
})
const sendSequence = event => {
  link.emit('sequence:send', event)
}

const tomatoParams: TomatoParams = reactive({
  long: 1,
  size: 1,
  color: TomatoColor.red
})

watch(tomatoParams, () => {
  link.emit('update:tomato', tomatoParams)
})
// Start loading resources for tomato in background
tomatoLoader.load()

link.pair(props.id)
</script>
<template>
  <main class="theme-gradient min-h-full text-white">
    <Transition name="fade" mode="out-in">
      <TomatoExplanation v-if="step === 'tomatoExplanation'" @next="sendSequence('startTomato')" />
      <CustomizeTomato v-else-if="step === 'customizeTomato'" :tomato="tomatoParams" @confirm-tomato="sendSequence('tomatoOk')" />
      <GrowTomatoes v-else-if="['grow', 'growReady'].includes(step)" @grow="sendSequence('startGrow')" />
      <MobileShare v-else-if="['share'].includes(step) && shareId" />
    </Transition>
  </main>
</template>
