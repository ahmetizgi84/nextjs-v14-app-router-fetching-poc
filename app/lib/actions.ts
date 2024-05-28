"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { productArraySchema, productSchema } from "../types/product";

export async function revalidateContentWithPath() {
  revalidatePath("/isr");
  redirect("/isr");
}

export async function revalidateContentWithTag() {
  revalidateTag("products");
  redirect("/isr");
}

////////////////////////////////////////////////////////////

export async function getData(url: string, init: RequestInit) {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const products: unknown = await res.json();

  const validateProducts = productArraySchema.safeParse(products);
  if (!validateProducts.success) {
    console.error(validateProducts.error);
    return [];
  }

  return validateProducts.data;
}

export async function getSingleData(url: string, init: RequestInit) {
  const res = await fetch(url, init);

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const product: unknown = await res.json();

  const validateProduct = productSchema.safeParse(product);
  if (!validateProduct.success) {
    // console.error(validateProduct.error);
    return;
  }

  return validateProduct.data;
}
