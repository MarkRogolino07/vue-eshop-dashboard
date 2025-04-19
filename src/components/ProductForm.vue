<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { ProductForm } from '../types/product';

const props = defineProps<{
  initialData?: ProductForm;
}>();

const emit = defineEmits<{
  (e: 'submit', product: ProductForm): void;
}>();

const product = ref<ProductForm>(props.initialData || {
  title: '',
  type: '',
  description: '',
  price: 0
});

const productTypes = ['Electronics', 'Home', 'Clothing', 'Books', 'Other'];

const handleSubmit = () => {
  emit('submit', product.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md mx-auto">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input
        v-model="product.title"
        type="text"
        id="title"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
      <select
        v-model="product.type"
        id="type"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="" disabled>Select a type</option>
        <option v-for="type in productTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="product.description"
        id="description"
        rows="3"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
      <input
        v-model.number="product.price"
        type="number"
        id="price"
        min="0"
        step="0.01"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </form>
</template>