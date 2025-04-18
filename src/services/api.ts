import { Product } from "@/types/product";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.your-eshop.com/v1", // Replace with your API URL
  timeout: 5000,
});

// Products API
const productService = {
  async getAll() {
    return api.get("/products");
  },

  async getById(id: string) {
    return api.get(`/products/${id}`);
  },

  async create(product: Omit<Product, "id" | "createdAt">) {
    return api.post("/products", product);
  },

  async update(id: string, product: Partial<Product>) {
    return api.put(`/products/${id}`, product);
  },

  async delete(id: string) {
    return api.delete(`/products/${id}`);
  },
};

export default productService;
