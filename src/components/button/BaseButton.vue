<script setup lang="ts">
defineProps<{
  label: string
  icon?: string 
  onClick: () => void
  className?: string
}>()
</script>

<template>
  <button
    @click="onClick"
    :class="[
      'flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition shadow',
      className
    ]"
  >
    <img v-if="icon" :src="icon" alt="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
  </button>
</template>
