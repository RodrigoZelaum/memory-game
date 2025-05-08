<script setup lang="ts">
import BaseButton from '@/components/button/BaseButton.vue';
import icon from '@/assets/icons/google-logo.svg';
import { useRouter } from 'vue-router';
import { useDifficultyStore } from '@/stores/difficultyStore';
import { ref, watch } from 'vue';

const router = useRouter();
const difficultyStore = useDifficultyStore();
const difficulty = ref(difficultyStore.difficulty);

watch(difficulty, (newDifficulty) => {
  difficultyStore.setDifficulty(newDifficulty);
});

function startGame() {
  router.push('/game');
}

function showRanking() {
  router.push('/ranking');
}
</script>

<template>
  <div class="p-4 min-h-screen bg-surface transition-colors flex flex-col items-center justify-center">
    <div class="bg-surface shadow rounded-2xl p-8 w-full max-w-md text-center">
      <h1 class="text-3xl font-bold text-primary mb-6">Jogo de Memória</h1>

      <div class="mb-6">
        <h2 class="text-lg font-semibold text-primary mb-2">Selecione a Dificuldade:</h2>
        <div class="flex flex-col gap-3 items-start px-4">
          <label class="flex items-center gap-2 text-primary">
            <input
              type="radio"
              name="difficulty"
              value="normal"
              v-model="difficulty"
              class="accent-blue-500"
            />
            Normal
          </label>
          <label class="flex items-center gap-2 text-primary">
            <input
              type="radio"
              name="difficulty"
              value="hard"
              v-model="difficulty"
            />
            Difícil
          </label>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <BaseButton
          label="Iniciar Jogo"
          :icon="icon"
          :onClick="startGame"
          className="bg-blue-600 text-white hover:bg-blue-700"
        />
        <BaseButton
          label="Ranking"
          :icon="icon"
          :onClick="showRanking"
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
