<template>
  <div class="flex flex-col h-full p-10 items-center">
    <h1>Goûtez le futur</h1>
    <p>Grâce aux nombreuses informations dont dispose la centrale de votre serre, ainsi que des rayonnements produits par son réacteur nucléaire, vous pouvez personnaliser finement vos productions.</p>
    <button @click="$emit('next')">Je choisis la tomate</button>
  </div>
</template>
