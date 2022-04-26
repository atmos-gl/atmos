<script setup lang="ts">
import Scene from './components/Scene.vue';
import useLoader from './composables/useLoader';
import resources from './ressources';

const {loading, percentageProgress} = useLoader(resources)
</script>

<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <Scene v-else />
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
