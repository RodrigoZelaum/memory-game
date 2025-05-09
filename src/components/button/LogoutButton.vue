<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <button
    @click="handleLogout"   
  >
    <FontAwesomeIcon
      :icon="faRightFromBracket"
      class="text-2xl drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
      style="color: rgba(var(--main));"
    />
  </button>
</template>
