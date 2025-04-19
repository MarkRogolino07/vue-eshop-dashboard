<script setup lang="ts">
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { Product } from '../types/product';

defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'edit', id: string): void;
  (e: 'delete', id: string): void;
}>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};
</script>

<template>
  <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold">{{ product.title }}</h3>
        <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {{ product.type }}
        </span>
      </div>
      <p class="mt-2 text-gray-600 text-sm">{{ product.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-lg font-bold">{{ formatPrice(product.price) }}</span>
        <div class="flex space-x-2">
          <button 
            @click="emit('edit', product.id)"
            class="p-1 text-gray-500 hover:text-blue-500 transition-colors flex items-center"
            aria-label="Edit product"
          >
            <PencilIcon class="h-5 w-5 mr-1" />
            <span class="text-sm">Edit</span>
          </button>
          <button 
            @click="emit('delete', product.id)"
            class="p-1 text-gray-500 hover:text-red-500 transition-colors flex items-center"
            aria-label="Delete product"
          >
            <TrashIcon class="h-5 w-5 mr-1" />
            <span class="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>