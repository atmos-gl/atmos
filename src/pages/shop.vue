<script setup>
import Header from '../components/Header/Header.vue';
import sliderData from '../data/sliderData'
import {onMounted, ref} from "vue";

const activeRangeIndex = ref(0)
const activeCardIndex = ref(0)
// const customData = ref(sliderData[0])

const prev = () => {
  if (activeCardIndex.value > 0) activeCardIndex.value--
}

const next = () => {
  if (activeCardIndex.value < sliderData[activeRangeIndex.value].products.length - 1) activeCardIndex.value++
}

const getCustomClass = (index) => {
  let classes = ''

  switch (index) {
    case activeCardIndex.value:
      classes = 'right-1/4 opacity-100'
      break
    case activeCardIndex.value - 1:
      classes = 'right-1/2 opacity-50'
      break
    case activeCardIndex.value - 2:
      classes = 'right-3/4 opacity-25'
      break
    case activeCardIndex.value - 3:
      classes = 'right-full opacity-0'
      break
  }

  return classes
}

</script>
<template>
  <main class="h-screen flex flex-col overflow-hidden">
    <Header />
    <ul class="font-title flex text-xl font-bold justify-center pb-10">
      <li v-for="(range, index) in sliderData"
          @click="activeRangeIndex = index; activeCardIndex = 0"
          class="mx-4 opacity-50"
          :class="{'opacity-100': activeRangeIndex === index}">{{ range.title }}</li>
    </ul>

    <div class="flex-1 flex">
      <section class="flex items-center w-full h-full">
        <div class="w-3/5 h-3/5 flex relative overflow-hidden">
          <div v-for="(slide, index) in sliderData[activeRangeIndex].products" class="absolute top-0 h-full transition-all -right-full -z-1 opacity-0" :class="getCustomClass(index)">
            <img :src="slide.src" :alt="slide.alt" class="h-full">
          </div>
          <div class="absolute-x-center -bottom-0 flex">
            <p @click="prev">Prev</p>
            <span v-for="dot in sliderData[activeRangeIndex].products" class="h-5 w-5 bg-white"></span>
            <p @click="next">Next</p>
          </div>

        </div>

        <div class="w-2/5">
          <div class="border border-white rounded-3xl py-12 px-14 relative">
            <h2 class="font-title text-4xl font-bold mb-3">{{ sliderData[activeRangeIndex].products[activeCardIndex].card.title }}</h2>
            <p class="font-bold mb-8">{{ sliderData[activeRangeIndex].products[activeCardIndex].card.subtitle }}</p>
            <img class="absolute top-20 right-16" :src="sliderData[activeRangeIndex].products[activeCardIndex].card.localisation" alt="Localisation">
            <p class="mb-8" v-for="text in sliderData[activeRangeIndex].products[activeCardIndex].card.content">{{ text.text }}</p>
            <ul class="flex justify-between mx-auto w-3/4">
              <img v-for="label in sliderData[activeRangeIndex].products[activeCardIndex].card.labels" :src="label.src" alt="Label">
            </ul>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
