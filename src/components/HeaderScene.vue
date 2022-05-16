<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Homepage} from "../three/Homepage";

const canvas = ref(null);
const app = new Homepage()

onMounted(() => {
  app.init(canvas.value)
  app.run()
})
</script>
<template>
  <canvas ref="canvas" class="h-full w-full"/>
</template>
