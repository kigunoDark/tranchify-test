import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { fetchProducts, fetchProduct } from "@/lib/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
}

const productEdits = new Map<number, Partial<Product>>();

export function useProductEdit(id: number) {
  const getEditedProduct = (original: Product): Product => {
    const edits = productEdits.get(id);
    return edits ? { ...original, ...edits } : original;
  };

  const saveEdit = (edits: Partial<Product>) => {
    const current = productEdits.get(id) || {};
    productEdits.set(id, { ...current, ...edits });
  };

  return { getEditedProduct, saveEdit };
}
