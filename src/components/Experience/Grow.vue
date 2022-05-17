<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {GrowScene} from '../../three/GrowScene';
import useScene from '../../composables/useScene';

const { scene, canvas } = useScene(new GrowScene())

</script>
<template>
  <main>
    <canvas ref="canvas" class="scene absolute top-0 left-0 w-full h-full"></canvas>
  </main>
</template>

<style>
.scene {
  height: 100%;
  width: 100%;
}
</style>
