<script setup lang="ts">
import ThemeToggle from '@/components/button/ThemeToggle.vue';
import LogoutButton from '@/components/button/LogoutButton.vue';
import logoMemory from '@/assets/images/logo-memory.png'
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/" class="text-xl font-semibold dark:text-primary">
          <img :src="logoMemory" alt="" class="w-18 h-14 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
        </RouterLink>
        <ul class="flex space-x-4">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


