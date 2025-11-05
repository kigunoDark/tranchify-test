import type { FilterFormValues } from '@/schemas/filterSchema'
import type { Product } from '@/types/product'

/**
 * Creates a filter function for products based on provided filter values.
 *
 * @param {FilterFormValues} filters - The filter values to apply.
 * @returns {(product: Product) => boolean} A function that takes a product and returns `true` if it matches all filter criteria.
 */
export const createProductFilter = (filters: FilterFormValues) => (product: Product) => {
  const checks = [
    () => !filters.search || product.title.toLowerCase().includes(filters.search.toLowerCase()),
    () => !filters.categories?.length || filters.categories.includes(product.category),
    () => filters.minPrice === undefined || product.price >= filters.minPrice,
    () => filters.maxPrice === undefined || product.price <= filters.maxPrice,
    () => !filters.rating || product.rating === undefined || product.rating >= Number(filters.rating),
    () => !filters.discountedOnly || (product.discountPercentage && product.discountPercentage > 0),
    () =>
      !filters.discountedOnly ||
      filters.minDiscountPercent === undefined ||
      (product.discountPercentage && product.discountPercentage >= filters.minDiscountPercent),
  ]

  return checks.every((check) => check())
}
