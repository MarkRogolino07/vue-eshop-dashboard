import { PaginatedResponse, Product, ProductForm } from "@/types/product";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  sortBy?: string,
  sortOrder: "asc" | "desc" = "asc",
  type?: string
) => {
  const response = await api.get<PaginatedResponse<Product>>("/products", {
    params: { page, limit, sortBy, sortOrder, type },
  });
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: ProductForm) => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};

export const updateProduct = async (id: string, product: ProductForm) => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};
