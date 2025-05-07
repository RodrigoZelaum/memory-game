<script setup lang="ts">
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    @click="toggleTheme"
    class="fixed top-4 right-4 bg-transparent border-none cursor-pointer z-50"
  >
    <FontAwesomeIcon
      :icon="theme === 'light' ? faMoon : faSun"
      class="text-2xl text-primary"
    />
  </button>
</template>

<style scoped>
</style>
