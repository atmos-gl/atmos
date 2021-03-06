<script setup lang="ts">
import sliderData from '../../data/sliderData'
import {ref, watch} from "vue";

const activeRangeIndex = ref(0)
const activeCardIndex = ref(Math.floor(sliderData[activeRangeIndex.value].products.length / 2))
const transitionName = ref('card-fade')
const sliderTransitionName = ref('slider-fade')

watch(activeRangeIndex, (oldVal, newVal) => {
  sliderTransitionName.value = oldVal < newVal ? 'slider-fade-reverse' : 'slider-fade'
  activeCardIndex.value = Math.floor(sliderData[activeRangeIndex.value].products.length / 2)
})

watch(activeCardIndex, (oldVal, newVal) => {
  transitionName.value = oldVal < newVal ? 'card-fade-reverse' : 'card-fade'
})

const prev = () => {
  if (activeCardIndex.value > 0) {
    activeCardIndex.value--
  } else {
    activeCardIndex.value= sliderData[activeRangeIndex.value].products.length - 1
  }
}

const next = () => {
  activeCardIndex.value = (activeCardIndex.value + 1) % sliderData[activeRangeIndex.value].products.length
}

const getCustomClass = (index) => {
  let classes = ''

  switch (index) {
    case activeCardIndex.value:
      classes = 'right-1/5 opacity-100'
      break
    case activeCardIndex.value - 1:
      classes = 'right-1/2 opacity-50 scale-75'
      break
    case activeCardIndex.value - 2:
      classes = 'right-3/4 opacity-25 scale-50'
      break
    default:
      if (activeCardIndex.value > index) {
        classes = 'right-full opacity-0 scale-25'
      } else {
        classes = '-right-full opacity-0 scale-200'
      }
  }

  return classes
}
</script>

<template>
  <ul class="font-title flex text-xl font-bold justify-center pb-10">
    <li v-for="(range, index) in sliderData"
        @click="activeRangeIndex = index;"
        class="mx-4"
        :class="activeRangeIndex === index ? 'opacity-100' : 'opacity-50 cursor-pointer'">{{ range.title }}</li>
  </ul>

  <div class="flex-1 flex">
    <Transition :name="sliderTransitionName" mode="out-in">
      <section class="flex items-center w-full h-full" :key="activeRangeIndex">
        <div class="w-3/5">
          <div class="relative overflow-hidden flex h-140">
            <div v-for="(slide, index) in sliderData[activeRangeIndex].products"
                 class="absolute top-0 h-full transition-all duration-500 transform flex items-center custom-shadow w-55"
                 :class="getCustomClass(index)">
              <img :src="slide.src" :alt="slide.alt" class="h-4/5 object-contain mx-auto">
            </div>
          </div>

          <div v-show="sliderData[activeRangeIndex].products.length > 1" class="flex items-center justify-end transform -translate-x-19/100">
            <button @click="prev" class="mr-4 cursor-pointer text-4xl mt-1" title="Précédent"><i class="uil uil-angle-left"></i></button>
            <span v-for="(dot, index) in sliderData[activeRangeIndex].products"
                  class="h-4 w-4 rounded-full mr-2"
                  :class="index === activeCardIndex ? 'border-2 border-white' : 'bg-white cursor-pointer'"
                  @click="activeCardIndex = index"></span>
            <button @click="next" class="cursor-pointer ml-2 text-4xl mt-1" title="Suivant"><i class="uil uil-angle-right"></i></button>
          </div>
        </div>

        <div class="w-2/5">
          <div class="border border-r-0 border-white rounded-l-3xl py-12 px-14 relative">
            <Transition :name="transitionName" mode="out-in">
              <div :key="activeCardIndex">
                <h2 class="font-title text-4xl font-bold mb-4">{{ sliderData[activeRangeIndex].products[activeCardIndex].card.title }}</h2>
                <div class="flex justify-between h-14">
                  <p class="font-bold">{{ sliderData[activeRangeIndex].products[activeCardIndex].card.subtitle }}</p>
                  <img class="w-14 h-14 mt-4" :src="sliderData[activeRangeIndex].products[activeCardIndex].card.localisation" alt="Localisation">
                </div>
                <div class="w-4/5">
                  <p class="mb-8" v-for="text in sliderData[activeRangeIndex].products[activeCardIndex].card.content">{{ text.text }}</p>
                </div>
                <ul class="flex mb-8">
                  <img v-for="label in sliderData[activeRangeIndex].products[activeCardIndex].card.labels"
                       :src="label.src"
                       alt="Label"
                       class="h-18 mr-8">
                </ul>
                <p class="underline">{{ sliderData[activeRangeIndex].products[activeCardIndex].card.delivery }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.card-fade-leave-active,
.card-fade-reverse-leave-active

{
  transition: all 0.25s cubic-bezier(0.47, 0, 0.75, 0.72);
}

.card-fade-enter-active,
.card-fade-reverse-enter-active
{
  transition: all 0.25s cubic-bezier(0.39, 0.58, 0.57, 1);
}

.slider-fade-leave-active,
.slider-fade-reverse-leave-active

{
  transition: all 0.15s ease-in;
}

.slider-fade-enter-active,
.slider-fade-reverse-enter-active
{
  transition: all 0.15s ease-out;
}

.card-fade-enter-from,
.card-fade-leave-to,
.card-fade-reverse-enter-from,
.card-fade-reverse-leave-to,
.slider-fade-enter-from,
.slider-fade-leave-to,
.slider-fade-reverse-enter-from,
.slider-fade-reverse-leave-to {
  opacity: 0;
}
.card-fade-enter-from, .card-fade-reverse-leave-to {
  transform: translateY(20px);
}
.card-fade-leave-to, .card-fade-reverse-enter-from {
  transform: translateY(-20px);
}

.slider-fade-enter-from, .slider-fade-reverse-leave-to {
  transform: translateX(20px);
}
.slider-fade-leave-to, .slider-fade-reverse-enter-from {
  transform: translateX(-20px);
}

.fade-leave-to, .fade-enter-from {
  .popup-anim {
    @apply transform scale-75 transition duration-400;
  }
}

.custom-shadow::after {
  content: '';
  @apply absolute left-1/2 transform -translate-x-1/2 bottom-0;
  width: 196px;
  height: 57px;
  background: transparent radial-gradient(closest-side at 50% 50%, #0000006B 0%, #00000000 100%) 0% 0% no-repeat padding-box;
  opacity: 0.6;
}
</style>