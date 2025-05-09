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
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Navbar />
    <main class="flex-grow overflow-auto">
      <RouterView />
    </main>
  </div>
</template>


<style scoped>
</style>
