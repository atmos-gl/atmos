<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Header} from "../../three/Header";
import useScene from "../../composables/useScene";

const {canvas } = useScene(new Header())
</script>
<template>
  <canvas ref="canvas" class="h-full w-full"/>
</template>
