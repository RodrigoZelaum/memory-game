<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { onMounted } from 'vue'
import Navbar from './components/navbar/Navbar.vue'

const auth = useAuthStore()


onMounted(() => {
  auth.loadUser()
})
</script>

<template>
  <header>
    <Navbar />
  </header>
  <body>    
    <RouterView />
  </body>
</template>

<style scoped>
</style>
