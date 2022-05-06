<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {ExplorePoi} from '../three/ExplorePoi';
import Card from '../components/Explore/Card.vue';
import data from "../data/poiData";

const canvas = ref(null);
const app = new ExplorePoi()

const currentPoi = ref(null)
app.onSelectPoi = index => {
  currentPoi.value = index
}

const onClosePoi = () => {
  app.closePoi(currentPoi.value)
  currentPoi.value = null
}

onMounted(() => {
  app.init(canvas.value)
  app.run()
})
</script>
<template>
  <div class="explore-container">
    <canvas id="scene" ref="canvas"/>
    <div class="explore-labels js-explore-labels"></div>

    <div>
      <Card v-for="(card, i) in data" :data="card" :visible="i === currentPoi" @close="onClosePoi" />
    </div>
  </div>
</template>

<style>
.explore-container {
  position: relative;  /* makes this the origin of its children */
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.explore-labels {
  position: absolute;  /* let us position ourself inside the container */
  left: 0;             /* make our position the top left of the container */
  top: 0;
  color: white;
}
#scene {
  height: 100%;
  width: 100%;
}
</style>
