import type { Product, ProductsResponse } from "@/types/product";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchProducts(
  limit = 10,
  skip = 0
): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_BASE}/products?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
}
