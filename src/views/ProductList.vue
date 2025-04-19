<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProducts, deleteProduct } from '../services/api';
import ProductCard from '../components/ProductCard.vue';
import Pagination from '../components/Pagination.vue';
import { Product } from '../types/product';

const router = useRouter();
const products = ref<Product[]>([]);
const total = ref(0);
const currentPage = ref(1);
const limit = ref(6);
const totalPages = ref(1);
const sortBy = ref<string | undefined>();
const sortOrder = ref<'asc' | 'desc'>('asc');
const filterType = ref<string | undefined>();

const fetchProducts = async () => {
  const response = await getProducts(
    currentPage.value,
    limit.value,
    sortBy.value,
    sortOrder.value,
    filterType.value
  );
  products.value = response.data;
  total.value = response.total;
  totalPages.value = response.totalPages;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchProducts();
};

const handleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  fetchProducts();
};

const handleFilter = (type?: string) => {
  filterType.value = type;
  currentPage.value = 1;
  fetchProducts();
};

const handleEdit = (id: string) => {
  router.push(`/edit/${id}`);
};

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this product?')) {
    await deleteProduct(id);
    fetchProducts();
  }
};

const handleAdd = () => {
  router.push('/add');
};

onMounted(fetchProducts);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Product List</h1>
      <button
        @click="handleAdd"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Add Product
      </button>
    </div>

    <div class="mb-6 flex flex-wrap gap-4">
      <div>
        <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
        <div class="flex space-x-2">
          <button
            @click="handleSort('title')"
            class="px-3 py-1 text-sm rounded border"
            :class="{
              'bg-blue-100 border-blue-300': sortBy === 'title',
              'bg-white border-gray-300': sortBy !== 'title'
            }"
          >
            Title {{ sortBy === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
          </button>
          <button
            @click="handleSort('price')"
            class="px-3 py-1 text-sm rounded border"
            :class="{
              'bg-blue-100 border-blue-300': sortBy === 'price',
              'bg-white border-gray-300': sortBy !== 'price'
            }"
          >
            Price {{ sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
          </button>
        </div>
      </div>

      <div>
        <label for="filter" class="block text-sm font-medium text-gray-700 mb-1">Filter by type</label>
        <div class="flex space-x-2">
          <button
            @click="handleFilter()"
            class="px-3 py-1 text-sm rounded border"
            :class="{
              'bg-blue-100 border-blue-300': !filterType,
              'bg-white border-gray-300': filterType
            }"
          >
            All
          </button>
          <button
            @click="handleFilter('Electronics')"
            class="px-3 py-1 text-sm rounded border"
            :class="{
              'bg-blue-100 border-blue-300': filterType === 'Electronics',
              'bg-white border-gray-300': filterType !== 'Electronics'
            }"
          >
            Electronics
          </button>
          <button
            @click="handleFilter('Home')"
            class="px-3 py-1 text-sm rounded border"
            :class="{
              'bg-blue-100 border-blue-300': filterType === 'Home',
              'bg-white border-gray-300': filterType !== 'Home'
            }"
          >
            Home
          </button>
        </div>
      </div>
    </div>

    <div v-if="products.length === 0" class="text-center py-8">
      <p class="text-gray-500">No products found</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>