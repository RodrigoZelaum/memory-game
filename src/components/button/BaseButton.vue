<script setup lang="ts">
const props = defineProps<{
  label?: string
  icon?: string
  onClick: () => void
  variant?: 'default' | 'main'
}>()

const baseClasses = 'text-lg flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-shadow cursor-pointer'

const variantClasses = {
  default: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--accent)]',
  main: 'bg-[var(--main)] text-white hover:opacity-90'
} as const
</script>

<template>
  <button
    @click="props.onClick"
    :class="[baseClasses, variantClasses[props.variant ?? 'default']]"
  >
    <img
      v-if="props.icon"
      :src="props.icon"
      alt=""
      class="w-6 h-6"
    />
    <span v-if="props.label">{{ props.label }}</span>
  </button>
</template>