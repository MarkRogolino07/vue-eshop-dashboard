<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProduct, updateProduct } from '../services/api';
import ProductForm from '../components/ProductForm.vue';

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const product = ref<any>(null);

const handleSubmit = async (updatedProduct: any) => {
  await updateProduct(props.id, updatedProduct);
  router.push('/');
};

onMounted(async () => {
  product.value = await getProduct(props.id);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Edit Product</h1>
    <ProductForm v-if="product" :initial-data="product" @submit="handleSubmit" />
    <p v-else class="text-center py-8 text-gray-500">Loading product...</p>
  </div>
</template>