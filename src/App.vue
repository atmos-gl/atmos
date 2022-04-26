<script setup lang="ts">
import {ref} from 'vue';
import Tomato from './components/pocs/Tomato.vue';
import DragDrop from './components/pocs/DragDrop.vue';

const currentPoc = ref('')
</script>

<template>
  <div class="flex flex-col p-8 items-center gap-2" v-if="currentPoc === ''">
    <h1 class="text-2xl font-bold mb-4">Pocs Atmos</h1>
    <button class="bg-blue-200 py-2 px-4 rounded"
            @click="currentPoc = 'tomato'">Parametric tomato
    </button>
    <button class="bg-blue-200 py-2 px-4 rounded"
            @click="currentPoc = 'mobile'">WebGL on mobile
    </button>
    <button class="bg-blue-200 py-2 px-4 rounded"
            @click="currentPoc = 'dragdrop'">Drag n drop
    </button>
  </div>
  <Tomato  v-if="currentPoc === 'tomato'" />
  <DragDrop  v-if="currentPoc === 'dragdrop'" />
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
* {
  box-sizing: border-box;
}
</style>
