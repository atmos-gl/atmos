<script setup lang="ts">
import {ref} from 'vue';
import Tomato from './components/pocs/Tomato.vue';
import DragDrop from './components/pocs/DragDrop.vue';
import Mobile from './components/pocs/Mobile.vue';
import {useUrlSearchParams} from '@vueuse/core';

const params = useUrlSearchParams()

const currentPoc = ref(params.id ? 'mobile' : '')
</script>

<template>
  <RouterView></RouterView>
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
