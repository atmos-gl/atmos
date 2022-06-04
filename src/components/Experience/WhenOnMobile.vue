<script setup lang="ts">
import {computed, onBeforeUnmount, ref, toRefs} from 'vue';
import {StateValue} from 'xstate';
import Grow from './Grow.vue'
import {growLoader} from '../../composables/useLoader';
import sequenceManager from '../../managers/sequenceManager';
import Collect from './Collect.vue';
import {TomatoParams} from '../../three/objects/Tomato';
import {animate, linear} from 'popmotion';
import Share from './Share.vue';

const props = defineProps<{
  step: StateValue,
  tomatoParams: TomatoParams
}>()
const {step} = toRefs(props)
const {loading, percentageProgress} = growLoader

const hour = ref(10)
const timer = computed(() => {
  const h = Math.round(hour.value)
  const m = ((hour.value % 1) * 60).toFixed(0).padStart(2, '0')
  return `${h}h${m}`
})

sequenceManager.onTransition(state => {
  if (state.value === 'grow') {
    animate({
      from: hour.value,
      to: 17,
      duration: 10000,
      ease: linear,
      onUpdate: v => {
        hour.value = v
      }
    })
  }
})

const collectButtonHover = ref(false)
const holdProgress = ref(0)
let animation = null
const onHoverCollectButton = () => {
  collectButtonHover.value = true
  sequenceManager.send('startCollect')
}
const startProgress = () => {
  const to = 100
  const from = holdProgress.value
  const duration = (to - from) * 30
  animation = animate({
    from,
    to,
    duration,
    ease: linear,
    onUpdate: v => holdProgress.value = v,
    onComplete: onEnd
  })
}
const mouseUp = () => {
  animation?.stop()
  if (holdProgress.value === 100) {
    sequenceManager.send('collected')
  }
}
const onEnd = () => {
  console.log('end')
}
window.addEventListener('mouseup', mouseUp)
onBeforeUnmount(() => (
    window.removeEventListener('mouseup', mouseUp)
))
const collectScene = ref(null)
const setCollectScene = scene => {
  collectScene.value = scene
}

</script>
<template>
  <div class="flex-col flex h-full w-full relative">

    <Transition name="fade" mode="out-in">
      <div v-if="loading">Loading: {{ percentageProgress }}</div>
      <Grow v-else-if="['customizeTomato', 'growReady', 'grow', 'collectReady'].includes(step.toString())"
            :tomato-params="props.tomatoParams"/>
      <Collect v-else-if="['collect', 'collected', 'share'].includes(step.toString())"
               class="transform h-full w-full transition duration-400"
               :class="{ '-translate-x-1/5': step === 'share' }"
               :progress="holdProgress"
               :tomato-params="tomatoParams"
               @load-scene="setCollectScene"
      />
    </Transition>

    <Transition name="fade">
      <div v-if="['customizeTomato', 'tomatoExplanation'].includes(step.toString())"
           class="absolute w-full h-full inset-0 center-content bg-imperial/60">
        <div class="max-w-172 text-jade italic text-center">
          Ça se passe sur votre application ! <br>
          Consultez votre téléphone.
<!--          <button @click="sequenceManager.send('tomatoOk');">Heey</button>-->
        </div>
      </div>
      <div v-else-if="['growReady', 'grow'].includes(step.toString())"
           class="absolute w-full h-full inset-0">
        <div class="p-12 text-jade font-bold text-5xl">
          <i class="uil uil-clock mr-1"></i>{{ timer }}
<!--          <button @click="sequenceManager.send('startGrow')">go</button>-->
        </div>
      </div>
      <div v-else-if="['collectReady', 'collect'].includes(step.toString())"
           class="absolute w-full h-full inset-0 center-content transition duration-200"
           :class="{ 'bg-imperial/90': !holdProgress }"
      >
        <div class="max-w-172 text-jade italic text-center">
          <div class="transition duration-200" :class="{ 'opacity-0': !!holdProgress }">
            <h2 class="text-4xl font-title">Et voilà !</h2>
            <p class="my-4">Lors de votre retours chez vous, il ne vous reste plus qu'à récolter.</p>
          </div>
          <button class="btn btn-static relative w-72 relative overflow-hidden"
                  @mouseenter="onHoverCollectButton"
                  @mouseleave="collectButtonHover = false"
                  @mousedown="startProgress"
          >
            <Transition name="fade-quick" mode="out-in">
              <span v-if="collectButtonHover">Cliquer et maintenir</span>
              <span v-else>Récolter les tomates</span>
            </Transition>
            <span class="block absolute bg-white inset-0 h-full overflow-hidden" :style="{ width: holdProgress + '%' }">
            <span class="block h-full center-content w-72 text-black">
          <Transition name="fade-quick" mode="out-in">
            <span v-if="holdProgress === 100">Relâcher</span>
            <span v-else-if="collectButtonHover">Cliquer et maintenir</span>
            <span v-else>Récolter les tomates</span>
          </Transition>
            </span>
          </span>
          </button>
        </div>
      </div>
      <Share v-else-if="['share'].includes(step.toString())" :scene="collectScene" />
    </Transition>
  </div>
</template>
