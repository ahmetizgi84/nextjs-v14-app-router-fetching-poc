import { z } from "zod";

export const productSchema = z.object({
  createdAt: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.string(),
  stock: z.string(),
  id: z.string(),
});

export type Product = z.infer<typeof productSchema>;
export const productArraySchema = z.array(productSchema);
