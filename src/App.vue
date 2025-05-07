<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { onMounted, ref } from 'vue'
import ThemeToggle from '@/components/toggleTheme/ThemeToggle.vue'

const auth = useAuthStore()


onMounted(() => {
  auth.loadUser()
})
</script>

<template>
  <ThemeToggle />
  <RouterView />
</template>

<style scoped>
</style>
