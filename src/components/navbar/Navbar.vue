<script setup lang="ts">
import ThemeToggle from '@/components/button/ThemeToggle.vue';
import LogoutButton from '@/components/button/LogoutButton.vue';
</script>

<template>
  <nav class="w-full bg-transparent backdrop-blur-md z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/" class="text-xl font-semibold dark:text-primary">
          Home
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

