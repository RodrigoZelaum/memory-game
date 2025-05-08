<script setup lang="ts">
import ThemeToggle from '@/components/toggleTheme/ThemeToggle.vue'
import LogoutButton from '@/components/logout/LogoutButton.vue'
</script>

<template>
  <nav class="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-end">
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
