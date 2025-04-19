<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
}>();
</script>

<template>
  <div class="flex justify-center items-center space-x-2 mt-6">
    <button
      @click="emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <span class="px-3 py-1">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      @click="emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>