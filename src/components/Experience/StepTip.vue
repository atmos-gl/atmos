<script setup lang="ts">
import {computed, toRefs} from 'vue';
import Helper from './Helper.vue';
import {UiTip} from '../../three/three-composables/useUiTip';
import {Vector3} from 'three';

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
        <img v-if="icon" :src="icon" alt="Icon" class="h-12 mb-2">
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
  @apply absolute -top-20 left-20 p-4 rounded-xl border border-white text-jade w-80 -xl:w-64 font-core;
  backdrop-filter: blur(3px);
  background-color: #ffffff33;
}
</style>
