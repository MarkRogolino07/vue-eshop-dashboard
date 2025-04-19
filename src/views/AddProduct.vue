<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createProduct } from '../services/api';
import ProductForm from '../components/ProductForm.vue';

const router = useRouter();

const handleSubmit = async (product: any) => {
  await createProduct(product);
  router.push('/');
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Add New Product</h1>
    <ProductForm @submit="handleSubmit" />
  </div>
</template>