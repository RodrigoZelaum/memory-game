<script setup lang="ts">
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    @click="toggleTheme"   
  >
    <FontAwesomeIcon
      :icon="theme === 'light' ? faMoon : faSun"
      class="text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
      style="color: rgba(var(--main));"
    />
  </button>
</template>

<style scoped>
</style>
