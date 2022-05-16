<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Header} from "../three/Header";

const canvas = ref(null);
const app = new Header()

onMounted(() => {
  app.init(canvas.value)
  app.run()
})
</script>
<template>
  <canvas ref="canvas" class="h-full w-full"/>
</template>
