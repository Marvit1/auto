<template> 
  <div> 
    <NuxtRouteAnnouncer /> 
    <NuxtLayout> 
      <NuxtPage /> 
    </NuxtLayout> 
  </div> 
</template>

<style scoped>
.logo-section img,
[src*="dd.jfif"] {
  border-radius: 12px;
  object-fit: cover;
}
</style>

<!-- ✅ Սա ճիշտ ա Vue 3-ում -->
<style>
html, body {
  margin: 0;
  padding: 0;
  background: transparent;
}
</style>