<script setup lang="ts">
import SetupTank from '../components/TryGreenhouse.vue';
import useLoader from '../composables/useLoader';
import resources from '../three/resources/tryResources';
import sequenceManager from '../managers/sequenceManager';

const {loading, percentageProgress} = useLoader(resources)
sequenceManager.send('next')
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <SetupTank class="canvas" v-else/>
</template>
<style scoped>
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
