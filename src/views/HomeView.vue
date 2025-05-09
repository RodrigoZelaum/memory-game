<script setup lang="ts">
import BaseButton from '@/components/button/BaseButton.vue';
import trophy from '@/assets/images/trophy.png';
import control from '@/assets/images/control.png';
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
  <div class="p-4 bg-surface transition-colors flex flex-col items-center justify-center min-h-screen">
    <div class="bg-surface rounded-2xl p-8 w-full max-w-md text-center border-default shadow-default">
      <h1 class="text-3xl font-bold mb-6">Jogo de Memória</h1>

      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Selecione a Dificuldade:</h2>
        <div class="flex flex-col gap-3 items-start px-4">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="difficulty"
              value="normal"
              v-model="difficulty"
              class="accent-[var(--main)]"
            />
            Normal
          </label>
          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="difficulty"
              value="hard"
              v-model="difficulty"
              class="accent-[var(--main)]"
            />
            Difícil
          </label>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <BaseButton
          label="Iniciar Jogo"
          :icon="control"
          :onClick="startGame" 
          variant="main"         
        />
        <BaseButton
          label="Ranking"
          :icon="trophy"
          :onClick="showRanking"          
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
