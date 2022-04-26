<script setup lang="ts">
import useLoader from '../../composables/useLoader';
import ressourcesDragDrop from '../../three/pocs/ressourcesDragDrop';
import DragDropScene from './DragDropScene.vue';

const {loading, percentageProgress} = useLoader(ressourcesDragDrop)
</script>

<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <DragDropScene v-else />
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
