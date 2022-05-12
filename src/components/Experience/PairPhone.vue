<script setup>
const emit = defineEmits(['pair'])
</script>
<template>
  <div class="text-white h-full flex flex-col items-center justify-center p-12">
    <h2 class="text-5xl font-title font-bold mb-8">Vous êtes en retard...</h2>
    <section class="max-w-172">
      <p class="text-center font-light leading-8">En retard pour le travail, vous quittez précipitemment votre domicile.
        Vous n'avez pas eu le temps de lancer l'étape de pousse, mais ce n'est pas grave car cela peut se faire à
        distance, grâce à l'application de gestion Atmos.</p>
      <div class="flex justify-center gap-4 mt-8">
        <button>J'ai mon téléphone !</button>
        <button>Je reviendrai plus tard, promis !</button>
      </div>
    </section>
  </div>
</template>
