<script setup>
import Header from '../components/Header/Header.vue';
import sliderData from '../data/sliderData'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css';
import {onMounted, ref} from "vue";

const activeRangeIndex = ref(0)
// const activeCardIndex = ref(0)
// const customData = ref(sliderData[0])

onMounted(() => {
  new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
  }).mount()
})

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
      <section class="flex w-full h-full">
        <div class="w-3/5 h-full">
          <div class="glide h-full">
            <div class="glide__track h-3/4" data-glide-el="track">
              <ul class="glide__slides h-full">
                <li class="glide__slide w-full" v-for="product in sliderData[activeRangeIndex].products">
                  <img class="h-full w-full" :src="product.src" :alt="product.alt">
                </li>
              </ul>
            </div>

            <!--          <div class="glide__bullets flex" data-glide-el="controls[nav]">-->
            <!--            <button class="glide__bullet" data-glide-dir="=0" v-for="(product, index) in sliderData[activeRangeIndex].products"></button>-->
            <!--          </div>-->
            <div class="glide__bullets" data-glide-el="controls[nav]">
              <button class="glide__bullet" data-glide-dir="=0"></button>
              <button class="glide__bullet" data-glide-dir="=1"></button>
              <button class="glide__bullet" data-glide-dir="=2"></button>
            </div>
          </div>
        </div>


<!--        <div class="w-2/5">-->
<!--          <div v-for="(product, index) in sliderData[activeRangeIndex].products">-->
<!--            <div class="border border-white rounded-lg py-4 px-6" v-if="index === activeCardIndex">-->
<!--              <h2>{{ product.card.title }}</h2>-->
<!--              <p>{{ product.card.subtitle }}</p>-->
<!--              <img :src="product.card.localisation" alt="Localisation">-->
<!--              <p v-for="text in product.card.content">{{ text.text }}</p>-->
<!--              <img v-for="label in product.card.labels" :src="label.src" alt="Label">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <div class="w-2/5">
          <div class="border border-white rounded-3xl py-12 px-14 relative">
            <h2 class="font-title text-4xl font-bold mb-3">{{ sliderData[0].products[0].card.title }}</h2>
            <p class="font-bold mb-8">{{ sliderData[0].products[0].card.subtitle }}</p>
            <img class="absolute top-20 right-16" :src="sliderData[0].products[0].card.localisation" alt="Localisation">
            <p class="mb-8" v-for="text in sliderData[0].products[0].card.content">{{ text.text }}</p>
            <ul class="flex justify-between mx-auto w-3/4">
              <img v-for="label in sliderData[0].products[0].card.labels" :src="label.src" alt="Label">
            </ul>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>
