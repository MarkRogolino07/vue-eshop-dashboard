<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <router-link to="/" class="text-lg font-semibold text-gray-900 hover:text-blue-600">
          E-Shop
        </router-link>
      </div>
    </nav>
    <main class="container mx-auto px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>