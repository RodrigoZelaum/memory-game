import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDifficultyStore = defineStore('difficulty', () => {
  const difficulty = ref('normal');

  function setDifficulty(value: string) {
    difficulty.value = value;
  }

  return {
    difficulty,
    setDifficulty,
  };
});
