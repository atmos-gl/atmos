<script setup>
import {ref} from "vue";

const isPopup = ref(true)

const copyCode = () => {
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText('URANIUM4LIFE').then(function() {
        /* le presse-papier est correctement paramétré */
      }, function() {
        /* l'écriture dans le presse-papier a échoué */
      });
    }
  });
}
</script>

<template>
  <Transition name="fade">
    <div class="absolute inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm" v-if="isPopup">
      <div class="bg-white rounded-3xl text-imperial flex flex-col items-center py-8 px-14 w-max popup-anim">
        <p class="font-bold text-4xl font-title mb-12">Réduction du moment</p>
        <div class="flex">
          <img src="../../assets/img/shop/popup.png" alt="Photos 3 produits" class="w-40">
          <p class="mx-14 text-8xl font-bold relative">
            <span class="text-pearl">-50%</span>
            <span class="absolute top-10 left-0 text-jade">-50%</span>
            <span class="absolute top-20 left-0">-50%</span>
          </p>

          <div class="mb-6 w-50">
            <p class="mt-8">sur la serre, pour 3 packs de produits achetés avec le code:</p>
            <p class="bg-pearl font-bold uppercase rounded-full py-2 px-6 text-xl mt-3 mb-2 text-center items-center flex gap-2"><span>uranium4life</span> <button @click="copyCode"><i class="uil uil-copy text-xl"></i></button></p>
            <p class="text-xs text-center">du 08/06/22 au 20/06/22</p>
          </div>
        </div>
        <button class="rounded-full bg-imperial text-white py-3 px-14 font-bold text-sm" @click="isPopup = false">Acceder à la boutique</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">

</style>