<script setup lang="ts">
import {computed, ref} from 'vue';
import {ExploreScene} from '../../three/ExploreScene';
import Card from './Card.vue';
import data from "../../data/poiData";
import {animateAsync} from "../../utils";
import useScene from "../../composables/useScene";
import useBypassMode from '../../composables/useBypassMode';

const isOpen = ref(false)
const poiDesc = ref('Atmos')
const showBgText = ref(true)
const exploreNumber = ref(0)

const {scene: app, canvas} = useScene<ExploreScene>(new ExploreScene(poiDesc, showBgText))
const {isCameraMoving} = app
const currentPoi = ref(null)
app.onSelectPoi = index => {
  exploreNumber.value++
  currentPoi.value = index
}

const onClosePoi = () => {
  app.closePoi(currentPoi.value)
  currentPoi.value = null
}

const block = ref<HTMLElement>(null)

const leave = (close = true) => {
  // Enabled scroll
  if (close) {
    isOpen.value = false
  }
  document.body.classList.remove('overflow-hidden')
}

const processExplore = async () => {
  app.processExplore()
  isOpen.value = true

  // Scroll to
  const target = block.value.getBoundingClientRect().top + document.body.scrollTop
  await animateAsync({
    from: document.body.scrollTop,
    to: target,
    onUpdate(v) {
      document.body.scrollTop = v
    }
  })

  // Disable scroll
  document.body.classList.add('overflow-hidden')
}

const showOverlay = computed(() => isOpen.value && currentPoi.value === null && !isCameraMoving.value)

const {isBypass} = useBypassMode()
</script>
<template>
  <section ref="block" class="relative py-0 h-screen">
    <div class="explore-container snake transition-all duration-500"
         :class="isOpen ? '' : 'filter blur-sm pointer-events-none'">
      <transition name="fade">
        <p v-if="showBgText" :key="poiDesc"
           class="absolute-center font-title text-white -z-1 text-customWide text-pearl font-bold opacity-15 -mt-10 js-poiDesc">
          {{ poiDesc }}</p>
      </transition>
      <canvas id="scene" ref="canvas"/>
      <div class="explore-labels js-explore-labels"></div>

      <div>
        <Card v-for="(card, i) in data" :data="card" :visible="i === currentPoi" @close="onClosePoi"/>
      </div>

      <transition name="fade">
        <div v-show="showOverlay" class="absolute top-0 left-0 w-full px-10 py-8 flex justify-between items-start">
          <button class="hover:underline flex items-center" @click="leave">
            <i class="uil uil-angle-left text-xl mt-1"></i> Retour
          </button>
          <transition name="fade">
            <RouterLink v-show="isBypass || exploreNumber"
                        to="/experience"
                        class="btn"
                        @click="leave(false)"
            >Démarrer l'expérience
            </RouterLink>
          </transition>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="showOverlay"
             class="absolute text-jade/70 text-sm left-1/2 transform -translate-x-1/2 max-w-156 text-center bottom-0 w-full py-6 px-12">
          <div
              v-if="!exploreNumber" class="flex items-center justify-center">Cliquez sur les <i
              class="uil uil-plus text-white text-lg mx-1 mt-0.5"></i> pour décourir les secrets de la Serre !
          </div>
          <div v-else-if="exploreNumber >= 4">Quand vous avez terminé, continuez en cliquant sur "Démarrer
            l'expérience"
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <button
          v-if="!isOpen"
          class="absolute-center bg-bg border border-white text-2xl py-6 px-16 rounded-full cursor-pointer"
          @click="processExplore"
      >Découvrir la serre
      </button>
    </transition>
  </section>
</template>

<style>
.explore-container {
  @apply w-full h-full;
  position: relative; /* makes this the origin of its children */
  overflow: hidden;
}

.explore-labels {
  position: absolute; /* let us position ourself inside the container */
  left: 0; /* make our position the top left of the container */
  top: 0;
  color: white;
}

#scene {
  height: 100%;
  width: 100%;
}
</style>
