<script setup lang="ts">
import {HeaderScene} from "../../three/HeaderScene";
import useScene from "../../composables/useScene";

const {canvas } = useScene(new HeaderScene())
</script>
<template>
  <canvas ref="canvas" class="h-full w-full"/>
</template>
