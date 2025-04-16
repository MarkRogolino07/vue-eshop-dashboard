<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Filters Section -->
    <div class="flex gap-4 mb-6">
      <input
        type="text"
        v-model="filterQuery"
        placeholder="Search products..."
        class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <select
        v-model="filterCategory"
        class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Sorting Controls -->
    <div class="flex gap-2 mb-6 flex-wrap">
      <button
        v-for="field in sortableFields"
        :key="field"
        @click="setSortField(field)"
        :class="[
          'px-4 py-2 border rounded-md transition-colors',
          sortField === field
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
        ]"
      >
        {{ field }}
        {{ sortField === field ? (sortDirection === "asc" ? "↑" : "↓") : "" }}
      </button>
      <button
        @click="toggleSortDirection"
        class="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
      >
        Toggle ({{ sortDirection?.toUpperCase() || "ASC" }})
      </button>
    </div>

    <!-- Products Table -->
    <div v-if="paginatedProducts.length > 0" class="overflow-x-auto mb-6">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ product.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.category }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ product.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${{ product.price.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center py-12 text-gray-500">
      No products found matching your criteria
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="paginatedProducts.length > 0"
      class="flex items-center justify-center gap-4"
    >
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="text-sm text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { mockProducts } from "@/utils/mockProducts";
import type { Product, SortField, SortDirection } from "@/types/product";

// Initialize with proper types
const filterQuery = ref("");
const filterCategory = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);

const sortState = reactive({
  field: "name" as SortField,
  direction: "asc" as SortDirection,
});

const sortableFields: SortField[] = ["name", "price", "createdAt"];

// Computed properties
const filteredProducts = computed(() => {
  return mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(filterQuery.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filterQuery.value.toLowerCase());
    const matchesCategory =
      !filterCategory.value || product.category === filterCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    let modifier = 1;
    if (sortState.direction === "desc") modifier = -1;

    if (sortState.field === "price") {
      return (a.price - b.price) * modifier;
    }
    if (sortState.field === "createdAt") {
      return (a.createdAt.getTime() - b.createdAt.getTime()) * modifier;
    }
    return a.name.localeCompare(b.name) * modifier;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / itemsPerPage.value)
);

const categories = computed(() =>
  Array.from(new Set(mockProducts.map((p) => p.category)))
);

// Methods
const setSortField = (field: SortField) => {
  sortState.field = field;
};

const toggleSortDirection = () => {
  sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
};
</script>
