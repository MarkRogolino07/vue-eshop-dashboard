export interface Product {
  id: string;
  title: string;
  type: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface ProductForm {
  title: string;
  type: string;
  description: string;
  price: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
