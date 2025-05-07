<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/button/BaseButton.vue'
import iconGoogle from '../assets/icons/google-logo.svg'

const auth = useAuthStore()
const router = useRouter()

function handleLogin() {
  const fakeUser = {
    name: 'Rodrigo Ribeiro',
    email: 'rodrigo@email.com'
  }
  auth.login(fakeUser)
  router.push('/')
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-[primary] px-4">
    <h1 class="text-2xl font-semibold mb-6 text-center">Jogo de Memória</h1>    
    <BaseButton
      v-if="!auth.isAuthenticated"
      label="Acessar com Google"
      :icon="iconGoogle"
      :onClick="handleLogin"
      className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
    />
    <div v-else class="flex flex-col items-center gap-4">
      <p class="text-lg">Olá, <span class="font-semibold">{{ auth.user?.name }}</span></p>
      <BaseButton
        label="Logout"
        :onClick="handleLogout"
        className="bg-red-500 text-white hover:bg-red-600"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
