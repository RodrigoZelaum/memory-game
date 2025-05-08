<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import GameCard from '@/components/card/GameCard.vue'

interface Card {
  id: number
  content: string
  isFlipped: boolean
  isMatched: boolean
  uniqueId: number
}

const cards = ref<Card[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const attempts = ref(0)
const timer = ref(0)
let timerInterval: number
const showSummaryModal = ref(false)
const apiStatusMessage = ref<string | null>(null)
const apiSubmitSuccess = ref(false)

const MOCK_IMAGES = ['🍎','🍌','🍒','🍇','🍓','🥝','🍍','🍑']
const GRID_SIZE = 4

const generateCards = () => {
  const selected = MOCK_IMAGES.slice(0, GRID_SIZE*GRID_SIZE/2)
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

const endIfDone = async () => {
  if (cards.value.every(c=>c.isMatched)) {
    clearInterval(timerInterval)
    showSummaryModal.value = true
    try {
      apiStatusMessage.value = 'Enviando resultados...'
      await new Promise((res, rej)=>
        setTimeout(()=>Math.random()>0.2?res(null):rej(null),1500)
      )
      apiSubmitSuccess.value = true
      apiStatusMessage.value = 'Resultados enviados com sucesso!'
    } catch {
      apiSubmitSuccess.value = false
      apiStatusMessage.value = 'Falha ao enviar resultados. Tente novamente.'
    }
  }
}

const startTimer = () => {
  timer.value=0; clearInterval(timerInterval)
  timerInterval = setInterval(()=> timer.value++,1000)
}

const formattedTime = computed(() => {
  const m = Math.floor(timer.value/60).toString().padStart(2,'0')
  const s = (timer.value%60).toString().padStart(2,'0')
  return `${m}:${s}`
})

const resetGame = () => {
  loading.value=true; error.value=null; attempts.value=0
  flipped=[]; showSummaryModal.value=false
  apiStatusMessage.value=null; apiSubmitSuccess.value=false
  generateCards(); startTimer()
}

const restartGame = resetGame
const closeSummaryAndRestart = () => {
  showSummaryModal.value=false; resetGame()
}

onMounted(() => resetGame())
</script>

<template>
  <div class="game-board-container p-4 min-h-screen bg-surface dark:bg-surface-dark transition-colors">
    <h2 class="text-2xl font-semibold my-4 text-center text-text-primary dark:text-text-primary">
      Jogo de Mamória
    </h2>

    <div v-if="loading" class="flex items-center justify-center h-64">
      <svg class="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
    </div>
      <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl mx-auto"
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

    <div class="fixed bottom-4 left-0 w-full flex justify-center gap-6">
      <p class="text-text-primary dark:text-text-primary">
        Tentativas: <span class="font-bold">{{ attempts }}</span>
      </p>
      <p class="text-text-primary dark:text-text-primary">
        Tempo: <span class="font-bold">{{ formattedTime }}</span>
      </p>
      <button
        @click="restartGame"
        class="bg-yellow-500 hover:bg-yellow-700 active:scale-95 text-white px-4 py-2 rounded transition"
      >
        Reiniciar
      </button>
    </div>

    <!-- Summary Modal -->
    <div
      v-if="showSummaryModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white dark:bg-surface-dark p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h3 class="text-2xl font-bold mb-4 text-green-600">Parabéns!</h3>
        <p class="text-text-primary dark:text-text-primary mb-2">
          Você completou o Jogo da Memória!
        </p>
        <p class="text-text-primary dark:text-text-primary">
          Seu tempo: <span class="font-semibold">{{ formattedTime }}</span>
        </p>
        <p class="text-text-primary dark:text-text-primary mb-6">
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
        <button
          @click="closeSummaryAndRestart"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preserve-3d { transform-style: preserve-3d; }
.card-face { backface-visibility: hidden; }
.backface-hidden { backface-visibility: hidden; }
</style>
