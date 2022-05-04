<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {Room} from '../three/Room';

const canvas = ref(null);
const app = new Room()
onMounted(() => {
  app.init(canvas.value)
  app.run()
})
</script>
<template>
  <div id="container">
    <canvas id="scene" ref="canvas"></canvas>
    <div id="labels">
      <p class="js-overlay bg-imperial px-2 py-1 rounded-full text-3xl">+</p>
    </div>
  </div>
</template>

<style>
#container {
  position: relative;  /* makes this the origin of its children */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#labels {
  position: absolute;  /* let us position ourself inside the container */
  left: 0;             /* make our position the top left of the container */
  top: 0;
  color: white;
}
#scene {
  height: 100%;
  width: 100%;
  @apply block;
}
#labels>div {
  position: absolute;  /* let us position them inside the container */
  left: 0;             /* make their default position the top left of the container */
  top: 0;
  cursor: pointer;     /* change the cursor to a hand when over us */
  font-size: large;
  user-select: none;   /* don't let the text get selected */
  text-shadow:         /* create a black outline */
      -1px -1px 0 #000,
      0   -1px 0 #000,
      1px -1px 0 #000,
      1px  0   0 #000,
      1px  1px 0 #000,
      0    1px 0 #000,
      -1px  1px 0 #000,
      -1px  0   0 #000;
}
#labels>div:hover {
  color: red;
}
</style>
