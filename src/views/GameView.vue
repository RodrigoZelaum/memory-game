<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useDifficultyStore } from '@/stores/difficultyStore'
import { fetchImages as fetchImagesFromService } from '@/services/gameService' 
import GameCard from '@/components/card/GameCard.vue'
import BaseButton from '@/components/button/BaseButton.vue'

interface Card {
  id: number
  content: string
  isFlipped: boolean
  isMatched: boolean
  uniqueId: number
}

const difficultyStore = useDifficultyStore();
const cards = ref<Card[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const attempts = ref(0)
const timer = ref(0)
let timerInterval: number
const showSummaryModal = ref(false)
const apiStatusMessage = ref<string | null>(null)
const apiSubmitSuccess = ref(false)
const cardImages = ref<string[]>([])

const fetchImages = async () => {
  try {
    const res = await fetchImagesFromService();
    cardImages.value = res;
  } catch (error) {
    alert(error);
  }
}

const totalPairs = computed(() => {
  switch (difficultyStore.difficulty) {
    case 'normal':
      return 8
    case 'hard':
      return 18
  }
})

const generateCards = async () => {  
  await fetchImages()
  const selected = cardImages.value.slice(0, totalPairs.value)
  let uid = 0
  const pairs = selected.flatMap((c,i) => [
    { id:i, content:c, isFlipped:false, isMatched:false, uniqueId:uid++ },
    { id:i, content:c, isFlipped:false, isMatched:false, uniqueId:uid++ }
  ])
  cards.value = pairs.sort(() => Math.random()-0.5)
  loading.value = false
}

let flipped: number[] = []

const flipCard = (uid:number) => {
  const c = cards.value.find(c=>c.uniqueId===uid)!
  if (!c || c.isFlipped||c.isMatched||flipped.length===2) return
  c.isFlipped = true; flipped.push(uid)
  if (flipped.length===2) {
    attempts.value++
    checkMatch()
  }
}

const checkMatch = () => {
  const [u1,u2] = flipped
  const c1 = cards.value.find(c=>c.uniqueId===u1)!
  const c2 = cards.value.find(c=>c.uniqueId===u2)!
  if (c1.id===c2.id) {
    c1.isMatched=true; c2.isMatched=true; flipped=[]
    endIfDone()
  } else {
    setTimeout(()=>{
      c1.isFlipped=false; c2.isFlipped=false; flipped=[]
    },1000)
  }
}

const saveScore = () => {
  const score = {
    timestamp: Date.now(),
    difficulty: difficultyStore.difficulty,
    time: timer.value,
    attempts: attempts.value
  }

  const existingScores = localStorage.getItem('memory-game-scores')
  let scores: any[] = []

  if (existingScores) {
    try {
      scores = JSON.parse(existingScores)
    } catch {
      scores = []
    }
  }

  scores.push(score)
  scores.sort((a, b) => a.time - b.time || a.attempts - b.attempts)
  const topScores = scores.slice(0, 5)
  
  localStorage.setItem('memory-game-scores', JSON.stringify(topScores))
}

const endIfDone = async () => {
  if (cards.value.every(c=>c.isMatched)) {
    clearInterval(timerInterval)
    saveScore()
    showSummaryModal.value = true

    try {
      apiStatusMessage.value = 'Enviando resultados...'
      apiSubmitSuccess.value = false

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) {
            resolve(true)
          } else {
            reject(new Error('Falha na conexão'))
          }
        }, 1500)
      })
      
      apiSubmitSuccess.value = true
      apiStatusMessage.value = 'Resultados enviados com sucesso!'
    } catch (error) {
      apiSubmitSuccess.value = false
      apiStatusMessage.value = 'Falha ao enviar resultados. Tente novamente.'
      console.error('Erro ao enviar resultados:', error)
    }
  }
}

const startTimer = () => {
  timer.value = 0
  clearInterval(timerInterval)
  timerInterval = window.setInterval(() => timer.value++, 1000)
}

const formattedTime = computed(() => {
  const m = Math.floor(timer.value/60).toString().padStart(2,'0')
  const s = (timer.value%60).toString().padStart(2,'0')
  return `${m}:${s}`
})

const resetGame = () => {
  loading.value=true
  error.value=null
  attempts.value=0
  flipped=[]
  showSummaryModal.value=false
  apiStatusMessage.value=null
  apiSubmitSuccess.value=false
  generateCards() 
  startTimer()
}

const restartGame = resetGame
const closeSummaryAndRestart = () => {
  showSummaryModal.value=false; resetGame()
}

onMounted(() => resetGame())
</script>

<template>
  <div class="p-15 bg-surface transition-colors flex flex-col items-center justify-center min-h-screen">
    <h2 class="text-2xl font-semibold my-6 text-center">
      Jogo de Memória
    </h2>
    <div v-if="loading" class="flex items-center justify-center h-64">
      <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
    </div>
      <div
      v-else
      class="grid grid-cols-2  gap-4 w-full max-w-xl mx-auto"
      :class="totalPairs === 18 ? 'sm:grid-cols-6' : 'sm:grid-cols-4'"
    >
      <GameCard
        v-for="card in cards"
        :key="card.uniqueId"
        :content="card.content"
        :isFlipped="card.isFlipped || card.isMatched"
        :isMatched="card.isMatched"
        @flip="flipCard(card.uniqueId)"
      />
    </div>
    <div class="w-full flex flex-col items-center gap-4 py-4">
      <div class="flex gap-6 text-lg">
        <p>
          Tentativas: <span class="font-bold">{{ attempts }}</span>
        </p>
        <p>
          Tempo: <span class="font-bold">{{ formattedTime }}</span>
        </p>
      </div>    
      <BaseButton
        label="Reiniciar"
        :onClick="restartGame"         
        />
    </div>

    <div
      v-if="showSummaryModal"
      class="fixed inset-0 bg-[var(--surface)] bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg[var(--text)] border-default shadow-default p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h3 class="text-2xl font-bold mb-4 text-green-600">Parabéns!</h3>
        <p class="text mb-2">
          Você completou o Jogo da Memória!
        </p>
        <p class="text">
          Seu tempo: <span class="font-semibold">{{ formattedTime }}</span>
        </p>
        <p class="text mb-6">
          Tentativas: <span class="font-semibold">{{ attempts }}</span>
        </p>
        <div
          v-if="apiStatusMessage"
          class="mb-4 p-2 rounded"
          :class="{
            'bg-green-100 text-green-700': apiSubmitSuccess,
            'bg-red-100 text-red-700': !apiSubmitSuccess
          }"
        >
          {{ apiStatusMessage }}
        </div>
        <BaseButton
          label="Jogar Novamente"          
          :onClick="closeSummaryAndRestart" 
          variant="main"   
          class="mx-auto"      
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.preserve-3d { transform-style: preserve-3d; }
.card-face { backface-visibility: hidden; }
.backface-hidden { backface-visibility: hidden; }
</style>
