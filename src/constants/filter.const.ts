import type { FilterFormValues } from "@/schemas/filterSchema";

export const FILTER_MAP: Record<
  keyof FilterFormValues,
  (v: string) => FilterFormValues[keyof FilterFormValues]
> = {
  search: (v: string) => v,
  categories: (v: string) => v.split(","),
  minPrice: (v: string) => Number(v),
  maxPrice: (v: string) => Number(v),
  rating: (v: string) => v,
  discountedOnly: (v: string) => v === "true",
  minDiscountPercent: (v: string) => Number(v),
};
