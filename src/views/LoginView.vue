<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { GoogleLogin, decodeCredential } from 'vue3-google-login'
import logoMemory from '@/assets/images/logo-memory.png'

const auth = useAuthStore()
const router = useRouter()

interface DecodedCredential {
  name: string;
  email: string;
  picture: string;
}

function onGoogleResponse(response: { credential: string }) {
  const userData = decodeCredential(response.credential) as DecodedCredential
  auth.login({
    name: userData.name,
    email: userData.email,
    picture: userData.picture
  })
  router.push('/')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-surface dark:bg-surface-dark transition-colors px-6">
    <div class="relative bg-gradient-to-br from-primary/80 to-secondary/80 dark:from-secondary/90 dark:to-primary/90 border border-border rounded-3xl 
                shadow-xl p-10 w-full max-w-md text-center">
      <div class="mb-6">
        <img :src="logoMemory" alt="Memory Game Logo" class="mx-auto w-25 h-23"/>
      </div>
      <h1 class="text-3xl font-extrabold mb-4 text-primary dark:text-primary">Jogo de Memória</h1>
      <GoogleLogin
        v-if="!auth.user"
        :callback="onGoogleResponse"
        class="w-full mb-6 transform hover:scale-105 transition"
      />
      <p v-else class="mt-4 text-primary dark:text-primary text-xl">
        Olá, {{ auth.user.name }}!
      </p>
    </div>
  </div>
</template>
