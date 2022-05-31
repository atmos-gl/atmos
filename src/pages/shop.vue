<script lang="ts">
import Header from '../components/Header/Header.vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Header
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>
<template>
  <main>
    <Header />
    <ul class="font-title flex text-xl font-bold justify-center">
      <li class="mx-4">Eau</li>
      <li class="mx-4 opacity-50">CO2</li>
      <li class="mx-4 opacity-50">Fertilisant</li>
      <li class="mx-4 opacity-50">Uranium</li>
      <li class="mx-4 opacity-50">Accessoire</li>
      <li class="mx-4 opacity-50">Coffrets</li>
    </ul>
    <section class="flex w-full my-10">
      <swiper
          :slides-per-view="3"
          :space-between="50"
          :autoHeight="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
      >
        <swiper-slide><img src="../assets/img/shop/co2/bouteille_amazonie.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/img/shop/co2/bouteille_ecolo.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/img/shop/co2/Bouteille_Hymalaya_Couleurs.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/img/shop/co2/Bouteille_Sahara_Couleurs.png" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/img/shop/co2/bouteille_yosemite.png" alt=""></swiper-slide>
      </swiper>
      <div class="border border-white rounded-lg py-4 px-6 w-2/5">
        <h2>Fertilisant d'Amazonie</h2>
        <p>France</p>
        <p>Ce coffret regroupe tous les ingrédients
          nécessaires pour faire pousser vos plantes
          européennes. Ce pack vient de matière 100%
          recyclés d'usine et de centrale. Contribuons
          ensemble à réduire l'effet de serre.</p>
        <p>Super pour faire pousser :
          Tomate, Avocat, Tomate, Avocat, Tomate, Avocat,
          Tomate, Avocat, Tomate, Avocat,...</p>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>
