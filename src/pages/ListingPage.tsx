import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import type { FilterFormValues } from "@/schemas/filterSchema";
import { Loader2 } from "lucide-react";
import { parseFilter } from "@/helpers/parseFilter";
import { FILTER_MAP } from "@/constants/filter.const";
import { createProductFilter } from "@/helpers/createProductFilter";

export function ListingPage() {
  const { products, loading, error, hasMore, total, loadMore } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterFormValues>({});
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilters(parseFilter<FilterFormValues>(searchParams, FILTER_MAP));
  }, [searchParams]);

  useEffect(() => {
    if (!loadMoreRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore, loadMore]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(createProductFilter(filters));
  }, [products, filters]);

  type TransformerMap = {
    [K in keyof FilterFormValues]-?: (
      value: FilterFormValues[K]
    ) => string | null;
  };

  const handleFilterChange = (newFilters: FilterFormValues) => {
    setFilters(newFilters);

    const params = new URLSearchParams();

    const paramMap: TransformerMap = {
      search: (v) => v || null,
      categories: (v) => (v && v.length > 0 ? v.join(",") : null),
      minPrice: (v) => (v !== undefined ? v.toString() : null),
      maxPrice: (v) => (v !== undefined ? v.toString() : null),
      rating: (v) => v || null,
      discountedOnly: (v) => (v ? "true" : null),
      minDiscountPercent: (v) => (v !== undefined ? v.toString() : null),
    };

    (Object.keys(paramMap) as Array<keyof FilterFormValues>).forEach((key) => {
      const transform = paramMap[key] as (
        value: FilterFormValues[typeof key]
      ) => string | null;
      const value = transform(newFilters[key] as FilterFormValues[typeof key]);
      if (value !== null) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          aria-label="Loading products"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error loading products
          </h2>
          <p className="mt-2 text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar onFilterChange={handleFilterChange} categories={categories} />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-2 text-muted-foreground">
            Showing {filteredProducts.length} of {total} products
            {products.length < total && ` (${products.length} loaded)`}
          </p>
        </div>
        <ProductGrid products={filteredProducts} />

        {hasMore && (
          <div ref={loadMoreRef} className="mt-8 flex justify-center py-8">
            {loading && (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            )}
          </div>
        )}

        {hasMore && !loading && (
          <div className="mt-8 flex justify-center">
            <Button onClick={loadMore} variant="outline">
              Load More Products
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
