<script setup lang="ts">
import SetupTank from '../components/TryGreenhouse.vue';
import useLoader from '../composables/useLoader';
import resources from '../three/resources/tryResources';

const {loading, percentageProgress} = useLoader(resources)
</script>
<template>
  <div v-if="loading">Loading: {{ percentageProgress }}</div>
  <SetupTank v-else/>
</template>
