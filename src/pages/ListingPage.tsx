import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { FilterFormValues } from "@/schemas/filterSchema";
import { Loader2 } from "lucide-react";
import { parseFilter } from "@/helpers/parseFilter";
import { FILTER_MAP } from "@/constants/filter.const";
import { createProductFilter } from "@/helpers/createProductFilter";

export function ListingPage() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterFormValues>({});

  useEffect(() => {
    setFilters(parseFilter<FilterFormValues>(searchParams, FILTER_MAP));
  }, [searchParams]);

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
  if (loading) {
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
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
