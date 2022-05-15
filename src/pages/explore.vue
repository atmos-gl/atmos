<script setup lang="ts">
import ExplorePoi from '../components/ExplorePoi.vue';
import useLoader, {exploreLoader} from '../composables/useLoader';
import resources from '../three/resources/exploreResources';

const {loading, percentageProgress} = exploreLoader
exploreLoader.load()
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <ExplorePoi v-else/>
</template>
