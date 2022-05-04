<script setup lang="ts">
import Room from '../components/Room.vue';
import useLoader from '../composables/useLoader';
import resources from '../three/resources/tryResources';

const {loading, percentageProgress} = useLoader(resources)
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <Room v-else/>
</template>
