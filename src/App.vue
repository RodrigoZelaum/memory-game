<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { onMounted } from 'vue'

const auth = useAuthStore()

onMounted(() => {
  auth.loadUser()
})
</script>

<template>
  <main class="flex-1 p-4">
      <RouterView />
  </main>
</template>

<style scoped>
</style>
