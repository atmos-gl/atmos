<script setup lang="ts">
import {toRefs} from 'vue';
import Helper from './Helper.vue';

const props = defineProps(['tip', 'icon', 'helperPosition'])
const {tip, icon, helperPosition} = toRefs(props)

</script>

<template>
  <Transition name="fade">
    <div class="h-1 w-1 absolute top-0 left-0"
         v-show="tip.show"
         :style="{
          transform: `translate(${tip.position.x}px, ${tip.position.y}px)`
        }">
      <div class="line"></div>
      <div class="tip flex flex-col items-start">
        <div class="absolute -top-8 -right-6 h-16">
          <div class="absolute-center w-16 h-16 rounded-full bg-imperial"></div>
          <img v-if="icon" :src="icon" alt="Icon" class="h-full relative">
        </div>
        <slot/>
      </div>
      <Helper v-if="helperPosition" class="absolute"
              :style="{
        left: helperPosition.x + 'px',
        top: helperPosition.y + 'px',
              }"
              :angle="helperPosition.z"/>
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
  backdrop-filter: blur(10px);
  transform-origin: left;
}

.line::after {
  transform: rotate(135deg);
}

.tip {
  @apply absolute -top-20 left-20 p-6 rounded-xl border border-white text-jade w-72 -xl:w-64 font-core;
  backdrop-filter: blur(3px);
  background-color: #ffffff33;
}
</style>
