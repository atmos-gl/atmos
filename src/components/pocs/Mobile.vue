<script setup lang="ts">
import useLoader from '../../composables/useLoader';
import resources from '../../three/pocs/ressourcesTomato';
import usePair from '../../composables/usePair';
import {useQRCode} from '@vueuse/integrations/useQRCode';
import TomatoScene from './TomatoScene.vue';
import {computed, toRef} from 'vue';

const {loading, percentageProgress} = useLoader(resources)

const {link, id} = usePair()
const url = computed(() => {
  return window.location.href + '?id=' + id.value
})
const qrCode = useQRCode(url)
</script>

<template>
  <div  v-if="link.paired">
    <div v-if="loading">Loading: {{ percentageProgress }}</div>
    <TomatoScene v-else />
  </div>
  <div v-else>
    <h1>Appairer avec: {{ url }}</h1>
    <img :src="qrCode" :alt="link.id">
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
* {
  box-sizing: border-box;
}
#app {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
