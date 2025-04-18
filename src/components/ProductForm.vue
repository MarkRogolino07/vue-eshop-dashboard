<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">
      {{ isEditing ? "Edit Product" : "Create New Product" }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          v-model="formData.name"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <select
          v-model="formData.category"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="formData.description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input
          v-model.number="formData.price"
          type="number"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Stock</label>
        <input
          v-model.number="formData.stock"
          type="number"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="cancel"
          class="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Saving..." : "Save Product" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import productService from "@/services/api";
import type { Product } from "@/types/product";

const props = defineProps<{
  productId?: string;
}>();

const emit = defineEmits(["saved"]);

const router = useRouter();
const isEditing = ref(!!props.productId);
const isSubmitting = ref(false);
const categories = ref<string[]>([]);
const errors = reactive({ name: "" });

const formData = reactive<Omit<Product, "id" | "createdAt">>({
  name: "",
  category: "",
  description: "",
  price: 0,
  stock: 0,
});

// Load product if editing
onMounted(async () => {
  if (props.productId) {
    try {
      const { data } = await productService.getById(props.productId);
      Object.assign(formData, data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }

  // Load categories
  const { data } = await productService.getAll();
  categories.value = Array.from(new Set(data.map((p: Product) => p.category)));
});

const validateForm = () => {
  let isValid = true;
  errors.name = "";

  if (!formData.name.trim()) {
    errors.name = "Product name is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    if (isEditing.value && props.productId) {
      await productService.update(props.productId, formData);
    } else {
      await productService.create(formData);
    }
    emit("saved");
    router.push("/dashboard");
  } catch (error) {
    console.error("Error saving product:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const cancel = () => {
  router.push("/dashboard");
};
</script>
