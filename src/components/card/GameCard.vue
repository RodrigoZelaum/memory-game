<script setup lang="ts">
defineProps<{
  content: string
  isFlipped: boolean
  isMatched: boolean
}>()
</script>

<template>
    <div
      class="card relative aspect-square rounded-lg cursor-pointer transform transition-all duration-500 preserve-3d focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-105"
      :class="{ 'is-flipped': isFlipped, 'matched': isMatched }"
      tabindex="0"
      @click="$emit('flip')"
      @keyup.enter="$emit('flip')"
    >
      <div class="card-face card-front absolute inset-0 flex items-center justify-center text-white text-3xl bg-blue-500 rounded-lg">
        ?
      </div>
      <div class="card-face card-back absolute inset-0 flex items-center justify-center text-3xl bg-orange-400 rounded-lg backface-hidden">
        {{ content }}
      </div>
    </div>
</template>
  
<style scoped>
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }

.card-front { transform: rotateY(0deg); }
.card-back  { transform: rotateY(-180deg); }

.card.is-flipped .card-front { transform: rotateY(180deg); }
.card.is-flipped .card-back  { transform: rotateY(0deg); }
</style>
  