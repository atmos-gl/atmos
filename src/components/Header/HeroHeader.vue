<script setup lang="ts">
import HeaderScene from './HeaderScene.vue';
import ScrollingText from './ScrollingText.vue';
import Header from "./Header.vue";
import bottlesImage from '../../assets/img/bottles-header.png'
</script>

<template>
  <div class="h-screen text-white font-core snake mb-32 flex flex-col relative overflow-hidden">
    <div
        class="absolute-y-center text-customBig font-title font-bold uppercase leading-none flex flex-col opacity-15 -z-1">
      <div class="w-full">
        <ScrollingText :duration="24" :start-offset="-25" :direction="1" />
        <ScrollingText :duration="14" :start-offset="-43" :direction="-1" />
        <ScrollingText :duration="18" :start-offset="-20" :direction="1" />
        <ScrollingText :duration="22" :start-offset="-48" :direction="-1" />
      </div>
    </div>
    <div class="absolute left-1/5 top-0 w-full h-full">
      <HeaderScene/>
      <img :src="bottlesImage" class="absolute left-1/2 transform -translate-x-1/2 bottom-1/6 h-1/4 pointer-events-none">
    </div>
    <div class="o-container flex items-center text-jade flex-1 pt-0 pb-0 gap-4">
      <div class="w-2/5 mb-12">
        <h2 class="font-title font-bold text-8xl">Atmos</h2>
        <h3 class="my-6 text-4xl">La serre qui réduit l'effet de serre</h3>
        <p>Atmos, votre serre connectée vous facilite le quotidien en adoptant une démarche écologgique et durable.
          Manger sain et varié devient une priorité.</p>
      </div>
    </div>
    <Header class="absolute top-0 left-0 w-full"/>
  </div>
</template>
<style lang="scss">
//.scrolling-text {
//  pointer-events: none;
//
//  &:nth-child(2) {
//    animation: title__second 14s infinite linear;
//    transform: translateX(-43%);
//  }
//
//  &:nth-child(3) {
//    animation: title__third 14s infinite linear;
//    transform: translateX(-20%);
//  }
//
//  &:nth-child(4) {
//    animation: title__fourth 22s infinite linear;
//    transform: translateX(-48%);
//  }
//
//  span {
//    @apply mr-28;
//  }
//}
//
//
//.scrolling-text-1 {
//  animation: title__first 5s linear both 3s;
//  background: #f00;
//  //transform: translateX(-25%);
//}
//
//@keyframes title__first {
//  from {
//    transform: translateX(0);
//  }
//  to {
//    transform: translateX(-25%);
//  }
//}
//
//@keyframes title__second {
//  from {
//    transform: translateX(-43%);
//  }
//  to {
//    transform: translateX(-18%);
//  }
//}
//
//@keyframes title__third {
//  from {
//    transform: translateX(-20%);
//  }
//  to {
//    transform: translateX(-45%);
//  }
//}
//
//@keyframes title__fourth {
//  from {
//    transform: translateX(-48%);
//  }
//  to {
//    transform: translateX(-23%);
//  }
//}
</style>
