export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export type SortField = keyof Pick<Product, "name" | "price" | "createdAt">;
export type SortDirection = "asc" | "desc";
