<script setup lang="ts">
import {TomatoScene} from '../../three/custom/TomatoScene';
import {TomatoParams} from '../../three/objects/Tomato';
import useScene from '../../composables/useScene';

const props = defineProps<{
  tomato: TomatoParams
}>()

const { tomato } = props

const { canvas} = useScene(new TomatoScene(tomato))
</script>
<template>Œ
  <canvas ref="canvas"></canvas>
</template>

<style>
#scene {
  height: 100%;
  width: 100%;
}
</style>
