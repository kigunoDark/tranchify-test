import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/product";
import { fetchProducts, fetchProduct } from "@/lib/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    fetchProducts(PRODUCTS_PER_PAGE, 0)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setHasMore(data.products.length < data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchProducts(PRODUCTS_PER_PAGE, products.length);
      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(products.length + data.products.length < data.total);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }, [products.length, loading, hasMore]);

  return { products, loading, error, hasMore, total, loadMore };
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
