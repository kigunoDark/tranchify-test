import { z } from "zod";

export const filterSchema = z
  .object({
    search: z.string().optional(),
    categories: z.array(z.string()).optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    rating: z.string().optional(),
    discountedOnly: z.boolean().optional(),
    minDiscountPercent: z.number().min(0).max(100).optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.maxPrice >= data.minPrice;
      }
      return true;
    },
    {
      message: "Max price must be greater than or equal to min price",
      path: ["maxPrice"],
    }
  );

export type FilterFormValues = z.infer<typeof filterSchema>;
