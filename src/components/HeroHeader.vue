<script setup lang="ts">
import Header from './Header/Header.vue';
import HeaderScene from './Header/HeaderScene.vue';
import ScrollingText from './Header/ScrollingText.vue';
import {exploreLoader} from '../composables/useLoader';
import {onBeforeUnmount, ref} from 'vue';

const scrollingLines = 4

// Preload further resources
let alreadyLoaded = ref(exploreLoader.ready.value)
const headerEl = ref(null)
const onScroll = () => {
  if (!alreadyLoaded.value) {
    const rect = headerEl.value.getBoundingClientRect()
    if (rect.top + rect.height < 0) {
      exploreLoader.load()
      alreadyLoaded.value = true
    }
  }
}
document.body.addEventListener('scroll', onScroll)
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div ref="headerEl" class="h-screen text-white font-core snake mb-32 flex flex-col">
    <Header/>

  <div class="o-container flex text-jade flex-1 pt-20 pb-32">
    <div class="absolute-y-center text-customBig font-title font-bold uppercase leading-none flex flex-col opacity-15 -z-1">
      <ScrollingText v-for="line in scrollingLines"/>
    </div>

    <div class="w-2/5 pt-20">
      <h2 class="font-title font-bold text-8xl">Atmos</h2>
      <h3 class="my-6 text-4xl">La serre qui réduit l'effet de serre</h3>
      <p>Atmos, votre serre connectée vous facilite le quotidien en adoptant une démarche écologgique et durable. Manger sain et varié devient une priorité.</p>
    </div>
    <div class="w-3/5">
      <HeaderScene/>
    </div>
  </div>
  </div>
</template>
