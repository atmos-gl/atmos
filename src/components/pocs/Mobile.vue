<script setup lang="ts">
import useLoader from '../../composables/useLoader';
import resources from '../../three/pocs/ressourcesTomato';
import usePair from '../../composables/usePair';
import {useQRCode} from '@vueuse/integrations/useQRCode';
import TomatoScene from './TomatoScene.vue';
import {computed, ref, toRef} from 'vue';
import {useUrlSearchParams} from '@vueuse/core';

const {loading, percentageProgress} = useLoader(resources)
const params = useUrlSearchParams()

const {link, id, paired} = usePair()
link.pair(params.id as string)

const url = computed(() => {
  return window.location.href + '?id=' + id.value
})
const qrCode = useQRCode(url)

const tomatoParams = ref({
  long: 1,
  grow: 1,
  size: 1,
})
link.on('tomato:update', (params) => {
  tomatoParams.value = params
})
const tomatoUpdated = (params) => {
  console.log(params)
  link.emit('tomato:update', tomatoParams.value)
}
</script>

<template>
  <div  v-if="paired" class="h-full">
    <div v-if="loading">Loading: {{ percentageProgress }}</div>
    <TomatoScene v-model:tomato="tomatoParams" @update:tomato="tomatoUpdated" v-else />
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
</style>
