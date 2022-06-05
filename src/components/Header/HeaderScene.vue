<script setup lang="ts">
import {Header} from "../../three/Header";
import useScene from "../../composables/useScene";

const {canvas } = useScene(new Header())
</script>
<template>
  <canvas ref="canvas" class="h-full w-full bg-red-600"/>
</template>
