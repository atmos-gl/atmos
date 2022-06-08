<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="o-container flex items-end w-full py-8">
      <h1>
        <img src="../../assets/img/logo.png" class="h-16">
      </h1>
      <ul class="flex ml-auto">
        <li class="mr-4"><RouterLink to="/" class="underline-hover underline-reversed">Accueil</RouterLink></li>
        <li class="mr-4"><RouterLink to="/experience" class="underline-hover underline-reversed">Expérience</RouterLink></li>
        <li><RouterLink to="/shop" class="font-bold underline-hover underline-reversed">Boutique</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>
