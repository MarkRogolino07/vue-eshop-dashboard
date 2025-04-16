<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">E-Shop Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <EShopDashboard />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import EShopDashboard from "./components/EShopDashboard.vue";
</script>
