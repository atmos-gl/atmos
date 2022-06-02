<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {ExplorePoi} from '../../three/ExplorePoi';
import Card from './Card.vue';
import data from "../../data/poiData";
import {animate} from "popmotion";
import {animateAsync} from "../../utils";
import useScene from "../../composables/useScene";
import {powerBlockLoader} from '../../composables/useLoader';

const isOpen = ref(false)
const poiDesc = ref('Atmos')
const showBgText = ref(true)

const {scene: app, canvas} = useScene<ExplorePoi>(new ExplorePoi(poiDesc, showBgText))

const currentPoi = ref(null)
app.onSelectPoi = index => {
  currentPoi.value = index
}

const onClosePoi = () => {
  app.closePoi(currentPoi.value)
  currentPoi.value = null
}

const block = ref<HTMLElement>(null)

const processDiscover = () => {
  // Enabled scroll
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
        <RouterLink v-if="isOpen"
                    to="/experience"
                    class="absolute right-16 bottom-12 bg-bg border border-white text-lg py-4 px-14 rounded-full cursor-pointer"
                    @click="processDiscover"
        >Démarrer l'expérience
        </RouterLink>
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
