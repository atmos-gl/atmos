<script setup lang="ts">
import {computed, toRefs} from 'vue';

const props = defineProps(['tip', 'icon'])
const {tip, icon} = toRefs(props)

</script>

<template>
  <Transition name="fade">
    <div class="h-1 w-1 absolute top-0 left-0"
         v-show="tip.show"
         :style="{
          transform: `translate(${tip.position.x}px, ${tip.position.y}px)`
        }">
      <div class="line"></div>
      <div class="tip flex flex-col">
        <img v-if="icon" :src="icon" alt="Icon" class="h-12 mb-2">
        <slot/>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.line::before, .line::after {
  content: '';
  @apply
  absolute
  -top-7
  left-8
  h-px
  w-12
  bg-white
  ;
  transform-origin: left;
}

.line::after {
  transform: rotate(135deg);
}

.tip {
  @apply absolute -top-20 left-20 p-4 rounded-xl border border-white text-jade w-72 -xl:w-64 font-display;
  background-color: #ffffff33;
}
</style>
