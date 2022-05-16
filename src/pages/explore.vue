<script setup lang="ts">
import ExplorePoi from '../components/ExplorePoi.vue';
import {exploreLoader} from '../composables/useLoader';

const {loading, percentageProgress} = exploreLoader
exploreLoader.load()
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <ExplorePoi v-else/>
</template>
