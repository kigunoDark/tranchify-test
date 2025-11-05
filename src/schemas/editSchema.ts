import { z } from "zod";

export const editSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be positive"),
  rating: z.number().min(0).max(5).optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
  description: z.string().optional(),
});

export type EditFormValues = z.infer<typeof editSchema>;