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
  <SetupTank v-else/>
</template>
