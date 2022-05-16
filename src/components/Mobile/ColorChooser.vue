<script setup lang="ts">
import {toRefs} from 'vue';

const props = defineProps(['modelValue'])
const {modelValue} = toRefs(props)
const emit = defineEmits(['update:modelValue'])

const select = (color) => {
  emit('update:modelValue', color)
}

const colors = {
  red: '#9A0000',
  yellow: '#D9B100',
  green: '#7EB533',
  black: '#262626',
}
</script>
<template>
  <div class="flex justify-between">
    <button v-for="(color, name) in colors"
            class="border block transform transition duration-200 rounded-full p-1"
            :class="name === modelValue ?
             'border-white' :
             'scale-80 border-transparent'"
            @click="select(name)"
    >
      <span class="w-8 h-8 block rounded-full" :style="{ backgroundColor: color }"></span>
    </button>
  </div>
</template>
