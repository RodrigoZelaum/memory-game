<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

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
  <div class="flex flex-col items-center gap-4 mt-10">
    <div v-if="auth.isAuthenticated">
      <p>Bem-vindo, {{ auth.user?.name }}</p>
      <button @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
    <div v-else>
      <button @click="handleLogin" class="bg-green-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
