<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDifficultyStore } from '@/stores/difficultyStore'
import BaseButton from '@/components/button/BaseButton.vue'

type Score = {
  timestamp: number
  difficulty: string
  time: number
  attempts: number
}

const difficultyStore = useDifficultyStore()
const scores = ref<Score[]>([])

const loadScores = () => {
  const raw = localStorage.getItem('memory-game-scores')
  if (!raw) return
  
  try {
    scores.value = (JSON.parse(raw) as Score[])
      .sort((a, b) => a.time - b.time || a.attempts - b.attempts)
      .slice(0, 5)
  } catch {
    scores.value = []
  }
}

const goHome = () => window.history.back()

onMounted(loadScores)

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}
</script>

<template>
  <div class="p-15 bg-surface min-h-screen flex flex-col items-center">
    <div class="w-full max-w-md space-y-4 sm:space-y-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-center">Ranking - Top 5</h1>
      
      <div class="border border-[var(--border)] rounded-lg overflow-hidden shadow-sm sm:shadow-md">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[300px]">
            <thead class="bg-[var(--accent)]">
              <tr>
                <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base">#</th>
                <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base">Dificuldade</th>
                <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base">Tempo</th>
                <th class="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base">Tentativas</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(score, index) in scores" 
                :key="score.timestamp"
                class="border-t border-[var(--border)] transition-colors hover:bg-[var(--accent)]"
              >
                <td class="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base">{{ index + 1 }}º</td>
                <td class="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base capitalize">{{ score.difficulty }}</td>
                <td class="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base">{{ formatTime(score.time) }}</td>
                <td class="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base">{{ score.attempts }}</td>
              </tr>
              <tr v-if="!scores.length">
                <td colspan="4" class="px-4 py-4 text-center text-gray-500 text-sm sm:text-base">
                  Nenhum recorde registrado ainda
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <BaseButton 
        label="Voltar" 
        :onClick="goHome" 
        variant="default"
        class="w-full"
      />
    </div>
  </div>
</template>

<style scoped>
th {
  font-weight: 500;
}
</style>